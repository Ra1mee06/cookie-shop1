import type { BoardModel } from "../resources/boards/board.model.js";
import type { ColumnModel } from "../resources/columns/column.model.js";
import type { TaskModel } from "../resources/tasks/task.model.js";
import type { UserModel } from "../resources/users/user.model.js";

export type InMemoryUserRecord = UserModel & { passwordHash: string };

export const inMemoryDb = {
  users: [] as InMemoryUserRecord[],
  boards: [] as BoardModel[],
  columns: [] as ColumnModel[],
  tasks: [] as TaskModel[],
  ids: {
    users: 1,
    boards: 1,
    columns: 1,
    tasks: 1
  }
};
