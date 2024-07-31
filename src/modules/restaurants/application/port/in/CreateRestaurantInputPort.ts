import type { CreateRestaurantInput } from '../../usecase/input/CreateRestaurantInput';

export interface CreateRestaurantInputPort {
  execute(input: CreateRestaurantInput): Promise<void>;
}
