import type { GetManagedRestaurantInput } from './model/input/GetManagedRestaurantInput';
import type { RestaurantOutput } from './model/output/RestaurantOutput';

export interface GetManagedRestaurantInputPort {
  execute(input: GetManagedRestaurantInput): Promise<RestaurantOutput>;
}
