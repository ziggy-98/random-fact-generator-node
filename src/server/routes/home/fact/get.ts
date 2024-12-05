import { FastifyReply, FastifyRequest } from "fastify";
import { Services } from "../../../types/Services";

export async function factGetHandler(request: FastifyRequest, reply: FastifyReply) {
  const { server } = request;
  const services: Services = server["services"];
  const { factService } = services;
  const [fact] = await factService.getRandomFact();

  return reply.view("home/fact/index.hbs", { fact });
}

export const factGetRoute = {
  method: "GET",
  url: "/home/fact",
  schema: {
    response: {
      200: {
        type: "object",
      },
    },
  },
  handler: factGetHandler,
};
