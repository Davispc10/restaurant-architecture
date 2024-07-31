export class PaymentSlipBookletNotFoundError extends Error {
  static message = 'Boleto consolidado não encontrado.';
  constructor(readonly message: string = PaymentSlipBookletNotFoundError.message) {
    super(message);
    this.name = 'PaymentSlipBookletNotFoundError';
  }
}
