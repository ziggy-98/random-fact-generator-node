import { FastifyReply, FastifyRequest } from "fastify";
import { Static, Type } from "@fastify/type-provider-typebox";

const factsArgs = Type.Object({
  page: Type.Optional(Type.Number()),
});

type factsReq = FastifyRequest<{ Querystring: Static<typeof factsArgs> }>;

async function factsGetHandler(req: factsReq, reply: FastifyReply) {
  const { server, query } = req;
  const { factService } = server.services;
  const page = query.page;
  const facts = (await factService.getFacts(page)).map((fact) => ({
    ...fact,
  }));
  return reply.view("admin/fact/index.hbs", { facts });
}

export const factsIndexGetRoute = {
  url: "/admin/facts",
  method: "GET",
  schema: {},
  handler: factsGetHandler,
};
