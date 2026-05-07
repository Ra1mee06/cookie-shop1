import { Router } from "express";
import { taskController } from "./task.controller.js";

export const taskRouter = Router();

taskRouter.get("/", (req, res) => {
  void taskController.getAll(req, res);
});

taskRouter.post("/", (req, res) => {
  void taskController.create(req, res);
});
