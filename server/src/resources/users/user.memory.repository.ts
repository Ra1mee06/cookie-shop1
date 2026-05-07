import { inMemoryDb } from "../../common/in-memory-db.js";

type CreateUserInput = {
  login: string;
  passwordHash: string;
};

type UserAuthRecord = {
  id: number;
  login: string;
  passwordHash: string;
};

export const userMemoryRepository = {
  async getAll() {
    return inMemoryDb.users
      .map((item) => ({
        id: item.id,
        login: item.login,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }))
      .sort((a, b) => a.id - b.id);
  },
  async create(data: CreateUserInput) {
    const id = inMemoryDb.ids.users++;
    const timestamp = new Date();
    const record = {
      id,
      login: data.login,
      passwordHash: data.passwordHash,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    inMemoryDb.users.push(record);
    return {
      id: record.id,
      login: record.login,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt
    };
  },
  async findByLogin(login: string) {
    const user = inMemoryDb.users.find((item) => item.login === login);
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      login: user.login,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  },
  async findAuthByLogin(login: string): Promise<UserAuthRecord | null> {
    const user = inMemoryDb.users.find((item) => item.login === login);
    return user ?? null;
  }
};
