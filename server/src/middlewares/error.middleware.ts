import type { ErrorRequestHandler } from "express";
import { errorLogger } from "../common/logger.js";

export const errorMiddleware: ErrorRequestHandler = (error, req, res, next) => {
  void next;
  errorLogger.error(
    {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      body: req.body,
      error: error instanceof Error ? { message: error.message, stack: error.stack } : String(error)
    },
    "unhandled request error"
  );

  res.status(500).json({ message: "Internal Server Error" });
};
