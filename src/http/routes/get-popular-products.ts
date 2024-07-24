import { Elysia } from 'elysia';
import { auth } from '../auth';
import { UnauthorizedError } from '../errors/unauthorized-error';
import { db } from '../../db/drizzle/connection';
import { orders, ordersItems, products } from '../../db/drizzle/schema';
import { desc, eq, sum } from 'drizzle-orm';

export const getPopularProducts = new Elysia()
  .use(auth)
  .get('/metrics/popular-products', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser();
    if (!restaurantId) {
      throw new UnauthorizedError();
    }

    const popularProducts = await db
      .select({
        product: products.name,
        amount: sum(ordersItems.quantity).mapWith(Number)
      })
      .from(ordersItems)
      .leftJoin(orders, eq(orders.id, ordersItems.id))
      .leftJoin(products, eq(products.id, ordersItems.productId))
      .where(eq(orders.restaurantId, restaurantId))
      .groupBy(products.name)
      .orderBy((fields) => {
        return desc(fields.amount);
      })
      .limit(5);

    return popularProducts;
  });
