import { right } from "../../types/either";
import {
  IUsersRepisitory,
  User,
  UsersRepositoryCreateUserResponse,
  UsersRepositoryFindByEmailResponse,
} from "../../use-cases/contracts/users-repository";

export class InMemoryUsersRepository implements IUsersRepisitory {
  public users: User[] = [];

  async create({
    name,
    email,
    password_hash,
  }: User): Promise<UsersRepositoryCreateUserResponse> {
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
}
