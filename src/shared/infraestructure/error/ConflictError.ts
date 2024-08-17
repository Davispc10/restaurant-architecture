export class ConflictError extends Error {
  code: string;
  status: number;
  constructor(message: string) {
    super(message);
    this.code = 'ConflictError';
    this.status = 409;
  }
}
