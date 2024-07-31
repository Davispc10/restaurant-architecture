import { IDocumentsRepository } from '$modules/documents/interfaces/IDocumentsRepository';
import { ErrorLogger } from '$shared/infra/config/logger/ErrorLogger';
import { PaymentSlipBookletRepository } from '../../application/port/out/PaymentSlipBookletRepository';
import { PaymentSlipBooklet } from '../../domain/paymentSlipBooklet/PaymentSlipBooklet';
import { ExternalModuleAccessError } from '../error/ExternalModuleAccessError';

type ProposalDocument = {
  document_type: { code: string };
  id: number;
  hash: string;
  path: string;
  created_at: Date;
  updated_at: Date;
  additional_data: { generatedBy: string };
};

export class PaymentSlipBookletRepositoryGateway implements PaymentSlipBookletRepository {
  private static readonly PAYMENT_SLIP_BOOKLET_TYPE_CODE = 'payment_slip_booklet';

  constructor(
    private readonly documentsRepository: IDocumentsRepository,
    private readonly errorLogger: ErrorLogger
  ) {}

  async find(proposalId: number): Promise<PaymentSlipBooklet | null> {
    const paymentSlipDocument = await this.findPaymentSlipDocument(proposalId);
    if (!paymentSlipDocument) return null;
    return this.toEntity(paymentSlipDocument);
  }

  private async findPaymentSlipDocument(proposalId: number): Promise<ProposalDocument | null> {
    const documents = await this.getProposalDocuments(proposalId);
    const paymentSlipDocument = documents?.find(
      (document) =>
        document.document_type?.code ===
        PaymentSlipBookletRepositoryGateway.PAYMENT_SLIP_BOOKLET_TYPE_CODE
    );
    return paymentSlipDocument ?? null;
  }

  private async getProposalDocuments(proposalId: number): Promise<ProposalDocument[]> {
    try {
      const proposalDocuments = await this.documentsRepository.getAllByProposal({ proposalId });
      return proposalDocuments as unknown as ProposalDocument[];
    } catch (error: unknown) {
      this.handleError(error, proposalId, 'Erro ao recuperar documentos da proposta');
      throw new ExternalModuleAccessError();
    }
  }

  private handleError(error: unknown, proposalId: number, errorDescription: string): void {
    this.errorLogger.registerNewError({
      error: error as Error,
      proposal: proposalId,
      throwingClass: this.constructor.name,
      errorDescription
    });
  }

  private toEntity(document: ProposalDocument): PaymentSlipBooklet {
    return new PaymentSlipBooklet({
      id: document.id,
      hash: document.hash,
      path: document.path,
      createdAt: document.created_at as Date,
      updatedAt: document.updated_at as Date,
      additionalData: document.additional_data as { generatedBy: string }
    });
  }
}
