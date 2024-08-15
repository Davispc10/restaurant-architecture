import type { Manager } from '../../../domain/manager/Manager';

export interface ManagerRepository {
  create(manager: Manager): Promise<Manager>;
}
