define(["require", "exports", "./services/warehouse.module", "fs"], function (require, exports, warehouse_module_1, fs) {
    "use strict";
    exports.__esModule = true;
    exports.Application = void 0;
    var Application = /** @class */ (function () {
        function Application() {
            this.dataFilePath = "Data/materials.txt";
        }
        Application.prototype.run = function () {
            var warehouseStore = new warehouse_module_1.WarehouseStore();
            var warehouseDataParser = new warehouse_module_1.WarehouseDataParser(warehouseStore);
            var warehouseData = fs.readFileSync(this.dataFilePath, "utf8");
            warehouseDataParser.parse(warehouseData, ";");
            var warehouses = warehouseStore.getWarehouseList();
            console.log(warehouses);
        };
        return Application;
    }());
    exports.Application = Application;
});
