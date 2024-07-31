import { container } from 'tsyringe';
import { CreateRestaurantUseCase } from '../../../application/usecase/CreateRestaurantUseCase';

// Application Input Ports
container.register('CreateRestaurantUseCaseInputPort', {
  useValue: new CreateRestaurantUseCase(container.resolve('RestaurantRepository'))
});
