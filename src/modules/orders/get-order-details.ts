import { Elysia, t } from 'elysia';
import { auth } from '../../shared/infraestructure/web/rest/middlewares/auth';
import { UnauthorizedError } from '../../shared/application/errors/unauthorized-error';
import { db } from '../../shared/infraestructure/persistence/drizzle/connection';

export const getOrderDetails = new Elysia().use(auth).get(
  '/orders/:orderId',
  async ({ getCurrentUser, params, set }) => {
    const { orderId } = params;
    const { restaurantId } = await getCurrentUser();

    if (!restaurantId) {
      throw new UnauthorizedError();
    }

    const order = await db.query.orders.findFirst({
      columns: {
        id: true,
        status: true,
        totalInCents: true,
        createdAt: true
      },
      with: {
        customer: {
          columns: {
            name: true,
            phone: true,
            email: true
          }
        },
        orderItems: {
          columns: {
            id: true,
            quantity: true,
            priceInCents: true
          },
          with: {
            product: {
              columns: {
                name: true
              }
            }
          }
        }
      },
      where(fields, { eq, and }) {
        return and(eq(fields.id, orderId), eq(fields.restaurantId, restaurantId));
      }
    });

    if (!order) {
      set.status = 400;
      return { message: 'Order not found.' };
    }

    return order;
  },
  {
    params: t.Object({
      orderId: t.String()
    })
  }
);
