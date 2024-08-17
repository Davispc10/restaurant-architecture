import Elyia from 'elysia';
import { auth } from '../../shared/infraestructure/web/rest/middlewares/auth';
import dayjs from 'dayjs';
import { UnauthorizedError } from '../../shared/infraestructure/error/UnauthorizedError';
import { db } from '../../shared/infraestructure/persistence/drizzle/connection';
import { orders } from '../../shared/infraestructure/persistence/drizzle/schema';
import { and, count, eq, gte, sql } from 'drizzle-orm';

export const getMonthCanceledOrdersAmount = new Elyia()
  .use(auth)
  .get('/metricst/month-canceled-orders-amount', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser();
    if (!restaurantId) {
      throw new UnauthorizedError();
    }

    const today = dayjs();
    const lastmonth = today.subtract(1, 'month');
    const startOfLastMonth = lastmonth.startOf('month');

    const ordersPerMonth = await db
      .select({
        montWithMontyhAndYear: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        amount: count()
      })
      .from(orders)
      .where(
        and(
          eq(orders.restaurantId, restaurantId),
          eq(orders.status, 'cancelled'),
          gte(orders.createdAt, startOfLastMonth.toDate())
        )
      )
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`);

    const currentMonthWithYear = today.format('YYYY-MM');
    const lastMonthWithYear = lastmonth.format('YYYY-MM');

    const currentMonthOrdersAmount = ordersPerMonth.find(
      ({ montWithMontyhAndYear }) => montWithMontyhAndYear === currentMonthWithYear
    );
    const lastMonthReceipt = ordersPerMonth.find(
      ({ montWithMontyhAndYear }) => montWithMontyhAndYear === lastMonthWithYear
    );

    const diffFromLastMonth =
      currentMonthOrdersAmount && lastMonthReceipt
        ? (currentMonthOrdersAmount.amount * 100) / lastMonthReceipt.amount
        : null;

    return {
      amount: currentMonthOrdersAmount?.amount,
      diffFromLastMonth: diffFromLastMonth ? Number((diffFromLastMonth - 100).toFixed(2)) : 0
    };
  });
