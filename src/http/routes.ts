import { FastifyInstance } from "fastify";
import { createCreateUserControllerFactory } from "../factories/controllers/create-user-controller.factory";
import { prisma } from "../lib/prisma";
import { createAuthenticateControllerFactory } from "../factories/controllers/authenticate-controller.factory";

const createUserController = createCreateUserControllerFactory(prisma);
const authenticateController = createAuthenticateControllerFactory(prisma);

export async function setupRoutes(app: FastifyInstance) {
  app.post("/users", createUserController.execute);
  app.post("/auth", authenticateController.execute);
}
