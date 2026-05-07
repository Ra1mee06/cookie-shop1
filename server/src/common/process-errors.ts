import { errorLogger } from "./logger.js";

export const registerProcessErrorHandlers = () => {
  process.on("uncaughtException", (error: Error) => {
    errorLogger.error({ error: { message: error.message, stack: error.stack } }, "uncaughtException");
  });

  process.on("unhandledRejection", (reason: object | string | null | undefined) => {
    errorLogger.error({ reason }, "unhandledRejection");
  });
};
