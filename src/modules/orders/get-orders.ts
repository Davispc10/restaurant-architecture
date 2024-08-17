import { Elysia, t } from 'elysia';
import { auth } from '../../shared/infraestructure/web/rest/middlewares/auth';
import { db } from '../../shared/infraestructure/persistence/drizzle/connection';
import { UnauthorizedError } from '../../shared/infraestructure/error/UnauthorizedError';
import { createSelectSchema } from 'drizzle-typebox';
import { orders, users } from '../../shared/infraestructure/persistence/drizzle/schema';
import { and, count, desc, eq, ilike, sql } from 'drizzle-orm';

export const getOrders = new Elysia().use(auth).get(
  '/orders',
  async ({ getCurrentUser, query }) => {
    const { restaurantId } = await getCurrentUser();
    const { customerName, orderId, status, pageIndex } = query;

    if (!restaurantId) {
      throw new UnauthorizedError();
    }

    // const orderTableColumns = getTableColumns(orders);

    const baseQuery = db
      .select({
        orderId: orders.id,
        createdAt: orders.createdAt,
        status: orders.status,
        total: orders.totalInCents,
        customerName: users.name
      })
      .from(orders)
      .innerJoin(users, eq(users.id, orders.customerId))
      .where(
        and(
          eq(orders.restaurantId, restaurantId),
          orderId ? ilike(orders.id, `%${orderId}%`) : undefined,
          status ? ilike(orders.status, status) : undefined,
          customerName ? ilike(users.name, `${customerName}`) : undefined
        )
      );

    const [[{ count: amountOfOrders }], allOrders] = await Promise.all([
      db.select({ count: count() }).from(baseQuery.as('baseQuery')),
      db
        .select()
        .from(baseQuery.as('baseQuery'))
        .offset(pageIndex * 10)
        .limit(10)
        .orderBy((fields) => {
          return [
            sql`CASE ${fields.status}
              WHEN 'pending' THEN 1
              WHEN 'processing' THEN 2
              WHEN 'delivering' THEN 3
              WHEN 'delivered' THEN 4
              WHEN 'cancelled' THEN 99
            END`,
            desc(fields.createdAt)
          ];
        })
    ]);

    return {
      orders: allOrders,
      meta: {
        pageIndex,
        perPage: 10,
        totalCount: amountOfOrders
      }
    };
  },
  {
    query: t.Object({
      customerName: t.Optional(t.String()),
      orderId: t.Optional(t.String()),
      status: t.Optional(createSelectSchema(orders).properties.status),
      pageIndex: t.Numeric({ minimum: 0 })
    })
  }
);
