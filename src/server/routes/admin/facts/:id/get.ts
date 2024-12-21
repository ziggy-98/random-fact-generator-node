import { FastifyRequest, FastifyReply } from "fastify";
import { Static, Type } from "@fastify/type-provider-typebox";

const factParams = Type.Object({
  id: Type.String(),
});

type factReq = FastifyRequest<{ Params: Static<typeof factParams> }>;

async function factGetHandler(req: factReq, reply: FastifyReply) {
  const { server } = req;
  const { factService } = server["services"];
  const { id } = req.params;
  const fact = await factService.getFactById(parseInt(id));
  return reply.view("/admin/fact/:id/index.hbs", { fact });
}

export const factGetRoute = {
  method: "GET",
  url: "/admin/facts/:id",
  schema: {},
  handler: factGetHandler,
};
