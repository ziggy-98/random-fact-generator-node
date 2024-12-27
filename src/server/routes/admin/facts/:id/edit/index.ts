import { FastifyInstance } from "fastify";
import { factEditGetRoute } from "./get";
import { factEditPostRoute } from "./post";

export function initFactEditRoutes(server: FastifyInstance) {
  server.route(factEditGetRoute);
  server.route(factEditPostRoute);
}
