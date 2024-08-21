export class Restaurant {
  private constructor(
    private readonly id: string | null,
    private name: string,
    private description: string | null,
    private managerId: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date
  ) {}

  public static create(name: string, description: string | null, managerId: string): Restaurant {
    return new Restaurant(null, name, description, managerId, new Date(), new Date());
  }

  public static from(
    id: string,
    name: string,
    description: string | null,
    managerId: string,
    createdAt: Date,
    updatedAt: Date
  ): Restaurant {
    return new Restaurant(id, name, description, managerId, createdAt, updatedAt);
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      managerId: this.managerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
