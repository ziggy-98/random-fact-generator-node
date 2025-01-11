import { FastifyReply } from "fastify";
import { FactPostReq, FactPostSchema } from "../types/FactPostRequest";

async function post(req: FactPostReq, reply: FastifyReply) {
  const { body, server } = req;
  const { factService } = server.services;
  try {
    const createdFact = await factService.createFact({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    factService.totalFacts = factService.totalFacts + 1;
    req.log.info(`Fact updated: ${createdFact}`);
    req.flash("success", ["Fact created"]);
    reply.redirect(`/admin/facts/${createdFact.id}`);
  } catch (err) {}
}

export const newFactPostRoute = {
  url: "/admin/facts/new",
  method: "POST",
  schema: FactPostSchema,
  handler: post,
};
