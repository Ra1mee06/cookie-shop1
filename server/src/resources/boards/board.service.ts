import { boardRepository } from "./board.repository.js";
import { boardMemoryRepository } from "./board.memory.repository.js";

export const boardService = {
  listBoards(ownerId: number) {
    const repository = process.env["USE_IN_MEMORY"] === "true" ? boardMemoryRepository : boardRepository;
    return repository.getByOwner(ownerId);
  },
  createBoard(ownerId: number, title: string) {
    const repository = process.env["USE_IN_MEMORY"] === "true" ? boardMemoryRepository : boardRepository;
    return repository.create(ownerId, title);
  }
};
