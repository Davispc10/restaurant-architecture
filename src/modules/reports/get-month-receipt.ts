import Elyia from 'elysia';
import { auth } from '../../shared/infra/web/rest/middlewares/auth';
import dayjs from 'dayjs';
import { UnauthorizedError } from '../../shared/infra/error/UnauthorizedError';
import { db } from '../../shared/infra/persistence/drizzle/connection';
import { orders } from '../../shared/infra/persistence/drizzle/schema';
import { and, eq, gte, sql, sum } from 'drizzle-orm';

export const getMonthReceipt = new Elyia()
  .use(auth)
  .get('/metricst/month-receipt', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser();
    if (!restaurantId) {
      throw new UnauthorizedError();
    }

    const today = dayjs();
    const lastmonth = today.subtract(1, 'month');
    const startOfLastMonth = lastmonth.startOf('month');

    const monthsReceipt = await db
      .select({
        monthWithYear: sql<string>`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`,
        receipt: sum(orders.totalInCents).mapWith(Number),
      })
      .from(orders)
      .where(
        and(
          eq(orders.restaurantId, restaurantId),
          gte(orders.createdAt, startOfLastMonth.toDate()),
        ),
      )
      .groupBy(sql`TO_CHAR(${orders.createdAt}, 'YYYY-MM')`);

    const currentMonthWithYear = today.format('YYYY-MM');
    const lastMonthWithYear = lastmonth.format('YYYY-MM');

    const currentMonthReceipt = monthsReceipt.find(
      ({ monthWithYear }) => monthWithYear === currentMonthWithYear,
    );
    const lastMonthReceipt = monthsReceipt.find(
      ({ monthWithYear }) => monthWithYear === lastMonthWithYear,
    );

    const diffFromLastMonth =
      currentMonthReceipt && lastMonthReceipt
        ? (currentMonthReceipt.receipt * 100) / lastMonthReceipt.receipt
        : null;

    return {
      receipt: currentMonthReceipt?.receipt,
      diffFromLastMonth: diffFromLastMonth ? Number((diffFromLastMonth - 100).toFixed(2)) : 0,
    };
  });
