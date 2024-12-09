import { FastifyReply, FastifyRequest } from "fastify";
import { Services } from "../../types/Services";

export async function isAuthenticated(request: FastifyRequest, reply: FastifyReply) {
  const { cookies, server } = request;
  const services: Services = server["services"];
  if (!cookies.userSession) {
    return reply.redirect("/admin/login");
  }
  const userId = await services.userService.validateSession(cookies.userSession as string);
  if (!userId) {
    reply.clearCookie("userSession");
    return reply.redirect("/admin/login");
  }
  request.flash("userId", userId.toString());
  return;
}
