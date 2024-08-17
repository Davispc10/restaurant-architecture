import { restaurantValidator } from './restaurantValidator';

export type RestaurantProps = {
  id?: string;
  name: string;
  description?: string | null;
  managerId: string;
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
    restaurantValidator(this.props);
  }

  getProps(): RestaurantProps {
    return JSON.parse(JSON.stringify(this.props));
  }
}
