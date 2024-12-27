import Ajv from "ajv";
import addFormats from "ajv-formats";
import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginOptions } from "fastify";

const ajv = addFormats(new Ajv(), [
  "date-time",
  "time",
  "date",
  "email",
  "hostname",
  "ipv4",
  "ipv6",
  "uri",
  "uri-reference",
  "uuid",
  "uri-template",
  "json-pointer",
  "relative-json-pointer",
  "regex",
]);

export const validatorPlugin = fp((server: FastifyInstance, _opts: FastifyPluginOptions) => {
  server.setValidatorCompiler(({ schema }) => {
    return ajv.compile(schema);
  });
});
