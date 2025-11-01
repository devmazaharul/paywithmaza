export class CustomError extends Error {
  public status: number;

  constructor(message: string, status: number = 400) {
    super(message);
    this.name = this.constructor.name; 
    this.status = status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
