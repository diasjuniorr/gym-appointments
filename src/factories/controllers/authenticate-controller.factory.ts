import { PrismaClient } from "@prisma/client";
import { AuthenticateController } from "../../http/controllers/authenticate-controller";
import { authenticateUseCaseFactory } from "../use-cases/authenticase-use-case.factory";

export const createAuthenticateControllerFactory = (db: PrismaClient) => {
  return new AuthenticateController(authenticateUseCaseFactory(db));
};
