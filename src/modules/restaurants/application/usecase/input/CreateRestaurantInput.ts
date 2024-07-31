import { z } from 'zod';

export class CreateRestaurantInput {
  static schema = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    email: z.string(),
    phone: z.string()
  });

  private constructor(
    readonly restaurantName: string,
    readonly managerName: string,
    readonly email: string,
    readonly phone: string
  ) {}

  public static from(payload: CreateRestaurantInput) {
    const validatedData = CreateRestaurantInput.schema.parse(payload);
    return new CreateRestaurantInput(
      validatedData.restaurantName,
      validatedData.managerName,
      validatedData.email,
      validatedData.phone
    );
  }
}
