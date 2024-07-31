import { z } from 'zod';

export class GetPaymentSlipsInput {
  static schema = z.object({
    proposalId: z.coerce.number().int().positive(),
    installment: z.coerce.number().int().positive().optional(),
    outdated: z
      .string()
      .refine((value) => value === 'true' || value === 'false', {
        message: "Must be 'true' or 'false'"
      })
      .transform((value) => value === 'true')
      .optional()
  });

  private constructor(
    readonly proposalId: number,
    readonly installment?: number,
    readonly outdated?: boolean
  ) {}

  public static from({
    proposalId,
    installment,
    outdated
  }: GetPaymentSlipsInput): GetPaymentSlipsInput {
    const validatedData = GetPaymentSlipsInput.schema.parse({ proposalId, installment, outdated });
    return new GetPaymentSlipsInput(
      validatedData.proposalId,
      validatedData.installment,
      validatedData.outdated
    );
  }
}
