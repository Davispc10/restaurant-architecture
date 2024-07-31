export class InvalidProposalStatusError extends Error {
  static message = 'Proposta não está no status de geração de boletos.';
  constructor(readonly message: string = InvalidProposalStatusError.message) {
    super(message);
    this.name = 'InvalidProposalStatusError';
  }
}
