"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductVariant = void 0;
const product_condition_enum_1 = require("../enums/product-condition.enum");
class ProductVariant {
    id;
    sku;
    price;
    stock;
    isActive;
    condition;
    attributes;
    createdAt;
    updatedAt;
    constructor(id, sku, price, stock, condition = product_condition_enum_1.ProductCondition.NEW, attributes = [], isActive = true, createdAt, updatedAt) {
        this.id = id;
        this.validateSku(sku);
        this.validatePrice(price);
        this.validateStock(stock);
        this.validateCondition(condition);
        this.condition = condition;
        this.sku = sku;
        this.price = price;
        this.stock = stock;
        this.attributes = attributes;
        this.isActive = isActive;
        this.validateAttributes(this.attributes);
        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();
    }
    increaseStock(quantity) {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }
        this.stock += quantity;
        this.touch();
    }
    decreaseStock(quantity) {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }
        if (this.stock - quantity < 0) {
            throw new Error("Insufficient stock");
        }
        this.stock -= quantity;
        if (this.stock === 0) {
            this.isActive = false;
        }
        this.touch();
    }
    updatePrice(newprice) {
        this.validatePrice(newprice);
        this.price = newprice;
        this.touch();
    }
    activate() {
        this.isActive = true;
        this.touch();
    }
    deactivate() {
        this.isActive = false;
        this.touch();
    }
    addAtribute(attribute) {
        const exists = this.attributes.some((attr) => attr.getName() === attribute.getName());
        if (exists) {
            throw new Error(`Attribute ${attribute.getName()} already exists`);
        }
        this.attributes.push(attribute);
        this.touch();
    }
    removeAttribute(attributeId) {
        this.attributes = this.attributes.filter((attr) => attr.id !== attributeId);
        this.touch();
    }
    validateSku(sku) {
        if (!sku || sku.trim().length < 3) {
            throw new Error("SKU must be at least 3 characters");
        }
    }
    validateCondition(condition) {
        if (!condition) {
            throw new Error("Product condition is required");
        }
    }
    validateAttributes(attributes) {
        if (!attributes || attributes.length === 0) {
            throw new Error("Variant must have attributes");
        }
    }
    validatePrice(price) {
        if (price <= 0) {
            throw new Error("Price must be greater than 0");
        }
    }
    validateStock(stock) {
        if (stock < 0) {
            throw new Error("Stock cannot be negative");
        }
    }
    touch() {
        this.updatedAt = new Date();
    }
    getId() {
        return this.id;
    }
    getSku() {
        return this.sku;
    }
    getCondition() {
        return this.condition;
    }
    getPrice() {
        return this.price;
    }
    getStock() {
        return this.stock;
    }
    isVariantActive() {
        return this.isActive;
    }
    getAttributes() {
        return this.attributes;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
}
exports.ProductVariant = ProductVariant;
//# sourceMappingURL=product-varian.entity.js.map