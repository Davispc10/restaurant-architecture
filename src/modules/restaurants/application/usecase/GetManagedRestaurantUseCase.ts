import type { GetManagedRestaurantInputPort } from '../port/driver/GetManagedRestaurantInputPort';
import type { RestaurantRepository } from '../port/driven/RestaurantRepository';
import type { GetManagedRestaurantInput } from '../port/driver/model/input/GetManagedRestaurantInput';
import { RestaurantOutput } from '../port/driver/model/output/RestaurantOutput';
import { AuthorizationError } from '@shared/infra/error/AuthorizationError';
import { NotFoundError } from '@shared/infra/error/NotFoundError';

export class GetManagedRestaurantUseCase implements GetManagedRestaurantInputPort {
  constructor(private readonly restaurantRepository: RestaurantRepository) {}
  async execute({ restaurantId }: GetManagedRestaurantInput): Promise<RestaurantOutput> {
    if (!restaurantId) {
      throw new AuthorizationError('User is not a manager');
    }
    const restaurant = await this.restaurantRepository.findById(restaurantId);
    if (!restaurant) {
      throw new NotFoundError('Restaurant is not founded.');
    }
    return RestaurantOutput.from(restaurant);
  }
}
