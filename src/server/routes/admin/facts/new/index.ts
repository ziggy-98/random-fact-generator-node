import { FastifyInstance } from "fastify";
import { newFactGetRoute } from "./get";
import { newFactPostRoute } from "./post";

export function initNewFactRoutes(server: FastifyInstance) {
  server.route(newFactGetRoute);
  server.route(newFactPostRoute);
}
