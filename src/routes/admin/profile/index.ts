import { adminProfileGetRoute } from "./get";
import { FastifyInstance } from "fastify";

export function initPofileRoutes(server: FastifyInstance) {
  server.route(adminProfileGetRoute);
}
