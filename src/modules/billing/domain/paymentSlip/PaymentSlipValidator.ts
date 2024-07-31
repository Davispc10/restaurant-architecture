import { z } from 'zod';

export const PaymentSlipValidator = z.object({
  id: z.coerce.number().int().positive().nullable().optional(),
  refId: z.coerce.number().int().positive().nullable().optional(),
  proposalId: z.coerce.number().int().positive(),
  installment: z.number().int(),
  dueDate: z.union([z.date(), z.string().min(1)]),
  periodDays: z.number().int().nullable().optional(),
  balance: z.coerce.number().nullable().optional(),
  interestRateValue: z.coerce.number().nullable().optional(),
  amortization: z.coerce.number().nullable(),
  createdAt: z
    .union([z.date(), z.string().min(1).min(1)])
    .nullable()
    .optional(),
  updatedAt: z
    .union([z.date(), z.string().min(1).min(1)])
    .nullable()
    .optional(),
  iofValue: z.coerce.number().nullable().optional(),
  installmentValue: z.coerce.number().nullable().optional(),
  paidAt: z.union([z.date(), z.string().min(1).min(1), z.null()]).optional(),
  balanceDue: z.coerce.number().nullable().optional(),
  installmentTaxValue: z.coerce.number().nullable().optional(),
  paidValue: z.coerce.number().nullable().optional(),
  externalId: z.string().min(1).min(1).nullable().optional(),
  externalProposalId: z.string().min(1).min(1).nullable().optional(),
  writeOffDate: z.union([z.date(), z.string().min(1), z.null()]).optional(),
  documentUrl: z.string().min(1).nullable().optional(),
  digitableLine: z.string().min(1).nullable().optional(),
  paid: z.boolean(),
  outdated: z.boolean(),
  additionalData: z.object(
    {
      generatedBy: z
        .string()
        .min(1, { message: `Couldn't load payment slip: 'generated_by' is missing.` })
    },
    { message: `Couldn't load payment slip: 'additional_data' is missing.` }
  )
});
