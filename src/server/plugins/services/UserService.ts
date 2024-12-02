import crypto from "crypto";
import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import jwt, { JwtPayload } from "jsonwebtoken";
import { nanoid } from "nanoid";
import config from "config";

export class UserService {
  dbClient: PrismaClient;

  constructor(server: FastifyInstance) {
    this.dbClient = server["dbClient"];
  }

  async validateSession(sessionJwt: string) {
    if (!sessionJwt) {
      return false;
    }
    const { session } = jwt.verify(sessionJwt, config.get<string>("cookies.secret")) as JwtPayload;
    const sessionQuery = {
      where: {
        session,
      },
      select: {
        id: true,
        userId: true,
        ttl: true,
      },
    };

    const sessionData = await this.dbClient.session.findUnique(sessionQuery);

    if (!sessionData) {
      return;
    }

    if (new Date() > sessionData.ttl) {
      await this.dbClient.session.delete({
        where: {
          id: sessionData.id,
        },
      });
      return;
    }

    const newTtl = new Date();
    newTtl.setHours(newTtl.getHours() + config.get<number>("cookies.expiresIn"));

    await this.dbClient.session.update({
      where: {
        id: sessionData.id,
      },
      data: {
        ttl: newTtl,
      },
    });

    return sessionData.userId;
  }

  async getUserProfile(userId: number) {
    const userQuery = {
      where: {
        id: userId,
      },
      select: {
        name: true,
        image: true,
      },
    };
    return this.dbClient.user.findUnique(userQuery);
  }

  async login(email: string, password: string) {
    const user = await this.dbClient.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
        salt: true,
      },
    });
    if (!user) {
      return;
    }
    const checkPassword = crypto.pbkdf2Sync(password, user.salt, 10000, 64, "sha512").toString("hex");
    if (checkPassword !== user.password) {
      return;
    }
    const session = await this.createSession(user.id);
    return jwt.sign({ session }, config.get<string>("cookies.secret"));
  }

  async createSession(userId: number) {
    const sessionHash = crypto.pbkdf2Sync(nanoid(), "salt", 10000, 64, "sha512").toString("hex");
    const ttlDate = new Date();
    ttlDate.setHours(ttlDate.getHours() + config.get<number>("cookies.expiresIn"));
    await this.dbClient.session.create({
      data: {
        session: sessionHash,
        userId,
        ttl: ttlDate,
      },
    });
    return sessionHash;
  }
}
