import { ICheckInsRepository } from "./contracts/check-ins-repository";

export interface CreateCheckInRequest {
  userId: string;
  gymId: string;
}

export class CreatCheckInUseCase {
  private checkInsRepository: ICheckInsRepository;

  constructor(checkInsRepository: ICheckInsRepository) {
    this.checkInsRepository = checkInsRepository;
  }

  async execute({ userId, gymId }: CreateCheckInRequest) {
    return this.checkInsRepository.create({
      userId,
      gymId,
    });
  }
}
