import { inMemoryDb } from "../../common/in-memory-db.js";

export const columnMemoryRepository = {
  async getByOwner(ownerId: number) {
    return inMemoryDb.columns.filter((column) => column.ownerId === ownerId).sort((a, b) => a.id - b.id);
  },
  async create(ownerId: number, boardId: number, title: string) {
    const id = inMemoryDb.ids.columns++;
    const timestamp = new Date();
    const column = { id, ownerId, boardId, title, createdAt: timestamp, updatedAt: timestamp };
    inMemoryDb.columns.push(column);
    return column;
  }
};
