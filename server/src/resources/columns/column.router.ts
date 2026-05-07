import { Router } from "express";
import { columnController } from "./column.controller.js";

export const columnRouter = Router();

columnRouter.get("/", (req, res) => {
  void columnController.getAll(req, res);
});

columnRouter.post("/", (req, res) => {
  void columnController.create(req, res);
});
