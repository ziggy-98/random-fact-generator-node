import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { PrismaClient } from "@prisma/client";

async function buildDbClient(server: FastifyInstance, _opts: FastifyPluginOptions) {
  const prismaClient = new PrismaClient();
  await prismaClient.$connect();
  server.decorate("dbClient", prismaClient);
}

export const dbClientPlugin = fp(buildDbClient);
