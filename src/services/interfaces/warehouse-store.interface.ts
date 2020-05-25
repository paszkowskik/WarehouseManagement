import { MaterialParseDto } from "../../models/dto/material-parse.dto";
import { WarehouseParseDto } from "../../models/dto/warehouse-parse.dto";
import { Warehouse } from "../../models/entities/warehouse";
import { WarehouseListModel } from "../../models/warehouse-list.model";

export interface IWarehouseStore {
  addMaterial(
    warehouse: Warehouse,
    MaterialParseDto: MaterialParseDto,
    warehouseDto: WarehouseParseDto
  );

  getOrCreateWarehouse(warehouseName: string): Warehouse;
  getWarehouseList(): WarehouseListModel[];
}
