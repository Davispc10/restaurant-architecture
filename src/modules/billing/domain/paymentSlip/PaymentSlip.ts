import { PaymentSlipValidator } from './PaymentSlipValidator';

export type PaymentSlipProps = {
  id?: number | null;
  refId?: number | null;
  proposalId: number;
  installment: number;
  dueDate: Date | string;
  periodDays?: number | null;
  balance?: number | null;
  interestRateValue?: number | null;
  amortization: number | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
  iofValue?: number | null;
  installmentValue?: number | null;
  paidAt?: Date | string | null;
  balanceDue?: number | null;
  installmentTaxValue?: number | null;
  paidValue?: number | null;
  externalId?: string | null;
  externalProposalId?: string | null;
  writeOffDate?: Date | string | null;
  documentUrl?: string | null;
  digitableLine?: string | null;
  paid: boolean;
  outdated: boolean;
  additionalData: { generatedBy: string };
};

export class PaymentSlip {
  constructor(private readonly props: PaymentSlipProps) {
    this.validateProps();
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.updatedAt = this.props.updatedAt ?? new Date();
    this.props.outdated = this.props.outdated ?? false;
  }

  validateProps(): void {
    PaymentSlipValidator.parse(this.props);
  }

  getProps(): PaymentSlipProps {
    return JSON.parse(JSON.stringify(this.props));
  }

  outdate(): void {
    this.props.outdated = true;
    this.props.updatedAt = new Date();
  }

  isOutdated(): boolean {
    return this.props.outdated;
  }

  setGeneratedBy(generatedBy: string): void {
    this.props.additionalData = { ...this.props.additionalData, generatedBy };
  }

  getGeneratedBy(): string {
    return this.props.additionalData.generatedBy;
  }
}
