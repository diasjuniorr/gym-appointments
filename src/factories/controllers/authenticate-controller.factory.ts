import { PrismaClient } from "@prisma/client";
import { UsersRepisitory } from "../../repositories/users-repository";
import { AuthenticateUseCase } from "../../use-cases/authenticate-use-case";
import { AuthenticateController } from "../../http/controllers/authenticate-controller";

export const createAuthenticateControllerFactory = (db: PrismaClient) => {
  const usersRepository = new UsersRepisitory(db);
  const authenticateUseCase = new AuthenticateUseCase(usersRepository);
  return new AuthenticateController(authenticateUseCase);
};
