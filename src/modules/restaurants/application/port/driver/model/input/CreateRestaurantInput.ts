import { t } from 'elysia';

export class CreateRestaurantInput {
  static schema = t.Object({
    restaurantName: t.String(),
    managerName: t.String(),
    email: t.String(),
    phone: t.String()
  });

  private constructor(
    readonly restaurantName: string,
    readonly managerName: string,
    readonly email: string,
    readonly phone: string
  ) {}

  public static from(payload: CreateRestaurantInput) {
    return new CreateRestaurantInput(
      payload.restaurantName,
      payload.managerName,
      payload.email,
      payload.phone
    );
  }
}
