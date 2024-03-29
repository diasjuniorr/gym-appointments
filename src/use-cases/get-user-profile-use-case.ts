import { Either, left, right } from "../types/either";
import { IUsersRepository, User } from "./contracts/users-repository";
import {
  UnknownUseCaseError,
  UseCaseError,
  UserNotFoundError,
} from "./errors/use-case-error";

export type GetUserProfileUseCaseResponse = Either<UseCaseError, User>;

export interface GetUserProfileUseCaseRequest {
  id: string;
}

export class GetUserProfileUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(id: string): Promise<GetUserProfileUseCaseResponse> {
    const result = await this.usersRepository.findById(id);

    if (result.isLeft()) {
      return left(new UnknownUseCaseError(result.value.message));
    }

    if (!result.value) {
      return left(new UserNotFoundError());
    }

    return right(result.value);
  }
}
