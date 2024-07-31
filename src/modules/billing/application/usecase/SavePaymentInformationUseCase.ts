import { IDocumentTypesRepository } from '$modules/documents/interfaces/IDocumentTypesRepository';
import { IDocumentsProposalRepository } from '$modules/documents/interfaces/IDocumentsProposalRepository';
import { IDocumentsRepository } from '$modules/documents/interfaces/IDocumentsRepository';
import { Transactional } from '$shared/application/decorators/Transactional.decorator';
import { convertSnakeToCamel } from '$shared/utils/caseHelper';
import { Document, Proposal } from '$types';

import { PaymentSlipRepository } from '$modules/billing/application/port/out/PaymentSlipRepository';
import { PaymentSlip, PaymentSlipProps } from '$modules/billing/domain/paymentSlip/PaymentSlip';
import { SavePaymentInformationInputPort } from '../port/in/SavePaymentInformationInputPort';
import { SavePaymentInformationInput } from './input/SavePaymentInformationInput';

export class SavePaymentInformationUseCase implements SavePaymentInformationInputPort {
  private static readonly PAYMENTS_SLIP_BOOKLET_DOCUMENT_TYPE_CODE = 'payment_slip_booklet';

  constructor(
    private readonly paymentSlipRepository: PaymentSlipRepository,
    private readonly documentTypeRepository: IDocumentTypesRepository,
    private readonly documentsRepository: IDocumentsRepository,
    private readonly documentProposalsRepository: IDocumentsProposalRepository
  ) {}

  @Transactional
  async execute({ proposal, payload }: SavePaymentInformationInput): Promise<void> {
    const { paymentSlips, paymentSlipBooklet, generatedBy } = payload.response;
    const paymentSlipsData = convertSnakeToCamel<PaymentSlipProps[]>(paymentSlips);
    await this.createPaymentSlips(proposal.id, paymentSlipsData, generatedBy);
    await this.savePaymentSlipBooklet(proposal, paymentSlipBooklet, generatedBy);
  }

  private async createPaymentSlips(
    proposalId: number,
    paymentSlipsData: PaymentSlipProps[],
    generatedBy: string
  ): Promise<void> {
    await this.outdateExistingPaymentSlips(proposalId);
    await this.insertNewPaymentSlips(paymentSlipsData, generatedBy);
  }

  private async outdateExistingPaymentSlips(proposalId: number): Promise<void> {
    const paymentSlips = await this.paymentSlipRepository.find(proposalId);
    for (const paymentSlip of paymentSlips) paymentSlip.outdate();
    await this.paymentSlipRepository.updateMany(paymentSlips);
  }

  private async insertNewPaymentSlips(
    paymentSlipsData: PaymentSlipProps[],
    generatedBy: string
  ): Promise<void> {
    const paymentSlips = paymentSlipsData.map((paymentSlipData) => {
      const paymentSlip = new PaymentSlip(paymentSlipData);
      paymentSlip.setGeneratedBy(generatedBy);
      return paymentSlip;
    });
    await this.paymentSlipRepository.createMany(paymentSlips);
  }

  private async savePaymentSlipBooklet(
    proposal: Proposal,
    paymentSlipBooklet: SavePaymentInformationInput['payload']['response']['paymentSlipBooklet'],
    generatedBy: string
  ): Promise<Document> {
    const documentTypeId = await this.getDocumentTypeId();
    const existingDocument = await this.findExistingDocument(proposal, documentTypeId);
    if (existingDocument)
      return this.updateDocument(existingDocument, paymentSlipBooklet, generatedBy);
    return this.createDocument(proposal, paymentSlipBooklet, documentTypeId, generatedBy);
  }

  private async getDocumentTypeId(): Promise<number> {
    const documentType = await this.documentTypeRepository.getOne({
      code: SavePaymentInformationUseCase.PAYMENTS_SLIP_BOOKLET_DOCUMENT_TYPE_CODE
    });
    return documentType.id;
  }

  private async findExistingDocument(
    proposal: Proposal,
    documentTypeId: number
  ): Promise<Document> {
    return this.documentsRepository.getOne({
      userId: proposal.borrower,
      documentTypeId
    });
  }

  private async updateDocument(
    document: Document,
    paymentSlipBooklet: SavePaymentInformationInput['payload']['response']['paymentSlipBooklet'],
    generatedBy: string
  ): Promise<Document> {
    return this.documentsRepository.updateOne({
      id: document.id,
      dataValues: {
        path: paymentSlipBooklet.fileKey,
        hash: paymentSlipBooklet.documentHash,
        additional_data: { generatedBy }
      }
    });
  }

  private async createDocument(
    proposal: Proposal,
    paymentSlipBooklet: SavePaymentInformationInput['payload']['response']['paymentSlipBooklet'],
    documentTypeId: number,
    generatedBy: string
  ): Promise<Document> {
    const document = await this.documentsRepository.create({
      user_id: proposal.borrower,
      path: paymentSlipBooklet.fileKey,
      document_type_id: documentTypeId,
      hash: paymentSlipBooklet.documentHash,
      additional_data: { generatedBy }
    });
    await this.documentProposalsRepository.create({
      document,
      proposal
    });
    return document;
  }
}
