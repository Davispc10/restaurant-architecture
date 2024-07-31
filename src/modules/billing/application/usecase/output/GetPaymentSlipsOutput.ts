import { PaymentSlip } from '$modules/billing/domain/paymentSlip/PaymentSlip';
import { PaymentSlipOutput } from './PaymentSlipOutput';

export class GetPaymentSlipsOutput {
  private constructor(readonly paymentSlips: PaymentSlipOutput[]) {}

  public static from(paymentSlips: PaymentSlip[]) {
    return new GetPaymentSlipsOutput(paymentSlips.map(PaymentSlipOutput.from));
  }
}
