import { t } from 'elysia';

export class GetManagedRestaurantInput {
  static schema = t.Object({
    restaurantId: t.String()
  });

  private constructor(readonly restaurantId: string) {}

  public static from({ restaurantId }: GetManagedRestaurantInput): GetManagedRestaurantInput {
    const validatedData = GetManagedRestaurantInput.schema.parse({ restaurantId });
    return new GetManagedRestaurantInput(validatedData.restaurantId);
  }
}
