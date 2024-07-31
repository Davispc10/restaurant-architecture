import { z } from 'zod';

export class GetPaymentSlipBookletInput {
  static schema = z.object({
    proposalId: z.coerce.number().int().positive()
  });

  private constructor(readonly proposalId: number) {}

  public static from({ proposalId }: GetPaymentSlipBookletInput): GetPaymentSlipBookletInput {
    const validatedData = GetPaymentSlipBookletInput.schema.parse({ proposalId });
    return new GetPaymentSlipBookletInput(validatedData.proposalId);
  }
}
