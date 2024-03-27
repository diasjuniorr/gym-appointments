import { hash } from "bcryptjs";
import { IUsersRepisitory } from "../contracts/users-repository";

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

  async execute({ name, email, password }: CreateUserUseCaseRequest) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("user already exists");
    }

    const password_hash = await hash(password, 6);

    return await this.usersRepository.create({ name, email, password_hash });
  }
}
