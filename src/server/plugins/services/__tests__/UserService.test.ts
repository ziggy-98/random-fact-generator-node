import { FastifyInstance } from "fastify";
import { mockReset } from "jest-mock-extended";
import { mockPrisma } from "../../../../__mocks__/dbClient";
import { Session } from "@prisma/client";
import { UserService } from "../UserService";
import jwt from "jsonwebtoken";
import config from "config";

describe("UserService", () => {
  describe("createSession", () => {});
  describe("validateSession", () => {
    let server: Partial<FastifyInstance>;
    let sessions: Session[] = [];
    beforeEach(() => {
      mockReset(mockPrisma);
      server = {
        // @ts-ignore
        dbClient: mockPrisma,
      };
      server["dbClient"].session.create.mockImplementation(({ data }) => {
        sessions.push({
          id: sessions.length,
          ...data,
        });
      });
      server["dbClient"].session.findUnique.mockImplementation(({ data }) => {});
    });
    afterEach(() => {
      sessions = [];
    });
    it("Should return false if no session token was passed", async () => {
      const userService = new UserService(server as FastifyInstance);
      const result = await userService.validateSession(undefined);
      expect(result).toBe(false);
    });
    it("Should throw an error if the supplied jwt is invalid", async () => {
      const jwt = "not a good jwt";
      const userService = new UserService(server as FastifyInstance);
      expect(async () => {
        await userService.validateSession(jwt);
      }).toThrow();
    });
    it("Should update the user's session and return the user's id if the session is valid", async () => {
      const userService = new UserService(server as FastifyInstance);
      const newSession = userService.createSession(1);
      const token = jwt.sign({ newSession }, config.get<string>("cookies.secret"));
    });
    it("Should return false if the supplied session is invalid", () => {});
    it("Should return false and delete the supplied session if the session has expired", () => {});
  });
  describe("getUserProfile", () => {});
  describe("login", () => {});
});
