import { z } from 'zod';

export const PaymentSlipBookletValidator = z.object({
  id: z.coerce.number().int().positive().nullable().optional(),
  hash: z.string(),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
  path: z.string().min(1),

  fileUrl: z.string().min(1).nullable().optional(),
  downloadUrl: z.string().min(1).nullable().optional(),
  additionalData: z.object(
    {
      generatedBy: z
        .string()
        .min(1, { message: `Couldn't load payment slip booklet: 'generated_by' is missing.` })
    },
    { message: `Couldn't load payment slip booklet: 'additional_data' is missing.` }
  )
});
