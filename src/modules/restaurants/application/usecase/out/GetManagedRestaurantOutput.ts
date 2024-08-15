import type { Restaurant } from '../../../domain/restaurant/Restaurant';

export class GetManagedRestaurantOutput {
  private constructor(readonly restaurant: Restaurant) {}

  public static from(restaurant: Restaurant): GetManagedRestaurantOutput {
    return new GetManagedRestaurantOutput(restaurant);
  }
}
