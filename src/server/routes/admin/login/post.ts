import { FastifyReply, FastifyRequest, FastifySchema } from "fastify";
import { Services } from "../../../types/Services";
import { Static, Type } from "@fastify/type-provider-typebox";

const User = Type.Object({
  email: Type.String(),
  password: Type.String(),
});

const postSchema: FastifySchema = {
  body: User,
};

type AdminPostReq = FastifyRequest<{ Body: Static<typeof User> }>;

async function indexPostHandler(request: AdminPostReq, reply: FastifyReply) {
  const { server, body } = request;
  const services: Services = server["services"];
  const session = await services.userService.login(body.email, body.password);
  if (!session) {
    return reply.view("admin/index.hbs", { error: "Could not log in, email or password were incorrect." });
  }
  const expiresDate = new Date();
  expiresDate.setHours(expiresDate.getHours() + 1);
  reply.setCookie("userSession", session as string, {
    expires: expiresDate,
  });
  return reply.redirect("/admin/profile");
}

export const adminLoginPostRoute = {
  method: "POST",
  url: "/admin/login",
  schema: postSchema,
  handler: indexPostHandler,
};
