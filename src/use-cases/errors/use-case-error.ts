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
