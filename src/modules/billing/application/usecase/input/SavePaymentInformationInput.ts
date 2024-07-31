import { PaymentSlipProps } from '$modules/billing/domain/paymentSlip/PaymentSlip';
import { PaymentSlipValidator } from '$modules/billing/domain/paymentSlip/PaymentSlipValidator';
import { Proposal } from '$types';
import { z } from 'zod';

export class SavePaymentInformationInput {
  static schema = z.object({
    proposal: z
      .object({ id: z.number().positive(), borrower: z.number().positive() })
      .passthrough(),
    payload: z.object({
      response: z.object({
        paymentSlips: z.array(PaymentSlipValidator),
        paymentSlipBooklet: z.object({
          fileKey: z.string(),
          documentHash: z.string()
        }),
        generatedBy: z.string()
      })
    })
  });

  private constructor(
    readonly proposal: Proposal,
    readonly payload: {
      response: {
        paymentSlips: PaymentSlipProps[];
        paymentSlipBooklet: {
          fileKey: string;
          documentHash: string;
        };
        generatedBy: string;
      };
    }
  ) {}

  public static from({
    proposal,
    payload
  }: SavePaymentInformationInput): SavePaymentInformationInput {
    const validatedData = SavePaymentInformationInput.schema.parse({ proposal, payload });
    return new SavePaymentInformationInput(
      validatedData.proposal as Proposal,
      validatedData.payload
    );
  }
}
