import { PrismaClient } from "@prisma/client";
import {
  CreateUserRepositoryInput,
  IUsersRepository,
  UsersRepositoryCreateUserResponse,
  UsersRepositoryFindByEmailResponse,
  UsersRepositoryFindByIdResponse,
} from "../use-cases/contracts/users-repository";
import { left, right } from "../types/either";

export class UsersRepisitory implements IUsersRepository {
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

      return right(user);
    } catch (error) {
      console.log("error creating user");
      return left(new Error(`error creating user: ${error}`));
    }
  }

  async findByEmail(
    email: string
  ): Promise<UsersRepositoryFindByEmailResponse> {
    try {
      const result = await this.db.user.findUnique({ where: { email } });

      return right(result);
    } catch (error) {
      console.log("error finding user by email");
      return left(new Error(`error finding user by email: ${error}`));
    }
  }

  async findById(id: string): Promise<UsersRepositoryFindByIdResponse> {
    try {
      const result = await this.db.user.findUnique({ where: { id } });

      return right(result);
    } catch (error) {
      console.log("error finding user by id");
      return left(new Error(`error finding user by id: ${error}`));
    }
  }
}
