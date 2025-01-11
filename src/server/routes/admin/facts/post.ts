import { FastifyReply } from "fastify";
import { FactSearchPostReq, FactSearchPostSchema } from "./types/FactSearchArgs";

function post(req: FactSearchPostReq, reply: FastifyReply) {
  const { body } = req;
  const { search, sortBy } = body;
  const queryParams = new URLSearchParams();

  queryParams.append("page", "1");

  if (search) {
    queryParams.append("search", search);
  }
  if (sortBy) {
    queryParams.append("sortBy", sortBy);
  }

  return reply.redirect(`/admin/facts?${queryParams.toString()}`);
}

export const factSearchPostRoute = {
  url: "/admin/facts",
  method: "POST",
  schema: FactSearchPostSchema,
  handler: post,
};
