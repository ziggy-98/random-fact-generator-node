import { factsSearchGetRoute } from "./get";
import { FastifyInstance } from "fastify";
import { initFactRoutes } from "./:id";
import { initNewFactRoutes } from "./new";
import { factSearchPostRoute } from "./post";

export function initFactsRoutes(server: FastifyInstance) {
  initFactRoutes(server);
  initNewFactRoutes(server);
  server.route(factsSearchGetRoute);
  server.route(factSearchPostRoute);
}
