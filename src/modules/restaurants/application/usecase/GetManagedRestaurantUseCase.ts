import { ManagedRestaurantError } from '../../../billing/application/usecase/error/ManagedRestaurantError';
import type { GetManagedRestaurantInputPort } from '../port/in/GetManagedRestaurantInputPort';
import type { RestaurantRepository } from '../port/out/RestaurantRepository';
import type { GetManagedRestaurantInput } from './input/GetManagedRestaurantInput';
import { GetManagedRestaurantOutput } from './out/GetManagedRestaurantOutput';

export class GetManagedRestaurantUseCase implements GetManagedRestaurantInputPort {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}
  async execute({ restaurantId }: GetManagedRestaurantInput): Promise<GetManagedRestaurantOutput> {
    if (!restaurantId) {
      throw new Error('User is not a manager');
    }
    const restaurant = await this.restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      throw new ManagedRestaurantError();
    }
    return GetManagedRestaurantOutput.from(restaurant);
  }
}
