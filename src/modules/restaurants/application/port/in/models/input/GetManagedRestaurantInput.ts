export class GetManagedRestaurantInput {
  private constructor(readonly restaurantId: string | undefined) {}

  public static from({ restaurantId }: GetManagedRestaurantInput): GetManagedRestaurantInput {
    return new GetManagedRestaurantInput(restaurantId);
  }
}
