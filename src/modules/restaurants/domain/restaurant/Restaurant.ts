import { RestaurantValidator } from './RestaurantValidator';

export type RestaurantProps = {
  id?: string | null;
  description: string;
  managerId: number;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
};

export class Restaurant {
  constructor(private readonly props: RestaurantProps) {
    this.validateProps();
    this.props.createdAt = this.props.createdAt ?? new Date();
    this.props.updatedAt = this.props.updatedAt ?? new Date();
  }

  validateProps(): void {
    RestaurantValidator.parse(this.props);
  }

  getProps(): RestaurantProps {
    return JSON.parse(JSON.stringify(this.props));
  }
}
