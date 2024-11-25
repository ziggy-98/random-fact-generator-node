import { FastifyReply, FastifyRequest } from "fastify";
import { Services } from "../../../types/Services";

async function profileGetHandler(request: FastifyRequest, reply: FastifyReply) {
  const { cookies, server } = request;
  const services: Services = server["services"];
  if (!cookies.session) {
    return reply.redirect("/admin/login");
  }
  const userId = await services.userService.validateSession(cookies.session);
  if (!userId) {
    reply.clearCookie("session");
    return reply.redirect("/admin/login");
  }
  const user = await services.userService.getUserProfile(userId);
  return reply.view("/admin/profile.hbs", { user });
}

export const adminProfileGetRoute = {
  url: "/admin/profile",
  method: "GET",
  schema: {},
  handler: profileGetHandler,
};
