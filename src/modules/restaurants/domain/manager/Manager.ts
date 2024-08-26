type Role = 'manager' | 'customer';
export class Manager {
  private constructor(
    private readonly id: string | null,
    private name: string,
    private email: string,
    private phone: string | null,
    private role: Role,
    private readonly createdAt?: Date,
    private readonly updatedAt?: Date
  ) {}

  public static create(name: string, email: string, phone: string | null, role: Role): Manager {
    return new Manager(null, name, email, phone, role, new Date(), new Date());
  }

  public static from(
    id: string,
    name: string,
    email: string,
    phone: string | null,
    role: Role,
    createdAt: Date,
    updatedAt: Date
  ): Manager {
    return new Manager(id, name, email, phone, role, createdAt, updatedAt);
  }

  public getAttributes() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
