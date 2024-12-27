import { FastifyReply } from "fastify";
import { FactEditGetReq } from "../../types/FactPostRequest";

async function factEditGetHandler(req: FactEditGetReq, reply: FastifyReply) {
  const { id } = req.params;
  const { server } = req;
  const { factService } = server["services"];
  const fact = await factService.getFactById(parseInt(id));
  const errors = JSON.parse(reply.flash("errors")[0] ?? "[]");
  const draftContent = reply.flash("draftContent")[0];
  const data = {
    ...fact,
    draftContent,
  };
  return reply.view("admin/fact/:id/edit", {
    errors,
    data,
  });
}

export const factEditGetRoute = {
  method: "GET",
  url: "/admin/facts/:id/edit",
  schema: {},
  handler: factEditGetHandler,
};
