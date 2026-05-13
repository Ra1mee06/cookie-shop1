import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const run = async () => {
  const existingUser = await prisma.user.findUnique({
    where: { login: "demo" },
    select: { id: true }
  });

  if (existingUser) {
    return;
  }

  const passwordHash = await bcrypt.hash("demo", 10);
  await prisma.user.create({
    data: {
      login: "demo",
      passwordHash
    }
  });
};

run()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
