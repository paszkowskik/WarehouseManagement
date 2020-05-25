import { MaterialObjectParser } from "../parsers/material-object.parser";
import { WarehouseObjectParser } from "../parsers/warehouse-object.parser";
import { MaterialParseDto } from "../models/dto/material-parse.dto";
import { WarehouseParseDto } from "../models/dto/warehouse-parse.dto";
import { IWarehouseStore } from "./interfaces/warehouse-store.interface";
import { WarehouseRowDto } from "../models/dto/warehouse-row.dto";
import { ParserTypes } from "../parsers/parser-type.enum";

export class WarehouseDataProcessor {
  private ignoreRowChar = "#";
  private newLineChar = "\n";

  constructor(private warehouseStore: IWarehouseStore) {}

  fillStore(data: string, objectSeparator: string): void {
    const rows = data.split(this.newLineChar);
    rows.forEach((row) => {
      const warehouseRow = this.parseRow(row, objectSeparator);
      if (warehouseRow) {
        this.addRowToStore(warehouseRow);
      }
    });
  }

  private parseRow(row: string, objectSeparator: string) {
    if (this.isIgnoredRow(row)) {
      return;
    }

    let rawObjects = row.split(objectSeparator);
    return this.processObjects(rawObjects);
  }

  private addRowToStore(warehouseRow: WarehouseRowDto) {
    warehouseRow.warehouses.forEach((warehouseDto) => {
      const warehouse = this.warehouseStore.getOrCreateWarehouse(
        warehouseDto.name
      );

      this.warehouseStore.addMaterial(
        warehouse,
        warehouseRow.material,
        warehouseDto
      );
    });
  }

  private isIgnoredRow(row: string): boolean {
    return row.length == 0 || (row.length > 0 && row[0] === this.ignoreRowChar);
  }

  private processObjects(rowObjects: string[]): WarehouseRowDto {
    const skipParsingIndexes = [1];
    let materialParseDto: MaterialParseDto;
    let warehouseDto: WarehouseParseDto[];

    for (let column = 0; column < rowObjects.length; column++) {
      if (skipParsingIndexes.includes(column)) {
        continue;
      }

      const parser = this.getObjectParser(column);

      const object = this.getObject(rowObjects, column);
      const parsingResult = parser.parse(object);
      if (parsingResult.type == ParserTypes.Material) {
        materialParseDto = <MaterialParseDto>parsingResult.data;
      } else if (parsingResult.type == ParserTypes.Warehouse) {
        warehouseDto = <WarehouseParseDto[]>parsingResult.data;
      }
    }

    return <WarehouseRowDto>{
      material: materialParseDto,
      warehouses: warehouseDto,
    };
  }

  private getObject(rawObjects: string[], index: number) {
    switch (index) {
      case 0:
        return `${rawObjects[0]} ${MaterialParseDto.separator} ${rawObjects[1]}`;
      default:
        return rawObjects[index];
    }
  }

  private getObjectParser(index: number) {
    switch (index) {
      case 0:
        return new MaterialObjectParser();
      case 2:
        return new WarehouseObjectParser();
      default:
        throw Error(`Parser for index ${index} not found `);
    }
  }
}
