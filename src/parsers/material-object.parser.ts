import { Warehouse } from "../models/entities/warehouse";
import { WarehouseParseDto } from "../models/dto/warehouse-parse.dto";
import { MaterialParseDto } from "../models/dto/material-parse.dto";
import { IObjectParser } from "./interfaces/object-parser.interface";
import { ParserTypes } from "./parser-type.enum";
import { ParsedObjectDto } from "../models/dto/parsed-object.dto";

export class MaterialObjectParser implements IObjectParser<MaterialParseDto> {
  private separator = ";";

  readonly type = ParserTypes.Material;

  parse(material: string): ParsedObjectDto<MaterialParseDto> {
    const data = MaterialParseDto.create(material);

    return <ParsedObjectDto<MaterialParseDto>>{
      type: this.type,
      data: data,
    };
  }
}
