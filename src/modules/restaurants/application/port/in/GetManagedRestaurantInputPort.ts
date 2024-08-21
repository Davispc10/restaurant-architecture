import type { GetManagedRestaurantInput } from './models/input/GetManagedRestaurantInput';
import type { RestaurantOutput } from './models/output/RestaurantOutput';

export interface GetManagedRestaurantInputPort {
  execute(input: GetManagedRestaurantInput): Promise<RestaurantOutput>;
}
