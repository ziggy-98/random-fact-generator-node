import { Type, Static } from "@fastify/type-provider-typebox";
import { FastifySchema, FastifyRequest } from "fastify";

export const FactSearchQueryArgs = Type.Object({
  page: Type.Optional(Type.String()),
  sortBy: Type.Optional(Type.String()),
  search: Type.Optional(Type.String()),
});

export const FactSearchFormArgs = Type.Object({
  search: Type.Optional(Type.String()),
  sortBy: Type.Optional(Type.String()),
});

export const FactSearchPostSchema: FastifySchema = {
  body: FactSearchFormArgs,
};

export const FactSearchGetSchema: FastifySchema = {
  querystring: FactSearchQueryArgs,
};

export type FactSearchGetReq = FastifyRequest<{ Querystring: Static<typeof FactSearchQueryArgs> }>;
export type FactSearchPostReq = FastifyRequest<{ Body: Static<typeof FactSearchFormArgs>; Querystring: Static<typeof FactSearchQueryArgs> }>;
