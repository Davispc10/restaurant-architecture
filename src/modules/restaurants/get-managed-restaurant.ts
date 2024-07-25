import Elysia from 'elysia';
import { auth } from '../../shared/infraestructure/http/middlewares/auth';
import { db } from '../../shared/infraestructure/persistence/drizzle/connection';

export const getManagedRestaurant = new Elysia()
  .use(auth)
  .get('/managed-restaurant', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser();

    if (!restaurantId) {
      throw new Error('User is not a manager');
    }
    const restaurant = await db.query.restaurants.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, restaurantId);
      }
    });

    return restaurant;
  });
