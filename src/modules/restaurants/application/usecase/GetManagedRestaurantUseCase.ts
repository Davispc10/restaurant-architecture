import type { GetManagedRestaurantInputPort } from '../port/in/GetManagedRestaurantInputPort';
import type { RestaurantRepository } from '../port/out/RestaurantRepository';
import type { GetManagedRestaurantInput } from '../port/in/models/input/GetManagedRestaurantInput';
import { RestaurantOutput } from '../port/in/models/output/RestaurantOutput';
import { AuthorizationError } from '../../../../shared/infraestructure/error/AuthorizationError';
import { NotFoundError } from '../../../../shared/infraestructure/error/NotFoundError';

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
