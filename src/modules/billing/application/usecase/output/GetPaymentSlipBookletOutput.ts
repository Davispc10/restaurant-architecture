import { PaymentSlipBooklet } from '$modules/billing/domain/paymentSlipBooklet/PaymentSlipBooklet';

export class GetPaymentSlipBookletOutput {
  private constructor(readonly paymentSlipBooklet: PaymentSlipBooklet) {}

  public static from(paymentSlipBooklet: PaymentSlipBooklet): GetPaymentSlipBookletOutput {
    return new GetPaymentSlipBookletOutput(paymentSlipBooklet);
  }
}
