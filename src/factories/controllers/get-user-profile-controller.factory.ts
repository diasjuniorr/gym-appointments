import { PrismaClient } from "@prisma/client";
import { getUserProfileUseCaseFactory } from "../use-cases/get-user-profile-use-case.factory";
import { GetUserProfileController } from "../../http/controllers/get-user-profile.controller";

export function getUserProfileControllerFactory(db: PrismaClient) {
  return new GetUserProfileController(getUserProfileUseCaseFactory(db));
}
