import fs from "node:fs";
import path from "node:path";
import pino from "pino";

const logsDir = path.resolve(process.cwd(), "logs");
fs.mkdirSync(logsDir, { recursive: true });

const appLogStream = pino.destination({
  dest: path.resolve(logsDir, "application.log"),
  sync: false
});

const errorLogStream = pino.destination({
  dest: path.resolve(logsDir, "error.log"),
  sync: false
});

export const logger = pino(
  {
    name: "cookie-shop-training-server",
    level: process.env["LOG_LEVEL"] ?? "info"
  },
  pino.multistream([{ stream: process.stdout }, { stream: appLogStream }])
);

export const errorLogger = pino(
  {
    name: "cookie-shop-training-server-error",
    level: "error"
  },
  pino.multistream([{ stream: process.stderr }, { stream: errorLogStream }])
);
