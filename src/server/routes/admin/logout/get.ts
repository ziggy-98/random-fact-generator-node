import { FastifyReply, FastifyRequest } from "fastify";

function getHandler(req: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("userSession", { path: "/admin" });
  req.flash("info", "You have been signed out");
  return reply.redirect("/admin/login");
}

export const logoutGetRoute = {
  url: "/admin/logout",
  method: "GET",
  schema: {},
  handler: getHandler,
};
