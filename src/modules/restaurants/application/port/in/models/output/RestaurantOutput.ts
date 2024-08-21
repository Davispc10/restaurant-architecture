import type { Restaurant } from '../../../../../domain/restaurant/Restaurant';

export class RestaurantOutput {
  private constructor(readonly restaurant: Restaurant) {}

  public static from(restaurant: Restaurant): RestaurantOutput {
    return new RestaurantOutput(restaurant);
  }
}
