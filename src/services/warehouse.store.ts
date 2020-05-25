import { Warehouse } from "../models/entities/warehouse";
import { MaterialParseDto } from "../models/dto/material-parse.dto";
import { WarehouseParseDto } from "../models/dto/warehouse-parse.dto";
import { IWarehouseStore } from "./interfaces/warehouse-store.interface";
import { MaterialStock } from "../models/entities/material-stock";
import { Material } from "../models/entities/material";
import { WarehouseListModel } from "../models/warehouse-list.model";

export class WarehouseStore implements IWarehouseStore {
  private store: Warehouse[] = [];

  addMaterial(
    warehouse: Warehouse,
    materialDto: MaterialParseDto,
    warehouseDto: WarehouseParseDto
  ) {
    const material = warehouse.materials[materialDto.name];
    if (material) {
      material.quantity += warehouseDto.materialQuantity;
    } else {
      warehouse.materials[materialDto.name] = this.createMaterialStock(
        materialDto,
        warehouseDto
      );
    }
  }

  getOrCreateWarehouse(warehouseName: string): Warehouse {
    let warehouse = this.store.find((x) => x.name == warehouseName);
    if (!warehouse) {
      warehouse = <Warehouse>{
        materials: {},
        name: warehouseName,
      };

      this.store.push(warehouse);
    }

    return warehouse;
  }

  getWarehouseList(): WarehouseListModel[] {
    let data = this.store.map((warehouse) => {
      const materials = this.mapMaterials(warehouse.materials);
      return <WarehouseListModel>{
        name: warehouse.name,
        materialsTotal: this.sumMaterialQuantity(materials),
        materials: this.sortMaterials(materials),
      };
    });

    data = this.sortWarehouse(data);
    return data;
  }

  private mapMaterials(materials: {
    [materialName: string]: MaterialStock;
  }): MaterialStock[] {
    return Array.from(Object.keys(materials), (k) => materials[k]);
  }

  private sortMaterials(materials: MaterialStock[]) {
    return materials.sort((a, b) => {
      if (a.material.id > b.material.id) {
        return 1;
      } else if (a.material.id < b.material.id) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  private sortWarehouse(data: WarehouseListModel[]) {
    return data.sort((a, b) => {
      let totalA = this.sumMaterialQuantity(a.materials);
      let totalB = this.sumMaterialQuantity(b.materials);

      if (totalA > totalB) {
        return -1;
      } else if (totalA < totalB) {
        return 1;
      } else {
        if (a.name > b.name) {
          return -1;
        } else if (a.name < b.name) {
          return 1;
        } else {
          return 0;
        }
      }
    });
  }

  sumMaterialQuantity(materials: MaterialStock[]): number {
    let total = 0;
    materials.forEach((m) => (total += m.quantity));

    return total;
  }

  private createMaterialStock(
    MaterialParseDto: MaterialParseDto,
    warehouseDto: WarehouseParseDto
  ): MaterialStock {
    return <MaterialStock>{
      material: <Material>MaterialParseDto,
      quantity: warehouseDto.materialQuantity,
    };
  }
}
