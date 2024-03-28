import { PrismaClient } from "@prisma/client";
import {
  CreateUserRepositoryInput,
  IUsersRepisitory,
  UsersRepositoryCreateUserResponse,
} from "../../use-cases/contracts/users-repository";
import { left, right } from "../../types/either";

export class UsersRepisitory implements IUsersRepisitory {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async create({
    name,
    email,
    password_hash,
  }: CreateUserRepositoryInput): Promise<UsersRepositoryCreateUserResponse> {
    try {
      const user = await this.db.user.create({
        data: {
          name,
          email,
          password_hash,
        },
      });

      return right({ user });
    } catch (error) {
      console.log("error creating user");
      return left(new Error(`error creating user: ${error}`));
    }
  }

  async findByEmail(email: string) {
    return await this.db.user.findUnique({ where: { email } });
  }
}
