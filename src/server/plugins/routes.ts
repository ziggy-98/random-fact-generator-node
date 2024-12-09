import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { indexRoute, initHomeRoutes, initAnonymousRoutes, initProtectedRoutes } from "../routes";
import { isAnonymous } from "./hooks/isAnonymous";
import { isAuthenticated } from "./hooks/isAuthenticated";

export function frontFacingRoutes(server: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
  server.route(indexRoute);
  initHomeRoutes(server);
  done();
}

export function anonymousRoutes(server: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
  server.addHook("preHandler", isAnonymous);
  initAnonymousRoutes(server);
  done();
}

export function protectedRoutes(server: FastifyInstance, _opts: FastifyPluginOptions, done: (err?: Error) => void) {
  server.addHook("preHandler", isAuthenticated);
  initProtectedRoutes(server);
  done();
}

export function registerRoutes(server: FastifyInstance) {
  server.register(frontFacingRoutes);
  server.register(anonymousRoutes);
  server.register(protectedRoutes);
}
