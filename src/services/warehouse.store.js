var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.WarehouseStore = void 0;
    var WarehouseStore = /** @class */ (function () {
        function WarehouseStore() {
            this.store = [];
        }
        WarehouseStore.prototype.addMaterial = function (warehouse, materialDto, warehouseDto) {
            var material = warehouse.materials[materialDto.name];
            if (material) {
                material.quantity += warehouseDto.materialQuantity;
            }
            else {
                warehouse.materials[materialDto.name] = this.createMaterialStock(materialDto, warehouseDto);
            }
        };
        WarehouseStore.prototype.getOrCreateWarehouse = function (warehouseName) {
            var warehouse = this.store.find(function (x) { return x.name == warehouseName; });
            if (!warehouse) {
                warehouse = {
                    materials: {},
                    name: warehouseName
                };
            }
            return warehouse;
        };
        WarehouseStore.prototype.getWarehouseList = function () {
            return __spreadArrays(this.store);
        };
        WarehouseStore.prototype.createMaterialStock = function (materialDto, warehouseDto) {
            return {
                material: materialDto,
                quantity: warehouseDto.materialQuantity
            };
        };
        return WarehouseStore;
    }());
    exports.WarehouseStore = WarehouseStore;
});
