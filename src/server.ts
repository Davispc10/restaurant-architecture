import Elysia from 'elysia';
import { registerRestaurantRoute } from './modules/restaurants/infraestructure/web/rest/routes/registerRestaurantRoute';
import { sendAuthLink } from './modules/authentication/send-auth-link';
import { authenticateFromLink } from './modules/authentication/authenticate-from-link';
import { signOut } from './modules/authentication/sign-out';
import { getProfile } from './modules/authentication/get-profile';
import { getManagedRestaurantRoute } from './modules/restaurants/infraestructure/web/rest/routes/getManagedRestaurantRoute';
import { getOrderDetails } from './modules/orders/get-order-details';
import { approveOrder } from './modules/orders/approve-order';
import { cancelOrder } from './modules/orders/cancel-order';
import { deliverOrder } from './modules/orders/deliver-order';
import { dispatchOrder } from './modules/orders/dispatch-order';
import { getOrders } from './modules/orders/get-orders';
import { getMonthReceipt } from './modules/reports/get-month-receipt';
import { getDayOrdersAmount } from './modules/reports/get-day-orders-amount';
import { getMonthOrdersAmount } from './modules/reports/get-month-orders-amount';
import { getMonthCanceledOrdersAmount } from './modules/reports/get-month-canceled-orders-amount';
import { getDailyReceiptInPeriod } from './modules/reports/get-daily-receipt-in-period';
import { getPopularProducts } from './modules/reports/get-popular-products';
import chalk from 'chalk';

const app = new Elysia()
  .use(registerRestaurantRoute)
  .use(sendAuthLink)
  .use(authenticateFromLink)
  .use(signOut)
  .use(getProfile)
  .use(getManagedRestaurantRoute)
  .use(getOrderDetails)
  .use(approveOrder)
  .use(cancelOrder)
  .use(deliverOrder)
  .use(dispatchOrder)
  .use(getOrders)
  .use(getMonthReceipt)
  .use(getDayOrdersAmount)
  .use(getMonthOrdersAmount)
  .use(getMonthCanceledOrdersAmount)
  .use(getDailyReceiptInPeriod)
  .use(getPopularProducts)
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status;
        return error.toResponse();
      }
      case 'NOT_FOUND': {
        return new Response(null, { status: 404 });
      }
      default: {
        console.error(error);
        return new Response(error.message);
      }
    }
  });

app.listen(3000, () => {
  console.log(chalk.greenBright('Server is running on port 3000'));
});
