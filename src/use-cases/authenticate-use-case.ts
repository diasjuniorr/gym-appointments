import { compare } from "bcryptjs";
import { Either, left, right } from "../types/either";
import {
  InvalidCredentialsError,
  UnknownUseCaseError,
  UseCaseError,
} from "./errors/use-case-error";
import { IUsersRepository } from "./contracts/users-repository";

export type AuthenticateUseCaseResponse = Either<UseCaseError, null>;

export interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  private usersRepository: IUsersRepository;

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists.isLeft()) {
      return left(new UnknownUseCaseError(userExists.value.message));
    }

    if (!userExists.value) {
      return left(new InvalidCredentialsError());
    }

    const passwordMatches = await compare(
      password,
      userExists.value.password_hash
    );

    if (!passwordMatches) {
      return left(new InvalidCredentialsError());
    }

    return right(null);
  }
}
