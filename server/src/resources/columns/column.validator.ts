import { z } from "zod";

export const createColumnValidator = z.object({
  title: z.string().trim().min(2),
  boardId: z.number().int().positive()
});
