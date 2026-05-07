import { Router } from "express";
import { authController } from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
  void authController.login(req, res);
});
