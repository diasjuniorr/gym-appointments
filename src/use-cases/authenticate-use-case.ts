import { compare } from "bcryptjs";
import { Either, left, right } from "../types/either";
import { IUsersRepisitory } from "./contracts/users-repository";
import {
  InvalidCredentialsError,
  UnknownUseCaseError,
  UseCaseError,
} from "./errors/use-case-error";

export type AuthenticateUseCaseResponse = Either<UseCaseError, null>;

export interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  private usersRepository: IUsersRepisitory;

  constructor(usersRepository: IUsersRepisitory) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password }: AuthenticateUseCaseRequest) {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists.isLeft()) {
      return left(new UnknownUseCaseError(userExists.value.message));
    }

    if (!userExists.value) {
      return left(new InvalidCredentialsError());
    }

    const passwordMatches = compare(password, userExists.value.password_hash);

    if (!passwordMatches) {
      return left(new InvalidCredentialsError());
    }

    return right(null);
  }
}
