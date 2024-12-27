import { Static, Type } from "@fastify/type-provider-typebox";
import { FastifyRequest, FastifySchema } from "fastify";
import { Category } from "@prisma/client";

export const FactType = Type.Required(
  Type.Object({
    friendlyName: Type.String({ minLength: 1 }),
    content: Type.String(),
    category: Type.Enum(Category),
  })
);

export const FactEditParams = Type.Object({
  id: Type.String(),
});

export const FactPostSchema: FastifySchema = {
  body: FactType,
};

export type FactEditGetReq = FastifyRequest<{ Params: Static<typeof FactEditParams> }>;
export type FactPostReq = FastifyRequest<{ Body: Static<typeof FactType> }>;
export type FactEditPostReq = FastifyRequest<{ Params: Static<typeof FactEditParams>; Body: Static<typeof FactType> }>;
