import { UseCaseError } from "../errors/use-case-error";

export class UserAlreadyExistsError extends UseCaseError {
  constructor() {
    super("user already exists", 409);
  }
}
