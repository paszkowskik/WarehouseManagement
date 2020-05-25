define(["require", "exports", "../models/warehouse.dto"], function (require, exports, warehouse_dto_1) {
    "use strict";
    exports.__esModule = true;
    exports.WarehouseObjectParser = void 0;
    var WarehouseObjectParser = /** @class */ (function () {
        function WarehouseObjectParser() {
            this.separator = "|";
        }
        WarehouseObjectParser.prototype.parse = function (warehouseCollection) {
            var warehousesRaw = warehouseCollection.split(this.separator);
            return warehousesRaw.map(function (object) { return warehouse_dto_1.WarehouseDto.create(object); });
        };
        return WarehouseObjectParser;
    }());
    exports.WarehouseObjectParser = WarehouseObjectParser;
});
