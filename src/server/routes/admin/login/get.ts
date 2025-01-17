import { FastifyReply, FastifyRequest } from "fastify";

async function indexGetHandler(_request: FastifyRequest, reply: FastifyReply) {
  return reply.view("admin/index.hbs");
}

export const adminLoginGetRoute = {
  url: "/admin/login",
  method: "GET",
  schema: {},
  handler: indexGetHandler,
};
