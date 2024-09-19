export class ConflictError extends Error {
  code: string;
  status: number;
  constructor(message = 'ConflictError') {
    super(message);
    this.code = 'ConflictError';
    this.status = 409;
  }
}
