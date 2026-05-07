import { inMemoryDb } from "../../common/in-memory-db.js";

type CreateTaskInput = {
  title: string;
  description?: string;
  boardId: number;
  columnId?: number;
};

export const taskMemoryRepository = {
  async getByOwner(ownerId: number) {
    return inMemoryDb.tasks.filter((task) => task.ownerId === ownerId).sort((a, b) => a.id - b.id);
  },
  async create(ownerId: number, payload: CreateTaskInput) {
    const id = inMemoryDb.ids.tasks++;
    const timestamp = new Date();
    const task = {
      id,
      ownerId,
      title: payload.title,
      description: payload.description ?? null,
      boardId: payload.boardId,
      columnId: payload.columnId ?? null,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    inMemoryDb.tasks.push(task);
    return task;
  }
};
