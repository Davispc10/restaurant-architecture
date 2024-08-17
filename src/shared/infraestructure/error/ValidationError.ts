export class ValidationError extends Error {
  code: string;
  status: number;
  constructor(error: any, stack: string, message = 'Validation schema error') {
    super(message);
    this.code = 'ValidationError';
    this.status = 424;
    this.message = stack;
    this.stack = error ?? '';
  }
}
