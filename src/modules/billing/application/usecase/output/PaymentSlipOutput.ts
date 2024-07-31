import { PaymentSlip } from '$modules/billing/domain/paymentSlip/PaymentSlip';

export class PaymentSlipOutput {
  public readonly id?: number | null;
  public readonly proposalId: number;
  public readonly installment: number;
  public readonly dueDate: Date | string;
  public readonly periodDays?: number | null;
  public readonly balance?: number | null;
  public readonly interestRateValue?: number | null;
  public readonly amortization: number | null;
  public readonly createdAt?: Date | string | null;
  public readonly updatedAt?: Date | string | null;
  public readonly iofValue?: number | null;
  public readonly installmentValue?: number | null;
  public readonly paidAt?: Date | string | null;
  public readonly balanceDue?: number | null;
  public readonly installmentTaxValue?: number | null;
  public readonly paidValue?: number | null;
  public readonly externalId?: string | null;
  public readonly externalProposalId?: string | null;
  public readonly writeOffDate?: Date | string | null;
  public readonly documentUrl?: string | null;
  public readonly digitableLine?: string | null;
  public readonly paid: boolean;
  public readonly outdated: boolean;
  public readonly additionalData: { generatedBy: string };

  private constructor(paymentSlip: PaymentSlip) {
    this.id = paymentSlip.getProps().id;
    this.proposalId = paymentSlip.getProps().proposalId;
    this.installment = paymentSlip.getProps().installment;
    this.dueDate = paymentSlip.getProps().dueDate;
    this.periodDays = paymentSlip.getProps().periodDays;
    this.balance = paymentSlip.getProps().balance;
    this.interestRateValue = paymentSlip.getProps().interestRateValue;
    this.amortization = paymentSlip.getProps().amortization;
    this.createdAt = paymentSlip.getProps().createdAt;
    this.updatedAt = paymentSlip.getProps().updatedAt;
    this.iofValue = paymentSlip.getProps().iofValue;
    this.installmentValue = paymentSlip.getProps().installmentValue;
    this.paidAt = paymentSlip.getProps().paidAt;
    this.balanceDue = paymentSlip.getProps().balanceDue;
    this.installmentTaxValue = paymentSlip.getProps().installmentTaxValue;
    this.paidValue = paymentSlip.getProps().paidValue;
    this.externalId = paymentSlip.getProps().externalId;
    this.externalProposalId = paymentSlip.getProps().externalProposalId;
    this.writeOffDate = paymentSlip.getProps().writeOffDate;
    this.documentUrl = paymentSlip.getProps().documentUrl;
    this.digitableLine = paymentSlip.getProps().digitableLine;
    this.paid = paymentSlip.getProps().paid;
    this.outdated = paymentSlip.getProps().outdated;
    this.additionalData = paymentSlip.getProps().additionalData;
  }

  static from(paymentSlip: PaymentSlip) {
    return new PaymentSlipOutput(paymentSlip);
  }
}
