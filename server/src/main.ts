import "dotenv/config";
import cors from "cors";
import express from "express";
import { logger } from "./common/logger.js";
import { prisma } from "./common/prisma.js";
import { registerProcessErrorHandlers } from "./common/process-errors.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { requestLoggerMiddleware } from "./middlewares/request-logger.middleware.js";
import { authRouter } from "./resources/auth/auth.router.js";
import { boardRouter } from "./resources/boards/board.router.js";
import { columnRouter } from "./resources/columns/column.router.js";
import { taskRouter } from "./resources/tasks/task.router.js";
import { userRouter } from "./resources/users/user.router.js";

registerProcessErrorHandlers();

const app = express();
const port = Number(process.env["PORT"] ?? 4000);

app.use(cors());
app.use(express.json({ type: "application/json" }));
app.use(requestLoggerMiddleware);

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Cookie shop training service is running" });
});

app.use(authRouter);
app.use(authMiddleware);
app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/columns", columnRouter);
app.use("/tasks", taskRouter);

app.use(errorMiddleware);

const start = async () => {
  if (process.env["USE_IN_MEMORY"] !== "true") {
    await prisma.$connect();
  }
  app.listen(port, () => {
    logger.info({ port }, "training service started");
  });
};

void start();
