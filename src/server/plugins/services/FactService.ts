import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { FactCategory } from "../../types/FactCategory";
import { randomInt } from "crypto";

export class FactService {
  client: PrismaClient;

  constructor(server: FastifyInstance) {
    this.client = server["dbClient"];
  }

  getRandomFact(category?: FactCategory) {
    const totalFacts = this.getTotalFactsForCategory(category) ?? this.getTotalFacts();
    const index = randomInt(totalFacts) - 1;
    const queryData = {
      where: {},
      skip: index,
      take: 1,
    };
    if (category) {
      queryData.where = {
        category,
      };
    }
    return this.client.fact.findMany(queryData);
  }

  getTotalFacts() {
    return 1;
  }

  getTotalFactsForCategory(category?: FactCategory) {
    if (!category) {
      return;
    }
    return 1;
  }

  updateTotalsFacts() {}

  createFact() {}

  updateFact() {}
}
