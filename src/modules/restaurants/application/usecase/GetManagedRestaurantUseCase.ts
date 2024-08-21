import { ManagedRestaurantError } from './error/ManagedRestaurantError';
import { UserNotManagerError } from './error/UserNotManagerError';
import type { GetManagedRestaurantInputPort } from '../port/in/GetManagedRestaurantInputPort';
import type { RestaurantRepository } from '../port/out/RestaurantRepository';
import type { GetManagedRestaurantInput } from '../port/in/models/input/GetManagedRestaurantInput';
import { RestaurantOutput } from '../port/in/models/output/RestaurantOutput';

export class GetManagedRestaurantUseCase implements GetManagedRestaurantInputPort {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}
  async execute({ restaurantId }: GetManagedRestaurantInput): Promise<RestaurantOutput> {
    if (!restaurantId) {
      throw new UserNotManagerError();
    }
    const restaurant = await this.restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      throw new ManagedRestaurantError();
    }
    return RestaurantOutput.from(restaurant);
  }
}
