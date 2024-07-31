import { z } from 'zod';

export const ManagerValidator = z.object({
  id: z.coerce.number().int().positive().nullable().optional(),
  name: z.string().min(1).nullable(),
  email: z.string().email(),
  phone: z.string().min(1).nullable(),
  role: z.literal('manager'),
  createdAt: z
    .union([z.date(), z.string().min(1).min(1)])
    .nullable()
    .optional(),
  updatedAt: z
    .union([z.date(), z.string().min(1).min(1)])
    .nullable()
    .optional()
});
