import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { loginValidator } from "./auth.validator.js";

export const authController = {
  async login(req: Request, res: Response) {
    const parsedBody = loginValidator.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ message: "Invalid login payload", errors: parsedBody.error.flatten().fieldErrors });
    }

    const result = await authService.login(parsedBody.data);
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json(result);
  }
};
