import type { Prisma } from "@prisma/client";
import { prisma } from "../../common/prisma.js";

const taskSelect = {
  id: true,
  title: true,
  description: true,
  boardId: true,
  columnId: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true
} satisfies Prisma.TaskSelect;

type CreateTaskInput = {
  title: string;
  description?: string;
  boardId: number;
  columnId?: number;
};

export const taskRepository = {
  getByOwner(ownerId: number) {
    return prisma.task.findMany({
      where: { ownerId },
      select: taskSelect,
      orderBy: { id: "asc" }
    });
  },
  create(ownerId: number, payload: CreateTaskInput) {
    return prisma.task.create({
      data: {
        ownerId,
        boardId: payload.boardId,
        columnId: payload.columnId,
        title: payload.title,
        description: payload.description
      },
      select: taskSelect
    });
  }
};
