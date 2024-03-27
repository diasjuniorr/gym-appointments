export interface User {
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

export interface CreateUserRepositoryProps {
  name: string;
  email: string;
  password_hash: string;
}

export interface IUsersRepisitory {
  create(props: CreateUserRepositoryProps): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
