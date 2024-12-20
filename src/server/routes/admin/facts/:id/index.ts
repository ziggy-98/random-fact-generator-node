import { FastifyInstance } from "fastify";
import { factGetRoute } from "./get";

export function initFactRoutes(server: FastifyInstance) {
  server.route(factGetRoute);
}
