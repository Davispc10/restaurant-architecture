import type { Manager } from '@modules/restaurants/domain/manager/Manager';

export interface ManagerRepository {
  create(manager: Manager): Promise<Manager>;
}
