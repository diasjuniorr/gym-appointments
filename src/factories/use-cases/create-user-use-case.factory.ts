import { PrismaClient } from "@prisma/client";
import { UsersRepisitory } from "../../repositories/users-repository";
import { CreateUserUseCase } from "../../use-cases/create-user-use-case";

export const createUserUseCaseFactory = (db: PrismaClient) => {
  const usersRepository = new UsersRepisitory(db);
  return new CreateUserUseCase(usersRepository);
};
