import { FastifyInstance } from "fastify";
import { createCreateUserControllerFactory } from "../factories/controllers/create-user-controller.factoru";
import { prisma } from "../lib/prisma";

const createUserController = createCreateUserControllerFactory(prisma);

export async function setupRoutes(app: FastifyInstance) {
  app.post("/users", createUserController.execute);
}
