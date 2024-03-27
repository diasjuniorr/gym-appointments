import fastify from "fastify";
import { CreateUserController } from "./http/controllers/create-user.controller";
import { prisma } from "./lib/prisma";
import { UsersRepisitory } from "./repositories/users-repository";
import { CreateUserUseCase } from "./use-cases/create-user-use-case";

export const app = fastify();

const usersRepository = new UsersRepisitory(prisma);
const createUserUseCase = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUserUseCase);

app.post("/users", createUserController.execute);
