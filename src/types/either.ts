/**
 * The `Left` class represents the left part of an `Either` type.
 * It is typically used to represent an error or "unsuccessful" case.
 */
export class Left<L, R> {
  readonly _tag = "Left";
  readonly value: L;

  constructor(readonly left: L) {
    this.value = left;
  }

  isRight(): this is Right<L, R> {
    return false;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }
}

/**
 * The `Right` class represents the right part of an `Either` type.
 * It is typically used to represent a success or "successful" case.
 */
export class Right<L, R> {
  readonly _tag = "Right";
  readonly value: R;
  constructor(readonly right: R) {
    this.value = right;
  }

  isRight(): this is Right<L, R> {
    return true;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }
}

/**
 * The `Either` type is a type that can hold one of two possible types: `L` or `R`.
 * It is often used in functional programming to represent a value that could be one of two possible types,
 * typically where `L` is an error type and `R` is a success type.
 */
export type Either<L, R> = Left<L, R> | Right<L, R>;

/**
 * The `left` function is a helper function to create a `Left` instance.
 * @param l - The value to be wrapped in a `Left`.
 * @returns An `Either` type with `L` set to the provided value and `R` unspecified.
 */
export const left = <L, R>(l: L): Either<L, R> => new Left(l);

/**
 * The `right` function is a helper function to create a `Right` instance.
 * @param r - The value to be wrapped in a `Right`.
 * @returns An `Either` type with `R` set to the provided value and `L` unspecified.
 */
export const right = <L, R>(r: R): Either<L, R> => new Right(r);
