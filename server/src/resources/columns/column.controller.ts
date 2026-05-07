import type { Request, Response } from "express";
import { columnService } from "./column.service.js";
import { createColumnValidator } from "./column.validator.js";

export const columnController = {
  async getAll(req: Request, res: Response) {
    const ownerId = req.auth?.userId;
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const columns = await columnService.listColumns(ownerId);
    return res.status(200).json(columns);
  },

  async create(req: Request, res: Response) {
    const ownerId = req.auth?.userId;
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const parsedBody = createColumnValidator.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ message: "Invalid column payload", errors: parsedBody.error.flatten().fieldErrors });
    }

    const column = await columnService.createColumn(ownerId, parsedBody.data.boardId, parsedBody.data.title);
    return res.status(201).json(column);
  }
};
