export type TaskModel = {
  id: number;
  title: string;
  description: string | null;
  boardId: number;
  columnId: number | null;
  ownerId: number;
  createdAt: Date;
  updatedAt: Date;
};
