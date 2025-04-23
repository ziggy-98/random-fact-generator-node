import { FastifyInstance } from "fastify";
import { mockPrisma } from "../../../../__mocks__/dbClient";
import { mockReset } from "jest-mock-extended";
import { FactService } from "../FactService";
import { Category, Fact } from "@prisma/client";
import { nanoid } from "nanoid";
import crypto from "node:crypto";

function createRandomFacts(quantity: number, randomCategory?: boolean) {
  const returnArray: Fact[] = [];
  const categories: Category[] = ["FILM", "HISTORY", "SCIENCE", "MUSIC"];
  for (let i = 0; i < quantity; i++) {
    let selectedCategory: Category | undefined = undefined;
    if (randomCategory) {
      selectedCategory = categories[crypto.randomInt(4)];
    }
    returnArray.push({
      id: i,
      friendlyName: nanoid(16),
      category: selectedCategory ?? "FILM",
      content: nanoid(32),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return returnArray;
}

function createFactsWithName(quantity: number, friendlyName: string, startAt: number) {
  const returnArray: Fact[] = [];
  for (let i = startAt; i < startAt + quantity; i++) {
    returnArray.push({
      id: i,
      friendlyName: friendlyName,
      category: "FILM",
      content: nanoid(32),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  return returnArray;
}

describe("factsService", () => {
  let server: Partial<FastifyInstance>;
  beforeEach(() => {
    mockReset(mockPrisma);
    server = {
      // @ts-ignore
      dbClient: mockPrisma,
    };
  });

  it("Should set total facts properly when instantiating the service", async () => {
    const factsService = new FactService(server as FastifyInstance);
    expect(factsService.totalFacts).toBe(0);
  });

  it("Should successfully set the total facts when total facts is updated", () => {
    const factsService = new FactService(server as FastifyInstance);
    factsService.totalFacts = factsService.totalFacts + 1;
    expect(factsService.totalFacts).toBe(1);
  });

  it("Should successfully return a random fact when getRandomFact is called", async () => {
    // @ts-ignore
    jest.spyOn(crypto, "randomInt").mockReturnValueOnce(6);
    const totalFacts = 10;
    const allFacts = createRandomFacts(totalFacts);

    server["dbClient"].fact.findMany.mockResolvedValueOnce(allFacts[6]);

    const factsService = new FactService(server as FastifyInstance);
    const result = await factsService.getRandomFact();
    expect(result).toEqual(allFacts[6]);
  });

  it("Should successfully return a random fact from a specific category when getCategoryFact is called", async () => {
    const allFacts = createRandomFacts(10, true);
    const category = "FILM";
    const categoryFacts = allFacts.filter((fact) => fact.category === category);
    const numberOfCategoryFacts = categoryFacts.length;
    const indexToTake = Math.floor(Math.random() * (numberOfCategoryFacts - 1));

    //@ts-ignore
    jest.spyOn(crypto, "randomInt").mockReturnValueOnce(indexToTake);
    server["dbClient"].fact.count.mockImplementationOnce((_options: Record<string, any>) => {
      return numberOfCategoryFacts;
    });
    server["dbClient"].fact.findMany.mockImplementationOnce((options: Record<string, any>) => {
      return categoryFacts[options.skip];
    });

    const factsService = new FactService(server as FastifyInstance);
    const result = await factsService.getCategoryFact(category);
    expect(result).toEqual(categoryFacts[indexToTake]);
  });

  it("Should get the correct number of facts in a category when getTotalFactsForCategory is called", async () => {
    const allFacts = createRandomFacts(10, true);
    const category = "FILM";
    const numberOfFactsForCategory = allFacts.filter((fact) => fact.category === category).length;

    server["dbClient"].fact.count.mockImplementationOnce((options: Record<string, any>) => {
      return allFacts.filter((fact) => fact.category === options.where.category).length;
    });

    const factsService = new FactService(server as FastifyInstance);
    const result = await factsService.getTotalFactsForCategory(category);
    expect(result).toBe(numberOfFactsForCategory);
  });

  it("Should return a new fact and update total facts when createFact is called", async () => {
    const newFact = createRandomFacts(1)[0];

    server["dbClient"].fact.count.mockResolvedValueOnce(10);
    server["dbClient"].fact.create.mockImplementationOnce(({ data }) => {
      return data;
    });

    const factsService = new FactService(server as FastifyInstance);
    const result = await factsService.createFact(newFact);
    expect(result).toEqual(newFact);
    expect(factsService.totalFacts).toBe(11);
  });

  it("Should return a fact with a specific id when getFactById is called", () => {
    const allFacts = createRandomFacts(10);
    server["dbClient"].fact.find();
  });
  // describe("getFacts", () => {
  //   beforeEach(() => {
  //     const allFacts = createRandomFacts(10).concat(createFactsWithName(10, "A common name", 10));
  //     server["dbClient"].facts.findMany.mockImplementationOnce((options) => {
  //       if(options.orderBy){
  //
  //       }
  //     });
  //   });
  //   it("Should return the first 10 facts when getFacts is called with no filters", () => {});
  //   it("Should return the second 10 facts when getFacts is called with page passed", () => {});
  //   it("Should return the first 10 facts sorted by name if getFacts is called with the sort order 'name'", () => {});
  //   it("Should return the first 10 facts that match the search string when getFacts is called with a search string", () => {});
  // });
});
