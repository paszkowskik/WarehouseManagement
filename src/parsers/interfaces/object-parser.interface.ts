import { ParserTypes } from "../parser-type.enum";
import { ParsedObjectDto } from "../../models/dto/parsed-object.dto";

export interface IObjectParser<TData> {
  parse(object: string): ParsedObjectDto<TData>;
  type: ParserTypes;
}
