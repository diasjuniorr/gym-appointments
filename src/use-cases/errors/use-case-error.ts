export class UseCaseError extends Error {
  code: number;

  constructor(msg: string, code: number) {
    super(msg);
    this.code = code;
  }
}

export class UnknownUseCaseError extends UseCaseError {
  constructor(msg: string) {
    super(msg, 500);
  }
}

export class UserAlreadyExistsError extends UseCaseError {
  constructor() {
    super("user already exists", 409);
  }
}

export class UserNotFoundError extends UseCaseError {
  constructor() {
    super("user not found", 404);
  }
}

export class InvalidCredentialsError extends UseCaseError {
  constructor() {
    super("invalid credentials", 401);
  }
}
