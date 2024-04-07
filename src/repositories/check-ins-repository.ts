import { PrismaClient } from "@prisma/client";
import {
  CheckInsRespositoryCreateCheckInResponse,
  CreateCheckInRepositoryInput,
  ICheckInsRepository,
} from "../use-cases/contracts/check-ins-repository";
import { left, right } from "../types/either";

export class CheckInsRepository implements ICheckInsRepository {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async create({
    userId,
    gymId,
  }: CreateCheckInRepositoryInput): Promise<CheckInsRespositoryCreateCheckInResponse> {
    try {
      const checkIn = await this.db.checkIn.create({
        data: {
          user_id: userId,
          gym_id: gymId,
        },
      });

      return right({
        userId: checkIn.user_id,
        gymId: checkIn.gym_id,
        id: checkIn.id,
        createdAt: checkIn.created_at,
        validatedAt: checkIn.validated_at,
      });
    } catch (error) {
      console.log("error creating check-in");
      return left(new Error(`error creating check-in: ${error}`));
    }
  }
}
