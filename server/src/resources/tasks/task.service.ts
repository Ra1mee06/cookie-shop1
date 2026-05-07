import { taskRepository } from "./task.repository.js";
import { taskMemoryRepository } from "./task.memory.repository.js";

type CreateTaskInput = {
  title: string;
  description?: string;
  boardId: number;
  columnId?: number;
};

export const taskService = {
  listTasks(ownerId: number) {
    const repository = process.env["USE_IN_MEMORY"] === "true" ? taskMemoryRepository : taskRepository;
    return repository.getByOwner(ownerId);
  },
  createTask(ownerId: number, payload: CreateTaskInput) {
    const repository = process.env["USE_IN_MEMORY"] === "true" ? taskMemoryRepository : taskRepository;
    return repository.create(ownerId, payload);
  }
};
