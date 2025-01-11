import { FastifyInstance } from "fastify";
import { factDeleteGetRoute } from "./get";
import { factDeletePostRoute } from "./post";

export function initFactDeleteRoutes(server: FastifyInstance) {
  server.route(factDeleteGetRoute);
  server.route(factDeletePostRoute);
}
