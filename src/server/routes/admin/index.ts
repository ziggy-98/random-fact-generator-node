import { initLoginRoutes } from "./login";
import { initLogoutRoutes } from "./logout";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Services } from "../../types/Services";
import { initPofileRoutes } from "./profile";
import { initFactsRoutes } from "./facts";

async function adminGetHandler(request: FastifyRequest, reply: FastifyReply) {
  const { cookies, server } = request;
  const services: Services = server["services"];
  if (cookies.session) {
    const sessionIsValid = await services.userService.validateSession(cookies.session);
    if (sessionIsValid) {
      return reply.redirect("/admin/profile", 302);
    }
  }
  return reply.redirect("/admin/login", 302);
}

const adminGetRoute = {
  url: "/admin",
  method: "GET",
  handler: adminGetHandler,
};

export function initAnonymousRoutes(server: FastifyInstance) {
  server.route(adminGetRoute);
  initLoginRoutes(server);
}

export function initProtectedRoutes(server: FastifyInstance) {
  initPofileRoutes(server);
  initLogoutRoutes(server);
  initFactsRoutes(server);
}
