import { Elysia } from 'elysia';
import { auth } from '../../shared/infraestructure/web/rest/middlewares/auth';
import { UnauthorizedError } from '../../shared/application/errors/unauthorized-error';
import { db } from '../../shared/infraestructure/persistence/drizzle/connection';
import {
  orders,
  ordersItems,
  products
} from '../../shared/infraestructure/persistence/drizzle/schema';
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
