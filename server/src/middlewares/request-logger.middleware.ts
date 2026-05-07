import type { NextFunction, Request, Response } from "express";
import { logger } from "../common/logger.js";

export const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const startedAt = Date.now();
  res.on("finish", () => {
    logger.info(
      {
        method: req.method,
        url: req.originalUrl,
        query: req.query,
        body: req.body,
        statusCode: res.statusCode,
        durationMs: Date.now() - startedAt
      },
      "request completed"
    );
  });
  next();
};
