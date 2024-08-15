import { db } from '../../../../../shared/infraestructure/persistence/drizzle/connection';
import { restaurants } from '../../../../../shared/infraestructure/persistence/drizzle/schema/restaurants';
import type { RestaurantRepository } from '../../../application/port/out/RestaurantRepository';
import { Restaurant } from '../../../domain/restaurant/Restaurant';

export class DrizzleRestaurantRepository implements RestaurantRepository {
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

  async findById(restaurantId: string): Promise<Restaurant | null> {
    const restaurantStored = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, restaurantId);
      }
    });
    return restaurantStored ? new Restaurant(restaurantStored) : null;
  }

  async findByName(restaurantName: string): Promise<Restaurant | null> {
    const restaurantStored = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.name, restaurantName);
      }
    });
    return restaurantStored ? new Restaurant(restaurantStored) : null;
  }
}
