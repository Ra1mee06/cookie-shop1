import type { Prisma } from "@prisma/client";
import { prisma } from "../../common/prisma.js";

type CreateUserInput = {
  login: string;
  passwordHash: string;
};

const userSelect = {
  id: true,
  login: true,
  createdAt: true,
  updatedAt: true
} satisfies Prisma.UserSelect;

export const userRepository = {
  getAll() {
    return prisma.user.findMany({
      select: userSelect,
      orderBy: { id: "asc" }
    });
  },
  create(data: CreateUserInput) {
    return prisma.user.create({
      data,
      select: userSelect
    });
  },
  findByLogin(login: string) {
    return prisma.user.findUnique({
      where: { login },
      select: userSelect
    });
  },
  findAuthByLogin(login: string) {
    return prisma.user.findUnique({
      where: { login },
      select: { id: true, login: true, passwordHash: true }
    });
  }
};
