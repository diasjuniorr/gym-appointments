import { describe, it, beforeEach, expect } from "vitest";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { InMemoryUsersRepository } from "../repositories/in-mermoy/in-memory-users-repository";
import { hash } from "bcryptjs";
import { IUsersRepository } from "./contracts/users-repository";

let inMemoryUserRepository: IUsersRepository;
let sut: AuthenticateUseCase;

describe("AuthenticateUseCase", () => {
  beforeEach(async () => {
    inMemoryUserRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(inMemoryUserRepository);

    const password_hash = await hash("password", 6);

    await inMemoryUserRepository.create({
      email: "email",
      password_hash,
      name: "name",
    });
  });

  it("should authenticate a user", async () => {
    const response = await sut.execute({
      email: "email",
      password: "password",
    });

    expect(response.isRight()).toBe(true);
  });

  it("should not authenticate a user with invalid credentials", async () => {
    const response = await sut.execute({
      email: "email",
      password: "invalid_password",
    });

    expect(response.isLeft()).toBe(true);
  });
});
