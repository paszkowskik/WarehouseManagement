export class WarehouseParseDto {
  name: string;
  materialQuantity: number;

  public constructor(properties?: {
    name?: string;
    materialQuantity?: number;
  }) {
    if (properties) {
      Object.assign(this, properties);
    }
  }

  static create(object: string) {
    const nameIndex = 0;
    const materialQuantityIndex = 1;
    const separator = ",";

    const properties = object.split(separator);
    return new WarehouseParseDto({
      name: properties[nameIndex],
      materialQuantity: Number(properties[materialQuantityIndex]),
    });
  }
}
