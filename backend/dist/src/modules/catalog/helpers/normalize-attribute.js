"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeAttribute = normalizeAttribute;
function normalizeAttribute(value) {
    return value
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ');
}
//# sourceMappingURL=normalize-attribute.js.map