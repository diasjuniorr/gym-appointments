import { describe, it, beforeEach, expect } from "vitest";
import { GetUserProfileUseCase } from "./get-user-profile-use-case";
import { InMemoryUsersRepository } from "../repositories/in-mermoy/in-memory-users-repository";
import { UserNotFoundError } from "./errors/use-case-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("GetUserProfileUseCase", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(inMemoryUsersRepository);

    await inMemoryUsersRepository.create({
      name: "any_name",
      email: "any_email",
      password_hash: "any_password_hash",
    });
  });

  it("should return a user profile", async () => {
    const response = await sut.execute("any_id");

    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual({
      name: "any_name",
      email: "any_email",
      password_hash: "any_password_hash",
      id: "any_id",
      created_at: expect.any(Date),
    });
  });

  it("should return a UserNotFoundError if user does not exist", async () => {
    const response = await sut.execute("invalid_id");

    expect(response.isLeft()).toBe(true);
    expect(response.value).toBeInstanceOf(UserNotFoundError);
  });
});
