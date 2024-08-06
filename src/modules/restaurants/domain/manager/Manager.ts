import { ManagerValidator } from './ManagerValidator';

export type ManagerProps = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role: 'manager';
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
};

export class Manager {
  constructor(private readonly props: ManagerProps) {
    this.validateProps();
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.updatedAt = this.props.updatedAt ?? new Date();
  }

  validateProps(): void {
    ManagerValidator.parse(this.props);
  }

  getProps(): ManagerProps {
    return JSON.parse(JSON.stringify(this.props));
  }
}
