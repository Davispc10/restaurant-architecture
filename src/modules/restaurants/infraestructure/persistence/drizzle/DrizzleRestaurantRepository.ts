import { db } from '../../../../../shared/infraestructure/persistence/drizzle/connection';
import { restaurants } from './schema/restaurants';
import type { RestaurantRepository } from '../../../application/port/out/RestaurantRepository';
import { Restaurant } from '../../../domain/restaurant/Restaurant';

export class DrizzleRestaurantRepository implements RestaurantRepository {
  async create(restaurant: Restaurant): Promise<Restaurant> {
    const { name, description, managerId } = restaurant.toJSON();
    const [restaurantStored] = await db
      .insert(restaurants)
      .values({
        name,
        description,
        managerId
      })
      .returning();
    return Restaurant.from(
      restaurantStored.id,
      restaurantStored.name,
      restaurantStored.description,
      restaurantStored.managerId,
      restaurantStored.createdAt,
      restaurantStored.updatedAt
    );
  }

  async findById(restaurantId: string): Promise<Restaurant | null> {
    const restaurantStored = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, restaurantId);
      }
    });
    return restaurantStored
      ? Restaurant.from(
          restaurantStored.id,
          restaurantStored.name,
          restaurantStored.description,
          restaurantStored.managerId,
          restaurantStored.createdAt,
          restaurantStored.updatedAt
        )
      : null;
  }

  async findByName(restaurantName: string): Promise<Restaurant | null> {
    const restaurantStored = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.name, restaurantName);
      }
    });
    return restaurantStored
      ? Restaurant.from(
          restaurantStored.id,
          restaurantStored.name,
          restaurantStored.description,
          restaurantStored.managerId,
          restaurantStored.createdAt,
          restaurantStored.updatedAt
        )
      : null;
  }
}
