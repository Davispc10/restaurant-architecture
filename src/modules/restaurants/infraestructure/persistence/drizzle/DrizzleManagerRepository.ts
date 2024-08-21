import { db } from '../../../../../shared/infraestructure/persistence/drizzle/connection';
import { users } from '../../../../../shared/infraestructure/persistence/drizzle/schema';
import type { ManagerRepository } from '../../../application/port/out/ManagerRepository';
import { Manager } from '../../../domain/manager/Manager';

export class DrizzleManagerRepository implements ManagerRepository {
  async create(manager: Manager): Promise<Manager> {
    const { name, email, phone, role } = manager.toJSON();
    const [managerStored] = await db
      .insert(users)
      .values({
        name,
        email,
        phone,
        role
      })
      .returning();
    return Manager.from(
      managerStored.id,
      managerStored.name,
      managerStored.email,
      managerStored.phone,
      managerStored.role,
      managerStored.createdAt,
      managerStored.updatedAt
    );
  }

  async findById(managerId: string): Promise<Manager | null> {
    const managerStored = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, managerId);
      }
    });
    return managerStored
      ? Manager.create(
          managerStored.name,
          managerStored.email,
          managerStored.phone,
          managerStored.role
        )
      : null;
  }
}
