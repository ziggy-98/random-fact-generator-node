import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { UserService } from "./services/UserService";

async function attachServices(server: FastifyInstance, _opts: FastifyPluginOptions) {
  const services = {
    userService: new UserService(server),
  };
  server.decorate("services", services);
}

export const servicesPlugin = fp(attachServices);
