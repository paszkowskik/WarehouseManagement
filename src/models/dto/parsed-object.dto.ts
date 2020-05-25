import { ParserTypes } from "../../parsers/parser-type.enum";

export interface ParsedObjectDto<TData> {
  type: ParserTypes;
  data: TData;
}
