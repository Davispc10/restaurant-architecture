import Elysia from 'elysia';
import { container } from 'tsyringe';
import { CreateRestaurantInput } from '../../../../application/port/driver/model/input/CreateRestaurantInput';
import type { CreateRestaurantInputPort } from '../../../../application/port/driver/CreateRestaurantInputPort';
import { Messages } from '../../common/Messages';
import ModuleErrorHandler from '@shared/infra/moduleErrorHandler/ModuleErrorHandler';

class RegisterRestaurant {
  @ModuleErrorHandler()
  static async registerRestaurant(body: CreateRestaurantInput) {
    const { restaurantName, managerName, email, phone } = body;
    const inputPort = container.resolve<CreateRestaurantInputPort>('CreateRestaurantInputPort');
    await inputPort.execute({
      restaurantName,
      managerName,
      email,
      phone,
    });
    return {
      message: Messages.RESTAURANT_GENERATION_SUCCESS_MESSAGE,
    };
  }
}

export const registerRestaurantRoute = new Elysia().post(
  '/restaurants',
  async ({ body }) => {
    return RegisterRestaurant.registerRestaurant(body);
  },
  {
    body: CreateRestaurantInput.schema,
  },
);
