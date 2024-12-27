import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

const keywordsErrorsMap = {
  minLength: "{{fieldName}} must contain at least {{limit}} characters",
  maxLength: "{{fieldName}} must contain no more than {{limit}} characters",
};

type ValidationError = {
  instancePath: string;
  schemaPath: string;
  keyword: string;
  params: Record<string, any>;
  message: string;
};

export const errorsPlugin = fp((server: FastifyInstance, _opts: FastifyPluginOptions) => {
  server.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      request.log.error(error);
      const errors = parseValidationErrors(error.validation as ValidationError[]);
      request.flash("errors", JSON.stringify(errors));
      return reply.redirect(request.url);
    }
    return reply.status(500).send(error);
  });
});

function parseValidationErrors(errors: ValidationError[]) {
  return errors
    .map((error) => {
      let messageSchema = keywordsErrorsMap[error.keyword];
      if (!messageSchema) {
        return;
      }
      const fieldName = error.instancePath.split("/").at(-1);
      const replacements = {
        ...error.params,
        fieldName,
      };
      Object.keys(replacements).forEach((replacementName) => {
        const regex = new RegExp(`\\{\\{${replacementName}}}`, "g");
        messageSchema = messageSchema.replace(regex, replacements[replacementName]);
      });
      return {
        fieldName,
        message: messageSchema,
      };
    })
    .filter((error) => error);
}
