import { inMemoryDb } from "../../common/in-memory-db.js";

export const boardMemoryRepository = {
  async getByOwner(ownerId: number) {
    return inMemoryDb.boards.filter((board) => board.ownerId === ownerId).sort((a, b) => a.id - b.id);
  },
  async create(ownerId: number, title: string) {
    const id = inMemoryDb.ids.boards++;
    const timestamp = new Date();
    const board = { id, ownerId, title, createdAt: timestamp, updatedAt: timestamp };
    inMemoryDb.boards.push(board);
    return board;
  }
};
