import { z } from "zod";

export const createUserValidator = z.object({
  login: z.string().trim().min(2),
  password: z.string().min(4)
});
