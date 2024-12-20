import { factsIndexGetRoute } from "./get";
import { FastifyInstance } from "fastify";
import { initFactRoutes } from "./:id";

export function initFactsRoutes(server: FastifyInstance) {
  initFactRoutes(server);
  server.route(factsIndexGetRoute);
}
