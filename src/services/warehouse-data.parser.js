define(["require", "exports", "../parsers/material-object.parser", "../parsers/warehouse-object.parser", "../models/material.dto", "../models/warehouse.dto"], function (require, exports, material_object_parser_1, warehouse_object_parser_1, material_dto_1, warehouse_dto_1) {
    "use strict";
    exports.__esModule = true;
    exports.WarehouseDataParser = void 0;
    var WarehouseDataParser = /** @class */ (function () {
        function WarehouseDataParser(warehouseStore) {
            this.warehouseStore = warehouseStore;
            this.ignoreRowChar = "#";
        }
        WarehouseDataParser.prototype.parse = function (data, objectSeparator) {
            var _this = this;
            var rows = data.split("\n");
            rows.forEach(function (row) {
                if (_this.isIgnoredRow(row)) {
                    return;
                }
                var rawObjects = row.split(objectSeparator);
                var warehouseRow = _this.processObjects(rawObjects);
                warehouseRow.warehouses.forEach(function (warehouseDto) {
                    var warehouse = _this.warehouseStore.getOrCreateWarehouse(warehouseDto.name);
                    _this.warehouseStore.addMaterial(warehouse, warehouseRow.material, warehouseDto);
                });
            });
        };
        WarehouseDataParser.prototype.isIgnoredRow = function (row) {
            return row.length > 0 && row[0] === this.ignoreRowChar;
        };
        WarehouseDataParser.prototype.processObjects = function (rawObjects) {
            var skipParsingIndexes = [1];
            var materialDto;
            var warehouseDto;
            for (var i = 0; i < rawObjects.length; i++) {
                if (!skipParsingIndexes.includes(i)) {
                    var parser = this.getObjectParser(i);
                    var object = this.getObject(rawObjects, i);
                    var parsingResult = parser.parse(object);
                    if (parsingResult instanceof material_dto_1.MaterialDto) {
                        materialDto = parsingResult;
                    }
                    else if (parsingResult instanceof warehouse_dto_1.WarehouseDto) {
                        warehouseDto = parsingResult;
                    }
                }
            }
            return {
                material: materialDto,
                warehouses: warehouseDto
            };
        };
        WarehouseDataParser.prototype.getObject = function (rawObjects, index) {
            switch (index) {
                case 0:
                    return rawObjects[0] + ", " + rawObjects[1];
                default:
                    return rawObjects[index];
            }
        };
        WarehouseDataParser.prototype.getObjectParser = function (index) {
            switch (index) {
                case 0:
                    return new material_object_parser_1.MaterialObjectParser();
                case 2:
                    return new warehouse_object_parser_1.WarehouseObjectParser();
                default:
                    throw Error("Parser for index " + index + " not found ");
            }
        };
        return WarehouseDataParser;
    }());
    exports.WarehouseDataParser = WarehouseDataParser;
});
