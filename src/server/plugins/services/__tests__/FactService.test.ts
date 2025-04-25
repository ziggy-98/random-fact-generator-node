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
    const totalFacts = await factsService.getTotalFacts();
    expect(totalFacts).toBe(11);
  });

  it("Should return a fact with a specific id when getFactById is called", async () => {
    const allFacts = createRandomFacts(10);
    server["dbClient"].fact.findUnique.mockImplementationOnce((options) => {
      const id = options.where.id;
      return allFacts.find((fact) => fact.id === id);
    });
    const factsService = new FactService(server as FastifyInstance);
    const result = await factsService.getFactById(6);
    expect(result).toEqual(allFacts[6]);
  });
  describe("getFacts", () => {
    beforeEach(() => {
      const allFacts = createRandomFacts(10).concat(createFactsWithName(10, "A common name", 10));
      server["dbClient"].fact.findMany.mockImplementationOnce((options) => {
        let returnedFacts = allFacts.slice(0);
        if (options.orderBy && !Object.keys(options.orderBy).includes("updatedAt")) {
          returnedFacts.sort((factA, factB) => {
            const key = Object.keys(options.orderBy)[0];
            return factB[key] - factA[key];
          });
        }
        if (options.where) {
          const searchString = options.where.OR[0].friendlyName.search;
          returnedFacts = returnedFacts.filter((fact) => fact.friendlyName.indexOf(searchString) > -1 || fact.content.indexOf(searchString) > -1);
        }
        if (options.skip) {
          return returnedFacts.slice(options.skip, options.skip + 10);
        }
        return returnedFacts.slice(0, 10);
      });
      server["dbClient"].fact.count.mockImplementationOnce((options) => {
        if (options.where) {
          const searchString = options.where.OR[0].friendlyName.search;
          return allFacts.filter((fact) => fact.friendlyName.indexOf(searchString) > -1 || fact.content.indexOf(searchString) > -1).length;
        }
        return allFacts.length;
      });
    });
    it("Should return the first 10 facts when getFacts is called with no filters", async () => {
      const factsService = new FactService(server as FastifyInstance);
      const [returnedFacts, count] = await factsService.getFacts({});
      expect(returnedFacts.length).toBe(10);
      expect(returnedFacts[0].id).toBe(0);
      expect(count).toBe(20);
    });
    it("Should return the second 10 facts when getFacts is called with page passed", async () => {
      const factsService = new FactService(server as FastifyInstance);
      const [returnedFacts, count] = await factsService.getFacts({ page: 1 });
      expect(returnedFacts.length).toBe(10);
      expect(returnedFacts[0].id).toBe(10);
      expect(count).toBe(20);
    });
    it("Should return the first 10 facts sorted by name if getFacts is called with the sort order 'friendlyName'", async () => {
      const factsService = new FactService(server as FastifyInstance);
      const [returnedFacts, count] = await factsService.getFacts({ sortOrder: "friendlyName" });
      let sortedFacts = returnedFacts.slice(0);
      sortedFacts.sort((factA, factB) => {
        //@ts-expect-error you can sort by name even though it's not two numerical values
        return factB.friendlyName - factA.friendlyName;
      });
      expect(sortedFacts[0]).toEqual(returnedFacts[0]);
      expect(sortedFacts[9]).toEqual(returnedFacts[9]);
      expect(count).toBe(20);
    });
    it("Should return the first 10 facts that match the search string when getFacts is called with a search string", async () => {
      const factsService = new FactService(server as FastifyInstance);
      const [returnedFacts, count] = await factsService.getFacts({ search: "A common name" });
      expect(returnedFacts[0].friendlyName).toBe("A common name");
      expect(returnedFacts[9].friendlyName).toBe("A common name");
      expect(count).toBe(10);
    });
  });
  it("Should update a fact with only the updated fields when updateFact is called", async () => {
    const allFacts = createRandomFacts(10);
    const checkContent = allFacts[6].content;
    server["dbClient"].fact.update.mockImplementationOnce(({ where, data }) => {
      const id = where.id;
      const factToUpdate = allFacts[id];
      const updatedFact = Object.entries(factToUpdate).reduce((acc: Partial<Fact>, [key, value]) => {
        if (data[key]) {
          return {
            ...acc,
            [key]: data[key],
          };
        }
        return {
          ...acc,
          [key]: value,
        };
      }, {});
      allFacts.splice(id, 1, updatedFact as Fact);
    });
    const factsService = new FactService(server as FastifyInstance);
    const data = {
      friendlyName: "A new name",
      category: "FILM" as Category,
    };
    await factsService.updateFact(6, data);
    expect(allFacts[6].friendlyName).toBe("A new name");
    expect(allFacts[6].category).toBe("FILM");
    expect(allFacts[6].content).toBe(checkContent);
  });

  it("Should delete a fact from the db when deleteFact is called", async () => {
    const allFacts = createRandomFacts(10);
    server["dbClient"].fact.delete.mockImplementationOnce(({ where }) => {
      const id = where.id;
      allFacts.splice(id, 1);
    });
    const factsService = new FactService(server as FastifyInstance);
    await factsService.deleteFact(6);
    expect(allFacts.find((fact) => fact.id === 6)).toBe(undefined);
  });
});
