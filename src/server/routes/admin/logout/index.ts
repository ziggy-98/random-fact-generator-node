import { FastifyInstance } from "fastify";
import { logoutGetRoute } from "./get";

export function initLogoutRoutes(server: FastifyInstance) {
  server.route(logoutGetRoute);
}
