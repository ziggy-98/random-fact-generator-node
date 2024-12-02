import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { initAdminRoutes } from "./admin";
import { initHomeRoutes } from "./home";

function indexHandler(_request: FastifyRequest, reply: FastifyReply) {
  reply.redirect("/home");
}

const indexRoute = {
  url: "/",
  method: "GET",
  handler: indexHandler,
};

export function initRoutes(server: FastifyInstance) {
  server.route(indexRoute);
  initHomeRoutes(server);
  initAdminRoutes(server);
}
