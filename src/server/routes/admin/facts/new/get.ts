import { FastifyReply, FastifyRequest } from "fastify";

function get(_req: FastifyRequest, reply: FastifyReply) {
  const errors = JSON.parse(reply.flash("errors")[0] ?? "[]");
  return reply.view("admin/fact/new.hbs", {
    errors,
    data: {},
  });
}

export const newFactGetRoute = {
  url: "/admin/facts/new",
  method: "GET",
  schema: {},
  handler: get,
};
