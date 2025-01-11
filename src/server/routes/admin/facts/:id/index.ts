import { FastifyInstance } from "fastify";
import { factGetRoute } from "./get";
import { initFactEditRoutes } from "./edit";
import { initFactDeleteRoutes } from "./delete";

export function initFactRoutes(server: FastifyInstance) {
  initFactEditRoutes(server);
  initFactDeleteRoutes(server);
  server.route(factGetRoute);
}
