define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.WarehouseDto = void 0;
    var WarehouseDto = /** @class */ (function () {
        function WarehouseDto(properties) {
            if (properties) {
                Object.assign(this, properties);
            }
        }
        WarehouseDto.create = function (object) {
            var nameIndex = 0;
            var materialQuantityIndex = 1;
            var separator = ",";
            var properties = object.split(separator);
            return new WarehouseDto({
                name: properties[nameIndex],
                materialQuantity: Number(properties[materialQuantityIndex])
            });
        };
        return WarehouseDto;
    }());
    exports.WarehouseDto = WarehouseDto;
});
