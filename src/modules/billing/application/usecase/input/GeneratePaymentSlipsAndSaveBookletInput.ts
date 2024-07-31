import { z } from 'zod';

export class GeneratePaymentSlipsAndSaveBookletInput {
  static schema = z.object({
    proposalId: z.coerce.number().int().positive(),
    userId: z.coerce.number().int().positive().optional()
  });

  private constructor(
    readonly proposalId: number,
    readonly userId?: number
  ) {}

  public static from({
    proposalId,
    userId
  }: GeneratePaymentSlipsAndSaveBookletInput): GeneratePaymentSlipsAndSaveBookletInput {
    const validatedData = GeneratePaymentSlipsAndSaveBookletInput.schema.parse({
      proposalId,
      userId
    });
    return new GeneratePaymentSlipsAndSaveBookletInput(
      validatedData.proposalId,
      validatedData.userId
    );
  }
}
