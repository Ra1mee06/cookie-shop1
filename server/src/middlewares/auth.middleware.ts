import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../common/prisma.js";
import { userMemoryRepository } from "../resources/users/user.memory.repository.js";

type JwtPayload = {
  userId: number;
  login: string;
};

const bearerPrefix = "Bearer ";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.path === "/" || req.path === "/login") {
    return next();
  }

  const authorizationHeader = req.header("authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith(bearerPrefix)) {
    return res.status(401).json({ message: "Authorization header must be Bearer token" });
  }

  const token = authorizationHeader.slice(bearerPrefix.length).trim();
  if (!token) {
    return res.status(401).json({ message: "Authorization token is empty" });
  }

  try {
    const jwtSecretKey = process.env["JWT_SECRET_KEY"];
    if (!jwtSecretKey) {
      throw new Error("JWT_SECRET_KEY is not configured");
    }

    const payload = jwt.verify(token, jwtSecretKey) as JwtPayload;
    const user =
      process.env["USE_IN_MEMORY"] === "true"
        ? await userMemoryRepository.findByLogin(payload.login)
        : await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { id: true, login: true }
          });

    if (!user) {
      return res.status(403).json({ message: "Forbidden: user not found" });
    }

    req.auth = {
      userId: user.id,
      login: user.login
    };

    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
