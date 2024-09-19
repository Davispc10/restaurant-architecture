export class BadRequestError extends Error {
  code: string;
  status: number;
  constructor(message = 'Bad Request') {
    super(message);
    this.code = 'BadRequestError';
    this.status = 400;
  }
}
