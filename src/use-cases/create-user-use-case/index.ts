import { hash } from "bcryptjs";
import { IUsersRepisitory, User } from "../contracts/users-repository";
import { Either, left, right } from "../../types/either";
import { UserAlreadyExistsError } from "./errors";
import { UnknownUseCaseError, UseCaseError } from "../errors/use-case-error";

type CreateUserUseCaseResponse = Either<UseCaseError, { user: { id: string } }>;
export interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  private usersRepository: IUsersRepisitory;

  constructor(usersRepository: IUsersRepisitory) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError());
    }

    const password_hash = await hash(password, 6);

    const resultCreatingUser = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    if (resultCreatingUser.isLeft()) {
      return left(new UnknownUseCaseError(resultCreatingUser.value.message));
    }

    return right({ user: { id: resultCreatingUser.value.user.id } });
  }
}
