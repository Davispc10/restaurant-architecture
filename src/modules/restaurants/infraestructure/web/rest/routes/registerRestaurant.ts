import Elysia from 'elysia';
import { db } from '../../../../../../shared/infraestructure/persistence/drizzle/connection';
import {
  users,
  restaurants
} from '../../../../../../shared/infraestructure/persistence/drizzle/schema';
import { container } from 'tsyringe';
import { CreateRestaurantInput } from '../../../../application/usecase/input/CreateRestaurantInput';
import type { CreateRestaurantInputPort } from '../../../../application/port/in/CreateRestaurantInputPort';

export const registerRestaurant = new Elysia().post(
  '/restaurants',
  async ({ body, set }) => {
    const { restaurantName, managerName, email, phone } = body;

    const controller = container.resolve<CreateRestaurantInputPort>(
      'CreateRestaurantUseCaseInputPort'
    );

    const [manager] = await db
      .insert(users)
      .values({
        name: managerName,
        email,
        phone,
        role: 'manager'
      })
      .returning({ id: users.id });

    await db.insert(restaurants).values({
      name: restaurantName,
      managerId: manager.id
    });

    set.status = 'No Content';
  },
  {
    body: CreateRestaurantInput.schema
  }
);
