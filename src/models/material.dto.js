define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.MaterialDto = void 0;
    var MaterialDto = /** @class */ (function () {
        function MaterialDto(properties) {
            if (properties) {
                Object.assign(this, properties);
            }
        }
        MaterialDto.create = function (object) {
            var nameIndex = 0;
            var idIndex = 1;
            var separator = ",";
            var properties = object.split(separator);
            return new MaterialDto({
                name: properties[nameIndex],
                id: properties[idIndex]
            });
        };
        return MaterialDto;
    }());
    exports.MaterialDto = MaterialDto;
});
