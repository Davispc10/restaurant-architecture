import type { CreateRestaurantInput } from './model/input/CreateRestaurantInput';

export interface CreateRestaurantInputPort {
  execute(input: CreateRestaurantInput): Promise<void>;
}
