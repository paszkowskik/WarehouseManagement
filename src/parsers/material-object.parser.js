define(["require", "exports", "../models/material.dto"], function (require, exports, material_dto_1) {
    "use strict";
    exports.__esModule = true;
    exports.MaterialObjectParser = void 0;
    var MaterialObjectParser = /** @class */ (function () {
        function MaterialObjectParser() {
            this.separator = ";";
        }
        MaterialObjectParser.prototype.parse = function (material) {
            return material_dto_1.MaterialDto.create(material);
        };
        return MaterialObjectParser;
    }());
    exports.MaterialObjectParser = MaterialObjectParser;
});
