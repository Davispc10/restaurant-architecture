import { db } from '@shared/infra/adapter/driven/persistence/drizzle/connection';
import { users } from '@shared/infra/adapter/driven/persistence/drizzle/schema';
import type { ManagerRepository } from '../../../../../application/port/driven/ManagerRepository';
import { Manager } from '../../../../../domain/manager/Manager';

export class DrizzleManagerRepository implements ManagerRepository {
  async create(manager: Manager): Promise<Manager> {
    const { name, email, phone, role } = manager.getAttributes();
    const [managerStored] = await db
      .insert(users)
      .values({
        name,
        email,
        phone,
        role,
      })
      .returning();
    return this.toEntity(managerStored);
  }

  async findById(managerId: string): Promise<Manager | null> {
    const managerStored = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, managerId);
      },
    });
    return managerStored ? this.toEntity(managerStored) : null;
  }

  private toEntity(managerModel: typeof users.$inferSelect): Manager {
    return Manager.from(
      managerModel.id,
      managerModel.name,
      managerModel.email,
      managerModel.phone,
      managerModel.role,
      managerModel.createdAt,
      managerModel.updatedAt,
    );
  }
}
