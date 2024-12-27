import { FastifyReply } from "fastify";
import { FactEditPostReq, FactPostSchema } from "../../types/FactPostRequest";

async function factEditPostHandler(req: FactEditPostReq, reply: FastifyReply) {
  const { params, body, server } = req;
  const { factService } = server.services;
  const { friendlyName, content, category } = body;
  const { id } = params;
  try {
    const updatedFact = await factService.updateFact(parseInt(id), {
      friendlyName,
      content,
      category,
      updatedAt: new Date(),
    });
    req.log.info(`Fact updated: ${updatedFact}`);
    req.flash("success", ["Fact updated"]);
    reply.redirect(`/admin/facts/${id}`);
  } catch (err) {}
}

export const factEditPostRoute = {
  method: "POST",
  url: "/admin/facts/:id/edit",
  schema: FactPostSchema,
  handler: factEditPostHandler,
};
