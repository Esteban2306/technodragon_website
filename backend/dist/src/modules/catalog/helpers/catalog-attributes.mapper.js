"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapJsonToAttributes = mapJsonToAttributes;
function mapJsonToAttributes(json) {
    const result = {};
    if (!json || typeof json !== "object" || Array.isArray(json))
        return result;
    for (const key of Object.keys(json)) {
        const value = json[key];
        if (Array.isArray(value)) {
            result[key] = value.map(v => String(v));
        }
        else if (typeof value === "string") {
            result[key] = [value];
        }
        else {
            result[key] = [];
        }
    }
    return result;
}
//# sourceMappingURL=catalog-attributes.mapper.js.map