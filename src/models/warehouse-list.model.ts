import { MaterialStock } from "./entities/material-stock";

export interface WarehouseListModel {
  name: string;
  materials: MaterialStock[];
  materialsTotal: number;
}
