import { MaterialStock } from "./material-stock";

export interface Warehouse {
  name: string;
  materials: { [materialName: string]: MaterialStock };
  total: number;
}
