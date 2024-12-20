import { Category, PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { randomInt } from "crypto";

export class FactService {
  client: PrismaClient;

  constructor(server: FastifyInstance) {
    this.client = server["dbClient"];
  }

  async getFacts(page?: number) {
    return this.client.fact.findMany({
      select: {
        id: true,
        content: true,
        updatedAt: true,
      },
      skip: (page ?? 0) * 10,
      take: 20,
    });
  }

  async getFactById(id: number) {
    return this.client.fact.findUnique({
      where: {
        id,
      },
    });
  }

  async getRandomFact() {
    const totalFacts = await this.getTotalFacts();
    const index = randomInt(totalFacts);
    return this.client.fact.findMany({
      skip: index,
      take: 1,
    });
  }

  async getCategoryFact(category: Category) {
    const totalFacts = await this.getTotalFactsForCategory(category);
    const index = randomInt(totalFacts);
    return this.client.fact.findMany({
      where: {
        category,
      },
      skip: index,
      take: 1,
    });
  }

  async getTotalFacts() {
    return this.client.fact.count();
  }

  async getTotalFactsForCategory(category: Category) {
    return this.client.fact.count({
      where: {
        category,
      },
    });
  }

  updateTotalsFacts() {}

  createFact() {}

  updateFact() {}
}
