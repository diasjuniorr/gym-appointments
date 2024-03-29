import { PrismaClient } from "@prisma/client";
import { CreateUserController } from "../../http/controllers/create-user.controller";
import { createUserUseCaseFactory } from "../use-cases/create-user-use-case.factory";

export const createCreateUserControllerFactory = (db: PrismaClient) => {
  return new CreateUserController(createUserUseCaseFactory(db));
};
