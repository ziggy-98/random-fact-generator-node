import { FastifyInstance } from "fastify";
import { factGetRoute } from "./get";
import { initFactEditRoutes } from "./edit";

export function initFactRoutes(server: FastifyInstance) {
  initFactEditRoutes(server);
  server.route(factGetRoute);
}
