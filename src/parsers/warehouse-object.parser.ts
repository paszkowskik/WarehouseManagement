import { WarehouseParseDto } from "../models/dto/warehouse-parse.dto";
import { IObjectParser } from "./interfaces/object-parser.interface";
import { ParserTypes } from "./parser-type.enum";
import { ParsedObjectDto } from "../models/dto/parsed-object.dto";

export class WarehouseObjectParser
  implements IObjectParser<WarehouseParseDto[]> {
  private separator = "|";

  readonly type = ParserTypes.Warehouse;

  parse(warehouseCollection: string): ParsedObjectDto<WarehouseParseDto[]> {
    const warehousesRaw = warehouseCollection.split(this.separator);
    const data = warehousesRaw.map((object) =>
      WarehouseParseDto.create(object)
    );

    return <ParsedObjectDto<WarehouseParseDto[]>>{
      type: this.type,
      data: data,
    };
  }
}
