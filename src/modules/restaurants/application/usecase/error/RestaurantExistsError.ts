export class RestaurantExistsError extends Error {
  code: string;
  status: number;
  constructor(message = 'Restaurant already exists.') {
    super(message);
    this.code = 'RestaurantExistsError';
    this.status = 409;
  }
}
