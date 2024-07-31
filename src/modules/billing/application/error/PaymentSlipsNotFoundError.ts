export class PaymentSlipsNotFoundError extends Error {
  static message = 'Nenhum boleto encontrado.';
  constructor(readonly message: string = PaymentSlipsNotFoundError.message) {
    super(message);
    this.name = 'PaymentSlipsNotFoundError';
  }
}
