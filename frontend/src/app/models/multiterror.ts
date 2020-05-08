export class MultiTError extends Error {
  public message: string;
  public name: string;
  public stack: string;

  constructor(message?: string) {
    super(message);
  }
}
