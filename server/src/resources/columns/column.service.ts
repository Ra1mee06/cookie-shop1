import { columnRepository } from "./column.repository.js";
import { columnMemoryRepository } from "./column.memory.repository.js";

export const columnService = {
  listColumns(ownerId: number) {
    const repository = process.env["USE_IN_MEMORY"] === "true" ? columnMemoryRepository : columnRepository;
    return repository.getByOwner(ownerId);
  },
  createColumn(ownerId: number, boardId: number, title: string) {
    const repository = process.env["USE_IN_MEMORY"] === "true" ? columnMemoryRepository : columnRepository;
    return repository.create(ownerId, boardId, title);
  }
};
