import { FastifyReply, FastifyRequest } from "fastify";
import { Services } from "../../../types/Services";

async function profileGetHandler(request: FastifyRequest, reply: FastifyReply) {
  const { server } = request;
  const services: Services = server["services"];
  const userId = parseInt(reply.flash("userId")[0]);
  if (!userId) {
    reply.redirect("/admin/login");
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
