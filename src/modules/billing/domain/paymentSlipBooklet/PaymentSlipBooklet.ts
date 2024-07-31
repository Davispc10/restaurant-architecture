import { PaymentSlipBookletValidator } from './PaymentSlipBookletValidator';

export type PaymentSlipBookletProps = {
  id?: number;
  hash: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  path: string;
  additionalData: { generatedBy: string };
  fileUrl?: string;
  downloadUrl?: string;
};

export class PaymentSlipBooklet {
  constructor(private readonly props: PaymentSlipBookletProps) {
    this.validateProps();
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.updatedAt = this.props.updatedAt ?? new Date();
  }

  validateProps(): void {
    PaymentSlipBookletValidator.parse(this.props);
  }

  getProps(): PaymentSlipBookletProps {
    return JSON.parse(JSON.stringify(this.props));
  }

  setFileUrl(fileUrl: string): void {
    this.props.fileUrl = fileUrl;
  }

  setDownloadUrl(downloadUrl: string): void {
    this.props.downloadUrl = downloadUrl;
  }

  setGeneratedBy(generatedBy: string): void {
    this.props.additionalData = { ...this.props.additionalData, generatedBy };
  }

  getGeneratedBy(): string {
    return this.props.additionalData.generatedBy;
  }
}
