import { z } from "zod";

export const createTaskValidator = z.object({
  title: z.string().trim().min(2),
  description: z.string().trim().optional(),
  boardId: z.number().int().positive(),
  columnId: z.number().int().positive().optional()
});
