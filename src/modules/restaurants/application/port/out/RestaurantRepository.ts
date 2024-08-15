import type { Restaurant } from '../../../domain/restaurant/Restaurant';

export interface RestaurantRepository {
  create(restaurant: Restaurant): Promise<Restaurant>;
  findByName(restaurantName: string): Promise<Restaurant | null>;
  findById(restaurantId: string): Promise<Restaurant | null>;
}
