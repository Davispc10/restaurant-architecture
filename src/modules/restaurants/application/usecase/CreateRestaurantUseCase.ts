import { Manager } from '../../domain/manager/Manager';
import { Restaurant } from '../../domain/restaurant/Restaurant';
import type { CreateRestaurantInputPort } from '../port/in/CreateRestaurantInputPort';
import type { ManagerRepository } from '../port/out/ManagerRepository';
import type { RestaurantRepository } from '../port/out/RestaurantRepository';
import type { CreateRestaurantInput } from './input/CreateRestaurantInput';

export class CreateRestaurantUseCase implements CreateRestaurantInputPort {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly managerRepository: ManagerRepository
  ) {}

  async execute({
    restaurantName,
    managerName,
    email,
    phone
  }: CreateRestaurantInput): Promise<void> {
    await this.validateRestaurantExists(restaurantName);
    const manager = new Manager({ name: managerName, email, phone, role: 'manager' });
    const managerCreated = await this.managerRepository.create(manager);
    const restaurant = new Restaurant({
      description: restaurantName,
      managerId: managerCreated.getProps().id
    });
    await this.restaurantRepository.create(restaurant);
  }

  private async validateRestaurantExists(restaurantName: string): Promise<void> {
    const existingRestaurant = await this.restaurantRepository.findByName(restaurantName);
    if (existingRestaurant) {
      throw new Error('Restaurante já existe');
    }
  }
}
