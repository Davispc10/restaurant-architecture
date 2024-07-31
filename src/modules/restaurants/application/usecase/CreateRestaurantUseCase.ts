import { Manager } from '../../domain/manager/Manager';
import { Restaurant } from '../../domain/restaurant/Restaurant';
import { RestaurantRepository } from '../domain/RestaurantRepository';
import type { CreateRestaurantInputPort } from '../port/in/CreateRestaurantInputPort';
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
    // await this.validateManagerExists(managerName);
    const manager = new Manager({ name: managerName, email, phone, role: 'manager' });
    const managerSaved = await managerRepository.save(manager);
    const restaurant = new Restaurant({ description: restaurantName, managerId: managerSaved.id });
    await this.restaurantRepository.save(restaurant);
  }

  private async validateRestaurantExists(restaurantName: string): Promise<void> {
    const existingRestaurant = await this.restaurantRepository.findByName(restaurantName);
    if (existingRestaurant) {
      throw new Error('Restaurante já existe');
    }
  }
}
