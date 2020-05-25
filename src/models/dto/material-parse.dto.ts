export class MaterialParseDto {
  name: string;
  id: string;

  public constructor(properties?: { name?: string; id?: string }) {
    if (properties) {
      Object.assign(this, properties);
    }
  }

  static separator = "[and]";

  static create(object: string) {
    const nameIndex = 0;
    const idIndex = 1;

    const properties = object.split(MaterialParseDto.separator);
    return new MaterialParseDto({
      name: properties[nameIndex],
      id: properties[idIndex],
    });
  }
}
