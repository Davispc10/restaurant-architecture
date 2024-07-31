export class ProposalNotFoundError extends Error {
  static message = 'Proposta não encontrada.';
  constructor(readonly message: string = ProposalNotFoundError.message) {
    super(message);
    this.name = 'ProposalNotFoundError';
  }
}
