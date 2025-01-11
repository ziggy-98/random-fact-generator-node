import { FastifyReply, FastifyRequest } from "fastify";
import { Static, Type } from "@fastify/type-provider-typebox";

const factDeleteParams = Type.Object({
  id: Type.String(),
});

type DeleteRequest = FastifyRequest<{ Params: Static<typeof factDeleteParams> }>;

async function factDeleteGetHandler(req: DeleteRequest, reply: FastifyReply) {
  const { factService } = req.server.services;
  const { id } = req.params;
  const fact = await factService.getFactById(parseInt(id));
  return reply.view("/admin/fact/:id/delete.hbs", { fact });
}

export const factDeleteGetRoute = {
  url: "/admin/facts/:id/delete",
  method: "GET",
  schema: {},
  handler: factDeleteGetHandler,
};
