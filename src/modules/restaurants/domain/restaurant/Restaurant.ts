export class Restaurant {
  private constructor(
    private readonly id: number | null,
    private name: string,
    private cnpj: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date
  ) {}

  public static create(name: string, cnpj: string): Restaurant {
    return new Restaurant(null, name, cnpj, new Date(), new Date());
  }

  public static from(
    id: number,
    createdAt: Date,
    name: string,
    cnpj: string,
    updatedAt: Date
  ): Restaurant {
    return new Restaurant(id, name, cnpj, createdAt, updatedAt);
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      cnpj: this.cnpj,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
