import { createServer } from "./server";
import { FastifyInstance } from "fastify";

createServer().then((server: FastifyInstance) => {
  server.log.info(`server started on port 3000`);
}).catch(err => {
  console.error(`Could not start server: ${err}`);
  process.exit(1)
})