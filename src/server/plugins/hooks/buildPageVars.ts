import { FastifyReply, FastifyRequest } from "fastify";

export function buildPageVars(req: FastifyRequest, reply: FastifyReply, done: (err?: Error) => void) {
  const currentUrl = req.url;
  reply.locals = {
    page: {},
  };
  reply.locals.page.title = currentUrl
    .split("/")
    .map((part) => part.replace(/-/g, " "))
    .join(" - ");
  if (currentUrl.startsWith("/admin")) {
    reply.locals.page.isAdmin = true;
  }
  done();
}
