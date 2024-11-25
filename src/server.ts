import Fastify from "fastify";
import view from "@fastify/view";
import handlebars from "handlebars"
import { initRoutes } from "./routes";
import path from "path";

export async function createServer(){
  const server = Fastify({
    logger: true
  });
  server.register(view, {
    engine: {
      handlebars,
    },
    root: path.resolve(__dirname, "views")
  });
  initRoutes(server);
  await server.listen({port: 3000});
  return server
}