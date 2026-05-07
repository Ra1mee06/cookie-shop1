import type { Prisma } from "@prisma/client";
import { prisma } from "../../common/prisma.js";

const columnSelect = {
  id: true,
  title: true,
  boardId: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true
} satisfies Prisma.ColumnSelect;

export const columnRepository = {
  getByOwner(ownerId: number) {
    return prisma.column.findMany({
      where: { ownerId },
      select: columnSelect,
      orderBy: { id: "asc" }
    });
  },
  create(ownerId: number, boardId: number, title: string) {
    return prisma.column.create({
      data: { ownerId, boardId, title },
      select: columnSelect
    });
  }
};
