import { container } from 'tsyringe';
import { CreateRestaurantUseCase } from '../../../application/usecase/CreateRestaurantUseCase';
import { DrizzleRestaurantRepository } from '../../persistence/drizzle/DrizzleRestaurantRepository';
import { DrizzleManagerRepository } from '../../persistence/drizzle/DrizzleManagerRepository';

// Application Output Ports
container.register('RestaurantRepository', {
  useValue: new DrizzleRestaurantRepository()
});

container.register('ManagerRepository', {
  useValue: new DrizzleManagerRepository()
});

// Application Input Ports
container.register('CreateRestaurantInputPort', {
  useValue: new CreateRestaurantUseCase(
    container.resolve('RestaurantRepository'),
    container.resolve('ManagerRepository')
  )
});
