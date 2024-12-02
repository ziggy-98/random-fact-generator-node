import { FastifyInstance } from "fastify";
import { homeGetRoute } from "./get";

export function initHomeRoutes(server: FastifyInstance) {
  server.route(homeGetRoute);
}
