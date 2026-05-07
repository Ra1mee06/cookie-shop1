import { z } from "zod";

export const createBoardValidator = z.object({
  title: z.string().trim().min(2)
});
