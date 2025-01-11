import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifyReply, FastifyRequest } from "fastify";

const factDeleteParams = Type.Object({
  id: Type.String(),
});

type factDeleteRequest = FastifyRequest<{ Params: Static<typeof factDeleteParams> }>;

async function factDeletePostHandler(req: factDeleteRequest, reply: FastifyReply) {
  const { factService } = req.server.services;
  const { id } = req.params;

  try {
    await factService.deleteFact(parseInt(id));
    req.flash("successMessages", ["Fact deleted"]);
  } catch (err) {
    req.flash("errors", ["Fact could not be deleted. Please try again later"]);
  }

  return reply.redirect("/admin/facts");
}

export const factDeletePostRoute = {
  url: "/admin/facts/:id/delete",
  method: "POST",
  schema: {},
  handler: factDeletePostHandler,
};
