import { managerValidator } from './managerValidator';

export type ManagerProps = {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  role: 'manager' | 'customer';
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
    managerValidator(this.props);
  }

  getProps(): ManagerProps {
    return JSON.parse(JSON.stringify(this.props));
  }
}
