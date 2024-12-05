import { FastifyRequest, FastifyReply } from "fastify";
import { Static, Type } from "@fastify/type-provider-typebox";
import { Services } from "../../../../types/Services";
import { Category } from "@prisma/client";

const HomeParams = Type.Object({
  category: Type.String(),
});

type HomeFactReq = FastifyRequest<{ Params: Static<typeof HomeParams> }>;

export async function factGetHandler(request: HomeFactReq, reply: FastifyReply) {
  const { server } = request;
  const services: Services = server["services"];
  const { factService } = services;
  const { category } = request.params;
  const [fact] = await factService.getCategoryFact(category.toUpperCase() as Category);

  if (!fact) {
    reply.redirect("/home");
  }

  return reply.view("home/fact/:id/index.hbs", { fact, category });
}

export const factCategoryGetRoute = {
  method: "GET",
  url: "/home/fact/:category",
  schema: {
    response: {
      200: {
        type: "object",
      },
    },
  },
  handler: factGetHandler,
};
