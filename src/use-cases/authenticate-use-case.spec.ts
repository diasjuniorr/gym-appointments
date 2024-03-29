import { describe, it, beforeEach, expect } from "vitest";
import { IUsersRepisitory } from "./contracts/users-repository";
import { AuthenticateUseCase } from "./authenticate-use-case";
import { InMemoryUsersRepository } from "../repositories/in-mermoy/in-memory-users-repository";
import { hash } from "bcryptjs";

let inMemoryUserRepository: IUsersRepisitory;
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
});
