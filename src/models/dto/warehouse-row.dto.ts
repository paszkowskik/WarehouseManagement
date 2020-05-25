import { MaterialParseDto } from "./material-parse.dto";
import { WarehouseParseDto } from "./warehouse-parse.dto";

export interface WarehouseRowDto {
  material: MaterialParseDto;
  warehouses: WarehouseParseDto[];
}
