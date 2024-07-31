export class PaymentSlipBookletRetrivalError extends Error {
  static message = 'Erro ao recuperar boleto consolidado.';
  constructor(readonly message: string = PaymentSlipBookletRetrivalError.message) {
    super(message);
    this.name = 'PaymentSlipBookletRetrivalError';
  }
}
