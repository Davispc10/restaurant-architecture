import Elysia from 'elysia';
import { auth } from '../../../../../shared/infraestructure/web/rest/middlewares/auth';
import { container } from 'tsyringe';
import type { GetManagedRestaurantInputPort } from '../../../application/port/in/GetManagedRestaurantInputPort';
import { Messages } from '../common/Messages';
import ModuleErrorHandler from '../../../../../shared/infraestructure/moduleErrorHandler/ModuleErrorHandler';

class GetManagedRestaurant {
  @ModuleErrorHandler()
  static async getManagedRestaurant(restaurantId: string | undefined) {
    const inputPort = container.resolve<GetManagedRestaurantInputPort>(
      'GetManagedRestaurantInputPort'
    );
    const output = await inputPort.execute({ restaurantId });
    return {
      message: Messages.GET_RESTAURANT_SUCCESS_MESSAGE,
      response: output
    };
  }
}

export const getManagedRestaurantRoute = new Elysia()
  .use(auth)
  .get('/managed-restaurant', async ({ getCurrentUser }) => {
    const { restaurantId } = await getCurrentUser();
    return GetManagedRestaurant.getManagedRestaurant(restaurantId);
  });
