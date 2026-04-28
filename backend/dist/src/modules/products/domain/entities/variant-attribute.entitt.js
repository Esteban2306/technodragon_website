"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariantAttribute = void 0;
class VariantAttribute {
    id;
    name;
    value;
    constructor(id, name, value) {
        this.id = id;
        this.name = name;
        this.value = value;
        this.validate();
    }
    validate() {
        if (!this.name || !this.value) {
            throw new Error("Attribute name and value are required");
        }
    }
    getName() {
        return this.name;
    }
    getValue() {
        return this.value;
    }
}
exports.VariantAttribute = VariantAttribute;
//# sourceMappingURL=variant-attribute.entitt.js.map