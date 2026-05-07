import { Router } from "express";
import { boardController } from "./board.controller.js";

export const boardRouter = Router();

boardRouter.get("/", (req, res) => {
  void boardController.getAll(req, res);
});

boardRouter.post("/", (req, res) => {
  void boardController.create(req, res);
});
