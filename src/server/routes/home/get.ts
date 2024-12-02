import { FastifyReply, FastifyRequest } from "fastify";

function homeGetHandler(_request: FastifyRequest, reply: FastifyReply) {
  reply.view("index.hbs");
}

export const homeGetRoute = {
  method: "GET",
  url: "/home",
  schema: {
    response: {
      200: {
        type: "object",
      },
    },
  },
  handler: homeGetHandler,
};
