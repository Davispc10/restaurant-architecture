import type { GetManagedRestaurantInput } from '../../usecase/input/GetManagedRestaurantInput';
import type { GetManagedRestaurantOutput } from '../../usecase/out/GetManagedRestaurantOutput';

export interface GetManagedRestaurantInputPort {
  execute(input: GetManagedRestaurantInput): Promise<GetManagedRestaurantOutput>;
}
