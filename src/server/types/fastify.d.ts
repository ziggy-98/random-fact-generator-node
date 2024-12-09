import { Services } from "./Services";

declare module "fastify" {
  interface FastifyInstance {
    services: Services;
  }
  interface FastifyReply {
    locals: Record<any, any>;
  }
}
