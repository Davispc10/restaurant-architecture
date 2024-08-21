import type { CreateRestaurantInput } from './models/input/CreateRestaurantInput';

export interface CreateRestaurantInputPort {
  execute(input: CreateRestaurantInput): Promise<void>;
}
