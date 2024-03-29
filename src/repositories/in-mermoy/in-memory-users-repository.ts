import { right } from "../../types/either";
import {
  CreateUserRepositoryInput,
  IUsersRepository,
  User,
  UsersRepositoryCreateUserResponse,
  UsersRepositoryFindByEmailResponse,
  UsersRepositoryFindByIdResponse,
} from "../../use-cases/contracts/users-repository";

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async create({
    name,
    email,
    password_hash,
  }: CreateUserRepositoryInput): Promise<UsersRepositoryCreateUserResponse> {
    const user = {
      id: "any_id",
      name,
      email,
      password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return right(user);
  }

  async findByEmail(
    email: string
  ): Promise<UsersRepositoryFindByEmailResponse> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return right(null);
    }

    return right(user);
  }

  async findById(id: string): Promise<UsersRepositoryFindByIdResponse> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return right(null);
    }

    return right(user);
  }
}
