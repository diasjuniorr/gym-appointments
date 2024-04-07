import { FastifyInstance } from "fastify";
import { createCreateUserControllerFactory } from "../factories/controllers/create-user-controller.factory";
import { prisma } from "../lib/prisma";
import { createAuthenticateControllerFactory } from "../factories/controllers/authenticate-controller.factory";
import { getUserProfileControllerFactory } from "../factories/controllers/get-user-profile-controller.factory";

const createUserController = createCreateUserControllerFactory(prisma);
const authenticateController = createAuthenticateControllerFactory(prisma);
const getUserProfileController = getUserProfileControllerFactory(prisma);

export async function setupRoutes(app: FastifyInstance) {
  app.post("/users", createUserController.execute);
  app.get("/users/:id", getUserProfileController.execute);

  app.post("/auth", authenticateController.execute);
}
