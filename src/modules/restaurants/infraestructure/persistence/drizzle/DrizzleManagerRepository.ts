import { db } from '../../../../../shared/infraestructure/persistence/drizzle/connection';
import { restaurants } from '../../../../../shared/infraestructure/persistence/drizzle/schema';
import type { RestaurantRepository } from '../../../application/port/out/RestaurantRepository';
import { Restaurant } from '../../../domain/restaurant/Restaurant';

class DrizzleRestaurantRepository implements RestaurantRepository {
  constructor(private readonly restaurantModel = restaurants) {}

  async create(restaurant: Restaurant): Promise<Restaurant> {
    const { name, description, managerId } = restaurant.getProps();
    const [restaurantStored] = await db
      .insert(restaurants)
      .values({
        name,
        description,
        managerId
      })
      .returning();
    return new Restaurant(restaurantStored);
  }

  async findByName(restaurantName: string): Promise<Restaurant | null> {
    return null;
  }
}
