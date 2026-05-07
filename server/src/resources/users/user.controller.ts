import type { Request, Response } from "express";
import { userService } from "./user.service.js";
import { createUserValidator } from "./user.validator.js";

export const userController = {
  async getAll(_req: Request, res: Response) {
    const users = await userService.listUsers();
    return res.status(200).json(users);
  },

  async create(req: Request, res: Response) {
    const parsedBody = createUserValidator.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ message: "Invalid user payload", errors: parsedBody.error.flatten().fieldErrors });
    }

    const user = await userService.createUser(parsedBody.data);
    if (!user) {
      return res.status(409).json({ message: "User already exists" });
    }

    return res.status(201).json(user);
  }
};
