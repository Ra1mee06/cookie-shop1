import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userMemoryRepository } from "../users/user.memory.repository.js";
import { userRepository } from "../users/user.repository.js";

type LoginInput = {
  login: string;
  password: string;
};

export const authService = {
  async login(payload: LoginInput) {
    const repository = process.env["USE_IN_MEMORY"] === "true" ? userMemoryRepository : userRepository;
    const user = await repository.findAuthByLogin(payload.login);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.passwordHash);
    if (!isPasswordValid) {
      return null;
    }

    const secret = process.env["JWT_SECRET_KEY"];
    if (!secret) {
      throw new Error("JWT_SECRET_KEY is not configured");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        login: user.login
      },
      secret,
      { expiresIn: "7d" }
    );

    return { token };
  }
};
