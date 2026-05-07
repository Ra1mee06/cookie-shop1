import { Router } from "express";
import { userController } from "./user.controller.js";

export const userRouter = Router();

userRouter.get("/", (req, res) => {
  void userController.getAll(req, res);
});

userRouter.post("/", (req, res) => {
  void userController.create(req, res);
});
