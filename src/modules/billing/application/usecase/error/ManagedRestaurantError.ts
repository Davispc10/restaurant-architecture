export class ManagedRestaurantError extends Error {
  static message = 'Nenhum restaurante encontrado.';
  constructor(readonly message: string = ManagedRestaurantError.message) {
    super(message);
    this.name = 'ManagedRestaurantError';
  }
}
