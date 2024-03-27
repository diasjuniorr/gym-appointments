import { PrismaClient } from "@prisma/client";
import {
  CreateUserRepositoryProps,
  IUsersRepisitory,
  User,
} from "../../use-cases/contracts/users-repository";

export class UsersRepisitory implements IUsersRepisitory {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async create({
    name,
    email,
    password_hash,
  }: CreateUserRepositoryProps): Promise<User> {
    return await this.db.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.db.user.findUnique({ where: { email } });
  }
}
