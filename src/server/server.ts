import Fastify from "fastify";
import view from "@fastify/view";
import handlebars from "./utils/modifyHandlerbars";
import cookie from "@fastify/cookie";
import staticPlugin from "@fastify/static";
import session from "@fastify/secure-session";
import flash from "@fastify/flash";
import path from "path";
import { dbClientPlugin } from "./plugins/dbClient";
import { servicesPlugin } from "./plugins/services";
import { registerRoutes } from "./plugins/routes";
import fastifyMultipart from "@fastify/multipart";
import * as fs from "node:fs";
import { localsPlugin } from "./plugins/locals";
import { errorsPlugin } from "./plugins/errors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { validatorPlugin } from "./plugins/validator";

export async function createServer() {
  const server = Fastify({
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();
  server.register(validatorPlugin);
  server.register(cookie, {
    secret: "password",
  });
  server.register(fastifyMultipart, { attachFieldsToBody: "keyValues" });
  server.register(session, {
    key: fs.readFileSync(path.join(__dirname, "..", "keys", "secret-key")),
    cookie: {
      path: "/",
    },
  });
  server.register(flash);
  server.register(dbClientPlugin);
  server.register(servicesPlugin);
  server.register(errorsPlugin);
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
        factForm: "partials/fact-form.hbs",
        errorBox: "partials/error-box.hbs",
        successBox: "partials/success-box.hbs",
      },
    },
    root: path.resolve(__dirname, "views"),
  });
  server.register(localsPlugin);
  registerRoutes(server);
  await server.listen({ port: 3000 });
  return server;
}
