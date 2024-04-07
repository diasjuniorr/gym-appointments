import { Either } from "../../types/either";

export interface CheckIn {
  id: string;
  userId: string;
  gymId: string;
  createdAt: Date;
  validatedAt: Date | null;
}

export interface CreateCheckInRepositoryInput {
  userId: string;
  gymId: string;
}

export type CheckInsRespositoryCreateCheckInResponse = Either<Error, CheckIn>;

export interface ICheckInsRepository {
  create(
    props: CreateCheckInRepositoryInput
  ): Promise<CheckInsRespositoryCreateCheckInResponse>;
}
