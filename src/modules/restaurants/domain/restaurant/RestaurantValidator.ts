import { z } from 'zod';

export const RestaurantValidator = z.object({
  id: z.coerce.number().int().positive().nullable().optional(),
  description: z.string().min(1).nullable().optional(),
  managerId: z.coerce.number().int().positive().nullable().optional(),
  createdAt: z
    .union([z.date(), z.string().min(1).min(1)])
    .nullable()
    .optional(),
  updatedAt: z
    .union([z.date(), z.string().min(1).min(1)])
    .nullable()
    .optional()
});
