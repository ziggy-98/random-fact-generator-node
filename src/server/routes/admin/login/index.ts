import { adminLoginGetRoute } from "./get";
import { adminLoginPostRoute } from "./post";
import { FastifyInstance } from "fastify";

export function initLoginRoutes(server: FastifyInstance) {
  server.route(adminLoginGetRoute);
  server.route(adminLoginPostRoute);
}
