import { PaymentSlipRepository } from '$modules/billing/application/port/out/PaymentSlipRepository';
import { PaymentSlip } from '$modules/billing/domain/paymentSlip/PaymentSlip';
import { PaymentSlipsNotFoundError } from '../error/PaymentSlipsNotFoundError';
import { GetPaymentSlipsInputPort } from '../port/in/GetPaymentSlipsInputPort';
import { GetPaymentSlipsInput } from './input/GetPaymentSlipsInput';
import { GetPaymentSlipsOutput } from './output/GetPaymentSlipsOutput';

export class GetPaymentSlipsUseCase implements GetPaymentSlipsInputPort {
  constructor(private readonly paymentSlipRepository: PaymentSlipRepository) {}

  async execute({
    proposalId,
    installment,
    outdated
  }: GetPaymentSlipsInput): Promise<GetPaymentSlipsOutput> {
    const paymentSlips = await this.getPaymentSlips(proposalId, installment, outdated);
    return GetPaymentSlipsOutput.from(paymentSlips);
  }

  async getPaymentSlips(
    proposalId: number,
    installment?: number,
    outdated?: boolean
  ): Promise<PaymentSlip[]> {
    const paymentSlips = await this.paymentSlipRepository.find(proposalId, installment);
    if (!paymentSlips?.length) throw new PaymentSlipsNotFoundError();
    return this.filterPaymentSlips(paymentSlips, outdated);
  }

  filterPaymentSlips(paymentSlips: PaymentSlip[], outdated?: boolean): PaymentSlip[] {
    if (outdated === undefined) return paymentSlips;
    return paymentSlips.filter((paymentSlips) => paymentSlips.isOutdated() === outdated);
  }
}
