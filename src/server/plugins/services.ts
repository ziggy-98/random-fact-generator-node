import fp from "fastify-plugin";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { UserService } from "./services/UserService";
import { FactService } from "./services/FactService";

function attachServices(server: FastifyInstance, _opts: FastifyPluginOptions) {
  const services = {
    userService: new UserService(server),
    factService: new FactService(server),
  };
  server.decorate("services", services);
}

export const servicesPlugin = fp(attachServices);
