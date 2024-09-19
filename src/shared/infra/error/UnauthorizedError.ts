export class UnauthorizedError extends Error {
  code: string;
  status: number;
  constructor(message = 'Unauthorized') {
    super(message);
    this.code = 'UnauthorizedError';
    this.status = 401;
  }
}
