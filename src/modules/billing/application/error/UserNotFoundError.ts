export class UserNotFoundError extends Error {
  static message = 'Usuário não encontrado.';
  constructor(readonly message: string = UserNotFoundError.message) {
    super(message);
    this.name = 'UserNotFoundError';
  }
}
