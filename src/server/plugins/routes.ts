import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { initRoutes } from "../routes";

export const routesPlugin = fp((server: FastifyInstance, _opts: FastifyPluginOptions) => {
  initRoutes(server);
});
