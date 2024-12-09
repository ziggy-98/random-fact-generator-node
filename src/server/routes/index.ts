import { FastifyReply, FastifyRequest } from "fastify";
export { initAnonymousRoutes, initProtectedRoutes } from "./admin";
export { initHomeRoutes } from "./home";

function indexHandler(_request: FastifyRequest, reply: FastifyReply) {
  reply.redirect("/home");
}

export const indexRoute = {
  url: "/",
  method: "GET",
  handler: indexHandler,
};
