import { Either } from "../../types/either";

export interface User {
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

export interface CreateUserRepositoryInput {
  name: string;
  email: string;
  password_hash: string;
}

export type UsersRepositoryCreateUserResponse = Either<Error, { user: User }>;

export interface IUsersRepisitory {
  create(
    props: CreateUserRepositoryInput
  ): Promise<UsersRepositoryCreateUserResponse>;
  findByEmail(email: string): Promise<User | null>;
}
