import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserUseCase } from "./create-user-use-case";
import { InMemoryUsersRepository } from "../repositories/in-mermoy/in-memory-users-repository";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "./errors/use-case-error";
import { IUsersRepository } from "./contracts/users-repository";

let inMemoryUsersRepository: IUsersRepository;
let sut: CreateUserUseCase;

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should create a user", async () => {
    const response = await sut.execute({
      name: "any_name",
      email: "any_email",
      password: "any_password",
    });

    expect(response.isRight()).toBe(true);

    if (response.isLeft()) return;
    expect(response.value.user.id).toBeDefined();
  });

  it("should generate a hash for the user password", async () => {
    const password = "any_password";
    const response = await sut.execute({
      name: "any_name",
      email: "any_email",
      password,
    });

    expect(response.isRight()).toBe(true);

    if (response.isLeft()) return;
    expect(response.value.user.id).toBeDefined();

    const doesPasswordMatch = await compare(
      password,
      response.value.user.password_hash
    );
    expect(doesPasswordMatch).toBe(true);
  });

  it("should return an error if the user already exists", async () => {
    await sut.execute({
      name: "any_name",
      email: "any_email",
      password: "any_password",
    });

    const response = await sut.execute({
      name: "any_name",
      email: "any_email",
      password: "any_password",
    });

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(UserAlreadyExistsError);
  });
});
