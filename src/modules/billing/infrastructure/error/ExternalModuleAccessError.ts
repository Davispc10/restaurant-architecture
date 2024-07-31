export class ExternalModuleAccessError extends Error {
  static message = 'Erro ao acessar módulo externo.';
  constructor(readonly message: string = ExternalModuleAccessError.message) {
    super(message);
    this.name = 'ExternalModuleAccessError';
  }
}
