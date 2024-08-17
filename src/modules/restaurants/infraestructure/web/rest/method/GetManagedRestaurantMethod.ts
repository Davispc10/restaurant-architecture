import { container } from 'tsyringe';
import ModuleErrorHandler from '../../../../../../shared/infraestructure/moduleErrorHandler/ModuleErrorHandler';
import type { GetManagedRestaurantInputPort } from '../../../../application/port/in/GetManagedRestaurantInputPort';

export class GetManagedRestaurantMethod {
  @ModuleErrorHandler()
  public static async getManagedRestaurant(input: any) {
    const inputPort = container.resolve<GetManagedRestaurantInputPort>(
      'GetManagedRestaurantInputPort'
    );
    return inputPort.execute({ restaurantId: input.restaurantId });
  }
}
