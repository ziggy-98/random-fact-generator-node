import { FastifyReply, FastifyRequest } from "fastify";
import { Services } from "../../../types/Services";

async function indexGetHandler(request: FastifyRequest, reply: FastifyReply) {
  const { cookies, server } = request;
  const services: Services = server["services"];
  if (cookies.session) {
    const sessionIsValid = await services.userService.validateSession(cookies.session);
    if (sessionIsValid) {
      return reply.redirect("/admin/profile", 302);
    }
  }
  return reply.view("admin/index.hbs", {
    page: {
      title: "Login",
    },
  });
}

export const adminLoginGetRoute = {
  url: "/admin/login",
  method: "GET",
  schema: {},
  handler: indexGetHandler,
};
