import { PrismaClient } from "@prisma/client";
import { UsersRepisitory } from "../../repositories/users-repository";
import { GetUserProfileUseCase } from "../../use-cases/get-user-profile-use-case";

export function getUserProfileUseCaseFactory(db: PrismaClient) {
  const usersRepository = new UsersRepisitory(db);
  return new GetUserProfileUseCase(usersRepository);
}
