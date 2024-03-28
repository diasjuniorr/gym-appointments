import { PrismaClient } from "@prisma/client";
import { CreateUserController } from "../../http/controllers/create-user.controller";
import { UsersRepisitory } from "../../repositories/users-repository";
import { CreateUserUseCase } from "../../use-cases/create-user-use-case";

export const createCreateUserControllerFactory = (db: PrismaClient) => {
  const usersRepository = new UsersRepisitory(db);
  const createUserUseCase = new CreateUserUseCase(usersRepository);
  return new CreateUserController(createUserUseCase);
};
