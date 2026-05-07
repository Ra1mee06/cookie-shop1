import type { Request, Response } from "express";
import { taskService } from "./task.service.js";
import { createTaskValidator } from "./task.validator.js";

export const taskController = {
  async getAll(req: Request, res: Response) {
    const ownerId = req.auth?.userId;
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const tasks = await taskService.listTasks(ownerId);
    return res.status(200).json(tasks);
  },

  async create(req: Request, res: Response) {
    const ownerId = req.auth?.userId;
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const parsedBody = createTaskValidator.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ message: "Invalid task payload", errors: parsedBody.error.flatten().fieldErrors });
    }

    const task = await taskService.createTask(ownerId, parsedBody.data);
    return res.status(201).json(task);
  }
};
