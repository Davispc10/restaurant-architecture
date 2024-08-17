export class UserNotManagerError extends Error {
  code: string;
  status: number;
  constructor(readonly message = 'User is not a manager') {
    super(message);
    this.code = 'UserNotManagerError';
    this.status = 403;
  }
}
