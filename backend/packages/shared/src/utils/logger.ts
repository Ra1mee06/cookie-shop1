import fs from "fs";
import path from "path";
import type { ErrorRequestHandler, Express, NextFunction, Request, Response } from "express";
import pino from "pino";

const logsDir = path.resolve(process.cwd(), "logs");
fs.mkdirSync(logsDir, { recursive: true });

const appLogDestination = pino.destination({
  dest: path.resolve(logsDir, "application.log"),
  sync: false
});
const errorLogDestination = pino.destination({
  dest: path.resolve(logsDir, "errors.log"),
  sync: false
});

export const logger = pino(
  { name: "cookie-shop", level: process.env.LOG_LEVEL ?? "info" },
  pino.multistream([{ stream: process.stdout }, { stream: appLogDestination }])
);

export const errorLogger = pino(
  { name: "cookie-shop-errors", level: "error" },
  pino.multistream([{ stream: process.stderr }, { stream: errorLogDestination }])
);

export const registerRequestLogging = (app: Express) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
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
        "incoming request processed"
      );
    });
    next();
  });
};

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

export const registerProcessErrorHandlers = (serviceName: string) => {
  process.on("uncaughtException", (error: Error) => {
    errorLogger.error({ serviceName, error: { message: error.message, stack: error.stack } }, "uncaughtException");
  });

  process.on("unhandledRejection", (reason: Error | string | object | null | undefined) => {
    errorLogger.error({ serviceName, reason }, "unhandledRejection");
  });
};
