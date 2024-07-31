import { PaymentSlipBookletRepository } from '$modules/billing/application/port/out/PaymentSlipBookletRepository';
import { PaymentSlipBooklet } from '$modules/billing/domain/paymentSlipBooklet/PaymentSlipBooklet';
import { PaymentSlipBookletNotFoundError } from '../error/PaymentSlipBookletNotFoundError';
import { PaymentSlipBookletRetrivalError } from '../error/PaymentSlipBookletRetrivalError';
import { GetPaymentSlipBookletInputPort } from '../port/in/GetPaymentSlipBookletInputPort';
import { GetPaymentSlipBookletInput } from './input/GetPaymentSlipBookletInput';
import { GetPaymentSlipBookletOutput } from './output/GetPaymentSlipBookletOutput';

import { FileStorageService } from '$shared/application/port/out/FileStorageService';

export class GetPaymentSlipBookletUseCase implements GetPaymentSlipBookletInputPort {
  constructor(
    private readonly paymentSlipRepository: PaymentSlipBookletRepository,
    private readonly fileStorageService: FileStorageService
  ) {}

  async execute({ proposalId }: GetPaymentSlipBookletInput): Promise<GetPaymentSlipBookletOutput> {
    const paymentSlipBooklet = await this.getPaymentSlipBooklet(proposalId);
    return GetPaymentSlipBookletOutput.from(paymentSlipBooklet);
  }

  async getPaymentSlipBooklet(proposalId: number): Promise<PaymentSlipBooklet> {
    const paymentSlipBooklet = await this.paymentSlipRepository.find(proposalId);
    if (!paymentSlipBooklet) throw new PaymentSlipBookletNotFoundError();
    const fileUrl = await this.getFileUrl(paymentSlipBooklet.getProps().path);
    const downloadUrl = await this.getDownloadUrl(paymentSlipBooklet.getProps().path);
    paymentSlipBooklet.setFileUrl(fileUrl);
    paymentSlipBooklet.setDownloadUrl(downloadUrl);
    return paymentSlipBooklet;
  }

  async getFileUrl(path: string): Promise<string> {
    try {
      return await this.fileStorageService.getFileUrl(path);
    } catch (error) {
      console.error(error);
      throw new PaymentSlipBookletRetrivalError();
    }
  }

  async getDownloadUrl(path: string): Promise<string> {
    try {
      return await this.fileStorageService.getDownloadUrl(
        path,
        this.generateDownloadFileName(path)
      );
    } catch (error) {
      console.error(error);
      throw new PaymentSlipBookletRetrivalError();
    }
  }

  generateDownloadFileName(path: string): string {
    const proposalId = path.split('/')[2];
    return `boleto_consolidado_proposta_${proposalId}.pdf`;
  }
}
