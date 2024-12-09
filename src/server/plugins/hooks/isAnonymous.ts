import { FastifyReply, FastifyRequest } from "fastify";

export async function isAnonymous(request: FastifyRequest, reply: FastifyReply) {
  const { cookies, server } = request;
  const services = server.services;
  if (!cookies.userSession) {
    return;
  }
  const userId = await services.userService.validateSession(cookies.userSession as string);
  if (!userId) {
    reply.clearCookie("userSession");
    return;
  }
  return reply.redirect("/admin/profile");
}
