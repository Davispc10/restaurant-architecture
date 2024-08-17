import { Elysia, t } from 'elysia';
import { auth } from '../../shared/infraestructure/web/rest/middlewares/auth';
import { db } from '../../shared/infraestructure/persistence/drizzle/connection';
import { UnauthorizedError } from '../../shared/infraestructure/error/UnauthorizedError';
import { orders } from '../../shared/infraestructure/persistence/drizzle/schema';
import { eq } from 'drizzle-orm';

export const approveOrder = new Elysia().use(auth).patch(
  '/orders/:orderId/approve',
  async ({ getCurrentUser, params, set }) => {
    const { orderId } = params;
    const { restaurantId } = await getCurrentUser();

    if (!restaurantId) {
      throw new UnauthorizedError();
    }
    const order = await db.query.orders.findFirst({
      where(fields, { eq, and }) {
        return and(eq(fields.id, orderId), eq(fields.restaurantId, restaurantId));
      }
    });

    if (!order) {
      set.status = 400;
      return { message: 'Order not found.' };
    }

    if (order.status !== 'pending') {
      set.status = 400;
      return { message: 'Order is not pending.' };
    }

    await db.update(orders).set({ status: 'processing' }).where(eq(orders.id, orderId));

    return { message: 'Order approved.' };
  },
  {
    params: t.Object({
      orderId: t.String()
    })
  }
);
