import { FastifyInstance } from "fastify";
import { homeGetRoute } from "./get";
import { factGetRoute, factCategoryGetRoute } from "./fact";

export function initHomeRoutes(server: FastifyInstance) {
  server.route(homeGetRoute);
  server.route(factGetRoute);
  server.route(factCategoryGetRoute);
}
