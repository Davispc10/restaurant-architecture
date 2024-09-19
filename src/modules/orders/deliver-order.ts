import { Elysia, t } from 'elysia';
import { auth } from '../../shared/infra/adapter/driver/rest/middlewares/auth';
import { db } from '../../shared/infra/adapter/driven/persistence/drizzle/connection';
import { UnauthorizedError } from '../../shared/infra/error/UnauthorizedError';
import { orders } from '../../shared/infra/adapter/driven/persistence/drizzle/schema';
import { eq } from 'drizzle-orm';

export const deliverOrder = new Elysia().use(auth).patch(
  '/orders/:orderId/deliver',
  async ({ getCurrentUser, params, set }) => {
    const { orderId } = params;
    const { restaurantId } = await getCurrentUser();

    if (!restaurantId) {
      throw new UnauthorizedError();
    }
    const order = await db.query.orders.findFirst({
      where(fields, { eq, and }) {
        return and(eq(fields.id, orderId), eq(fields.restaurantId, restaurantId));
      },
    });

    if (!order) {
      set.status = 400;
      return { message: 'Order not found.' };
    }

    if (order.status !== 'delivering') {
      set.status = 400;
      return { message: 'You cannot deliver orders that are not in "delivering" status.' };
    }

    await db.update(orders).set({ status: 'delivered' }).where(eq(orders.id, orderId));

    return { message: 'Order approved.' };
  },
  {
    params: t.Object({
      orderId: t.String(),
    }),
  },
);
