import { GetPaymentSlipBookletOutput } from '$modules/billing/application/usecase/output/GetPaymentSlipBookletOutput';

export class GetPaymentSlipBookletResponseDTO {
  readonly paymentSlipBooklet: {
    fileUrl: string;
    generatedAt: Date | string;
    idReference: string;
    downloadUrl: string;
    generatedBy: string;
  };

  private constructor(output: GetPaymentSlipBookletOutput) {
    this.paymentSlipBooklet = {
      fileUrl: output.paymentSlipBooklet.getProps().fileUrl ?? '',
      generatedAt: output.paymentSlipBooklet.getProps().updatedAt,
      idReference: output.paymentSlipBooklet.getProps().hash,
      downloadUrl: output.paymentSlipBooklet.getProps().downloadUrl ?? '',
      generatedBy: output.paymentSlipBooklet.getGeneratedBy()
    };
  }

  public static from(output: GetPaymentSlipBookletOutput) {
    return new GetPaymentSlipBookletResponseDTO(output);
  }
}
