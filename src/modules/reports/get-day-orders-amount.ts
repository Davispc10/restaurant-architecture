import Elyia from 'elysia';
import { auth } from '../../shared/infraestructure/web/rest/middlewares/auth';
import dayjs from 'dayjs';
import { UnauthorizedError } from '../../shared/infraestructure/error/UnauthorizedError';
import { db } from '../../shared/infraestructure/persistence/drizzle/connection';
import { orders } from '../../shared/infraestructure/persistence/drizzle/schema';
import { and, count, eq, gte, sql } from 'drizzle-orm';

export const getDayOrdersAmount = new Elyia()
  .use(auth)
  .get('/metricst/month-receipt', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser();
    if (!restaurantId) {
      throw new UnauthorizedError();
    }

    const today = dayjs();
    const yesterday = today.subtract(1, 'day');
    const startOfYesterday = yesterday.startOf('day');

    const ordersPerDay = await db
      .select({
        dayWithMontyhAndYear: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM-DD')`,
        amount: count()
      })
      .from(orders)
      .where(
        and(eq(orders.restaurantId, restaurantId), gte(orders.createdAt, startOfYesterday.toDate()))
      )
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM-DD')`);

    const todayWithMonthAndYear = today.format('YYYY-MM-DD');
    const yesterdayWithMonthAndYear = yesterday.format('YYYY-MM-DD');

    const todayOrdersAmount = ordersPerDay.find(
      ({ dayWithMontyhAndYear }) => dayWithMontyhAndYear === todayWithMonthAndYear
    );
    const yesterdayOrdersAmount = ordersPerDay.find(
      ({ dayWithMontyhAndYear }) => dayWithMontyhAndYear === yesterdayWithMonthAndYear
    );

    const diffFromYesterday =
      todayOrdersAmount && yesterdayOrdersAmount
        ? (todayOrdersAmount.amount * 100) / yesterdayOrdersAmount.amount
        : null;

    return {
      amount: todayOrdersAmount?.amount,
      diffFromYesterday: diffFromYesterday ? Number((diffFromYesterday - 100).toFixed(2)) : 0
    };
  });
