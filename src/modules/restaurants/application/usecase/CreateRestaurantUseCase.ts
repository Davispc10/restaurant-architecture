import { NotFoundError } from 'elysia';
import { Manager } from '../../domain/manager/Manager';
import { Restaurant } from '../../domain/restaurant/Restaurant';
import type { CreateRestaurantInputPort } from '../port/driver/CreateRestaurantInputPort';
import type { ManagerRepository } from '../port/driven/ManagerRepository';
import type { RestaurantRepository } from '../port/driven/RestaurantRepository';
import type { CreateRestaurantInput } from '../port/driver/model/input/CreateRestaurantInput';
import { ConflictError } from '@shared/infra/error/ConflictError';

export class CreateRestaurantUseCase implements CreateRestaurantInputPort {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly managerRepository: ManagerRepository,
  ) {}

  async execute({
    restaurantName,
    managerName,
    email,
    phone,
  }: CreateRestaurantInput): Promise<void> {
    await this.validateRestaurantExists(restaurantName);
    const manager = Manager.create(managerName, email, phone, 'manager');
    const managerCreated = await this.managerRepository.create(manager);
    const { id: managerId } = managerCreated.getAttributes();
    if (!managerId) throw new NotFoundError('Gerente não encontrado');
    const restaurant = Restaurant.create(restaurantName, null, managerId);
    await this.restaurantRepository.create(restaurant);
  }

  private async validateRestaurantExists(restaurantName: string): Promise<void> {
    const existingRestaurant = await this.restaurantRepository.findByName(restaurantName);
    if (existingRestaurant) {
      throw new ConflictError('Restaurant already exists.');
    }
  }
}
