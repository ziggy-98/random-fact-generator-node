import { PrismaClient } from "@prisma/client";
import config from "config";
import crypto from "crypto";

const client = new PrismaClient();

async function main() {
  const email = config.get<string>("db.adminEmail");
  const password = config.get<string>("db.adminPassword");
  const salt = config.get<string>("db.adminSalt");
  const hashPass = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  await client.user.upsert({
    where: {
      email,
    },
    create: {
      email,
      password: hashPass,
      salt,
      name: "admin",
    },
    update: {
      email,
      password: hashPass,
      salt,
    },
  });
}

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (err) => {
    console.log("Error seeding database: ", err);
    await client.$disconnect();
  });