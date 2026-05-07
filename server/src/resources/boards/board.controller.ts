import type { Request, Response } from "express";
import { boardService } from "./board.service.js";
import { createBoardValidator } from "./board.validator.js";

export const boardController = {
  async getAll(req: Request, res: Response) {
    const ownerId = req.auth?.userId;
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const boards = await boardService.listBoards(ownerId);
    return res.status(200).json(boards);
  },

  async create(req: Request, res: Response) {
    const ownerId = req.auth?.userId;
    if (!ownerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const parsedBody = createBoardValidator.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).json({ message: "Invalid board payload", errors: parsedBody.error.flatten().fieldErrors });
    }

    const board = await boardService.createBoard(ownerId, parsedBody.data.title);
    return res.status(201).json(board);
  }
};
