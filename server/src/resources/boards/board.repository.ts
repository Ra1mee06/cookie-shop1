import type { Prisma } from "@prisma/client";
import { prisma } from "../../common/prisma.js";

const boardSelect = {
  id: true,
  title: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true
} satisfies Prisma.BoardSelect;

export const boardRepository = {
  getByOwner(ownerId: number) {
    return prisma.board.findMany({
      where: { ownerId },
      select: boardSelect,
      orderBy: { id: "asc" }
    });
  },
  create(ownerId: number, title: string) {
    return prisma.board.create({
      data: { ownerId, title },
      select: boardSelect
    });
  }
};
