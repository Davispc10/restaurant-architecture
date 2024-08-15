import Elysia from 'elysia';
import { auth } from '../../../../../../shared/infraestructure/web/rest/middlewares/auth';
import { container } from 'tsyringe';
import type { GetManagedRestaurantInputPort } from '../../../../application/port/in/GetManagedRestaurantInputPort';
import { Messages } from '../../common/Messages';

export const getManagedRestaurantRoute = new Elysia()
  .use(auth)
  .get('/managed-restaurant', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser();
    if (!restaurantId) {
      throw new Error('User is not a manager');
    }

    const inputPort = container.resolve<GetManagedRestaurantInputPort>(
      'GetManagedRestaurantInputPort'
    );
    const response = await inputPort.execute({ restaurantId });

    return {
      message: Messages.GET_RESTAURANT_SUCCESS_MESSAGE,
      response
    };
  });
