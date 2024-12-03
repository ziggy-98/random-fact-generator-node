import Fastify from "fastify";
import view from "@fastify/view";
import handlebars from "handlebars";
import cookie from "@fastify/cookie";
import staticPlugin from "@fastify/static";
import path from "path";
import { dbClientPlugin } from "./plugins/dbClient";
import { servicesPlugin } from "./plugins/services";
import { routesPlugin } from "./plugins/routes";
import fastifyMultipart from "@fastify/multipart";

export async function createServer() {
  const server = Fastify({
    logger: true,
  });
  server.register(cookie, {
    secret: "password",
  });
  server.register(fastifyMultipart, { attachFieldsToBody: "keyValues" });
  server.register(dbClientPlugin);
  server.register(servicesPlugin);
  server.register(staticPlugin, {
    root: path.join(__dirname, "..", "client"),
    prefix: "/client/",
  });
  server.register(view, {
    engine: {
      handlebars,
    },
    layout: "layout.hbs",
    options: {
      partials: {
        header: "partials/header.hbs",
        footer: "partials/footer.hbs",
        menu: "partials/menu.hbs",
      },
    },
    root: path.resolve(__dirname, "views"),
  });
  server.register(routesPlugin);
  await server.listen({ port: 3000 });
  return server;
}
