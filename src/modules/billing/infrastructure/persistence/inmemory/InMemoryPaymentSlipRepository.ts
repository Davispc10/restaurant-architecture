import { PaymentSlipRepository } from '$modules/billing/application/port/out/PaymentSlipRepository';
import { PaymentSlip } from '$modules/billing/domain/paymentSlip/PaymentSlip';

export class InMemoryPaymentSlipRepository implements PaymentSlipRepository {
  private paymentSlips: PaymentSlip[] = [];

  async createMany(paymentSlips: PaymentSlip[]): Promise<void> {
    this.paymentSlips.push(...paymentSlips);
  }

  async find(proposalId: number, installment?: number | undefined): Promise<PaymentSlip[]> {
    return this.paymentSlips.filter(
      (paymentSlip) =>
        paymentSlip.getProps().proposalId === proposalId &&
        paymentSlip.getProps().installment === installment
    );
  }

  async updateMany(paymentSlips: PaymentSlip[]): Promise<void> {
    for (const paymentSlip of paymentSlips) {
      const index = this.paymentSlips.findIndex(
        (ps) => ps.getProps().id === paymentSlip.getProps().id
      );
      this.paymentSlips[index] = paymentSlip;
    }
  }

  factory(data?: Partial<PaymentSlip>): PaymentSlip {
    const mockedProps = {
      id: this.paymentSlips.length + 1,
      proposalId: 1,
      installment: 1,
      dueDate: new Date('2022-03-02'),
      periodDays: 30,
      balance: null,
      interestRateValue: null,
      amortization: null,
      iofValue: 0.0,
      installmentValue: 228.02,
      paidAt: null,
      balanceDue: null,
      installmentTaxValue: null,
      paidValue: null,
      paid: false,
      externalId: '1231',
      externalProposalId: '1231',
      writeOffDate: null,
      documentUrl: 'www.com.br',
      digitableLine: '123',
      outdated: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      additionalData: { generatedBy: 'system' },
      ...data
    };
    const paymentSlip = new PaymentSlip(mockedProps);
    this.paymentSlips.push(paymentSlip);
    return paymentSlip;
  }
}
