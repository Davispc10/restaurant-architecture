export class ManagedRestaurantError extends Error {
  code: string;
  status: number;
  constructor(message = 'Nenhum restaurante encontrado.') {
    super(message);
    this.code = 'ManagedRestaurantError';
    this.status = 404;
  }
}
