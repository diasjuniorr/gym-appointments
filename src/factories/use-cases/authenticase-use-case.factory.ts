import { PrismaClient } from "@prisma/client";
import { AuthenticateUseCase } from "../../use-cases/authenticate-use-case";
import { UsersRepisitory } from "../../repositories/users-repository";

export const authenticateUseCaseFactory = (db: PrismaClient) => {
  const usersRepository = new UsersRepisitory(db);
  return new AuthenticateUseCase(usersRepository);
};
