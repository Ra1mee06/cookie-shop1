import "express";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: number;
        login: string;
      };
    }
  }
}

export {};
