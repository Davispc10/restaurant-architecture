import { ManagedRestaurantError } from './error/ManagedRestaurantError';
import { UserNotManagerError } from './error/UserNotManagerError';
import type { GetManagedRestaurantInputPort } from '../port/in/GetManagedRestaurantInputPort';
import type { RestaurantRepository } from '../port/out/RestaurantRepository';
import type { GetManagedRestaurantInput } from './input/GetManagedRestaurantInput';
import { GetManagedRestaurantOutput } from './out/GetManagedRestaurantOutput';
import ModuleErrorHandler from '../../../../shared/infraestructure/moduleErrorHandler/ModuleErrorHandler';

export class GetManagedRestaurantUseCase implements GetManagedRestaurantInputPort {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}
  @ModuleErrorHandler()
  async execute({ restaurantId }: GetManagedRestaurantInput): Promise<GetManagedRestaurantOutput> {
    if (!restaurantId) {
      throw new UserNotManagerError();
    }
    const restaurant = await this.restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      throw new ManagedRestaurantError();
    }
    return GetManagedRestaurantOutput.from(restaurant);
  }
}
