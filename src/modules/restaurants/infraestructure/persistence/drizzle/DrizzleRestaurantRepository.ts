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
    return this.toEntity(restaurantStored);
  }

  async findById(restaurantId: string): Promise<Restaurant | null> {
    const restaurantStored = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, restaurantId);
      }
    });
    return restaurantStored ? this.toEntity(restaurantStored) : null;
  }

  async findByName(restaurantName: string): Promise<Restaurant | null> {
    const restaurantStored = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.name, restaurantName);
      }
    });
    return restaurantStored ? this.toEntity(restaurantStored) : null;
  }

  private toEntity(restaurantModel: typeof restaurants.$inferSelect): Restaurant {
    return Restaurant.from(
      restaurantModel.id,
      restaurantModel.name,
      restaurantModel.description,
      restaurantModel.managerId,
      restaurantModel.createdAt,
      restaurantModel.updatedAt
    );
  }
}
