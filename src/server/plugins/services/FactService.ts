import { Category, PrismaClient, Prisma } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { randomInt } from "crypto";

type GetFactsOptions = {
  page?: number;
  sortOrder?: string;
  search?: string;
};

export class FactService {
  client: PrismaClient;
  private _totalFacts: number;

  constructor(server: FastifyInstance) {
    this.client = server["dbClient"];
    this._totalFacts = 0;
  }

  async initTotalFacts() {
    this._totalFacts = await this.client.fact.count();
  }

  public get totalFacts() {
    return this._totalFacts;
  }

  public set totalFacts(total: number) {
    this._totalFacts = total;
  }

  async getRandomFact() {
    const totalFacts = this._totalFacts;
    if (totalFacts === 0) {
      await this.initTotalFacts();
    }
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

  async getTotalFactsForCategory(category: Category) {
    return this.client.fact.count({
      where: {
        category,
      },
    });
  }

  async createFact(data: Prisma.FactCreateArgs["data"]) {
    if (this.totalFacts === 0) {
      await this.initTotalFacts();
    }
    const newFact = await this.client.fact.create({
      data,
    });
    this.totalFacts = this.totalFacts + 1;
    return newFact;
  }

  async getFactById(id: number) {
    return this.client.fact.findUnique({
      where: {
        id,
      },
    });
  }

  async getFacts({ page, sortOrder, search }: GetFactsOptions) {
    let queryArgs: Prisma.FactFindManyArgs = {
      select: {
        id: true,
        friendlyName: true,
        content: true,
        updatedAt: true,
      },
      take: 10,
    };
    if (page) {
      queryArgs.skip = page * 10;
    }
    if (!sortOrder) {
      sortOrder = "updatedAt";
    }
    queryArgs.orderBy = {
      [sortOrder]: "desc",
    };
    if (search) {
      queryArgs.where = {
        OR: [
          {
            friendlyName: {
              search,
            },
          },
          {
            content: {
              search,
            },
          },
        ],
      };
    }

    let countQueryArgs: Prisma.FactCountArgs = {
      where: queryArgs.where,
    };

    return Promise.all([this.client.fact.findMany(queryArgs), this.client.fact.count(countQueryArgs)]);
  }

  updateFact(id: number, fact: Prisma.FactUpdateArgs["data"]) {
    return this.client.fact.update({
      where: {
        id,
      },
      data: fact,
    });
  }

  async deleteFact(id: number) {
    const deletedFact = await this.client.fact.delete({
      where: {
        id,
      },
    });
    this.totalFacts = this.totalFacts - 1;
    return deletedFact;
  }
}
