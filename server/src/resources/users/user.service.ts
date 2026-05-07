import bcrypt from "bcrypt";
import { userRepository } from "./user.repository.js";
import { userMemoryRepository } from "./user.memory.repository.js";

type CreateUserInput = {
  login: string;
  password: string;
};

export const userService = {
  listUsers() {
    const repository = process.env["USE_IN_MEMORY"] === "true" ? userMemoryRepository : userRepository;
    return repository.getAll();
  },
  async createUser(data: CreateUserInput) {
    const useInMemory = process.env["USE_IN_MEMORY"] === "true";
    const repository = useInMemory ? userMemoryRepository : userRepository;
    const existingUser = await repository.findByLogin(data.login);
    if (existingUser) {
      return null;
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await repository.create({
      login: data.login,
      passwordHash
    });

    return user;
  }
};
