export class AuthorizationError extends Error {
  code: string;
  status: number;
  constructor(message = 'User is not authorized') {
    super(message);
    this.code = 'AuthorizationError';
    this.status = 403;
  }
}
