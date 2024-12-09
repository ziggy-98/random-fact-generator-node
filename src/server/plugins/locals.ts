import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { buildPageVars } from "./hooks/buildPageVars";

export const localsPlugin = fp((server: FastifyInstance, _opts: FastifyPluginOptions) => {
  server.addHook("onRequest", buildPageVars);
});
