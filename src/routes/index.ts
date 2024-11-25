import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

function indexHandler (_request: FastifyRequest, reply: FastifyReply) {
  reply.view("index.hbs");
}

const indexRoute = {
  method: "GET",
  url: "/",
  schema: {
    response: {
      200: {
        type: "object"
      }
    }
  },
  handler: indexHandler
}

export function initRoutes(server: FastifyInstance){
  server.route(indexRoute);
}