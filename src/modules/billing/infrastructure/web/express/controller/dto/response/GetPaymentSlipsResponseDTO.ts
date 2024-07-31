import { GetPaymentSlipsOutput } from '$modules/billing/application/usecase/output/GetPaymentSlipsOutput';

export class GetPaymentSlipsResponseDTO {
  readonly paymentSlips;

  private constructor(output: GetPaymentSlipsOutput) {
    this.paymentSlips = output.paymentSlips.map((paymentSlip) => ({
      digitableLine: paymentSlip.digitableLine,
      installment: paymentSlip.installment,
      installmentValue: paymentSlip.installmentValue,
      documentUrl: paymentSlip.documentUrl,
      idReference: paymentSlip.externalId,
      generatedAt: paymentSlip.createdAt,
      outdated: paymentSlip.outdated,
      generatedBy: paymentSlip.additionalData.generatedBy
    }));
  }

  public static from(output: GetPaymentSlipsOutput) {
    return new GetPaymentSlipsResponseDTO(output);
  }
}
