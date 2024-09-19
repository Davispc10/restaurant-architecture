export class NotFoundError extends Error {
  code: string;
  status: number;
  constructor(message = 'Not found!') {
    super(message);
    this.code = 'NotFoundError';
    this.status = 404;
  }
}
