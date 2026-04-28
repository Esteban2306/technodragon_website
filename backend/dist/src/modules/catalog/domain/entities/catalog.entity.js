"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogItem = void 0;
const product_condition_enum_1 = require("../../../products/domain/enums/product-condition.enum");
class CatalogItem {
    id;
    productId;
    variantId;
    name;
    slug;
    brandId;
    brandName;
    categoryId;
    categoryName;
    price;
    stock;
    condition;
    attributes;
    images;
    isActive;
    isFeatured;
    createdAt;
    updatedAt;
    constructor(id, productId, variantId, name, slug, brandId, brandName, categoryId, categoryName, price, stock, condition, attributes, images, isActive, isFeatured, createdAt, updatedAt) {
        this.id = id;
        this.productId = productId;
        this.variantId = variantId;
        this.name = name;
        this.slug = slug;
        this.brandId = brandId;
        this.brandName = brandName;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.price = price;
        this.stock = stock;
        this.condition = condition;
        this.attributes = attributes;
        this.images = images;
        this.isActive = isActive;
        this.isFeatured = isFeatured;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.validate();
    }
    static fromPersistence(data) {
        return new CatalogItem(data.id, data.productId, data.variantId, data.name, data.slug, data.brandId, data.brandName, data.categoryId, data.categoryName, data.price, data.stock, data.condition, data.attributes, data.images, data.isActive, data.isFeatured, data.createdAt, data.updatedAt);
    }
    validate() {
        if (!this.productId)
            throw new Error('productId required');
        if (!this.variantId)
            throw new Error('variantId required');
        if (this.price < 0)
            throw new Error('invalid price');
        if (this.stock < 0)
            throw new Error('invalid stock');
        if (!Object.values(product_condition_enum_1.ProductCondition).includes(this.condition)) {
            throw new Error('invalid condition');
        }
    }
    toPersistence() {
        return {
            id: this.id,
            productId: this.productId,
            variantId: this.variantId,
            name: this.name,
            slug: this.slug,
            brandId: this.brandId,
            brandName: this.brandName,
            categoryId: this.categoryId,
            categoryName: this.categoryName,
            price: this.price,
            stock: this.stock,
            condition: this.condition,
            attributes: this.attributes,
            images: this.images ?? [],
            isActive: this.isActive,
            isFeatured: this.isFeatured,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
    updateStock(stock) {
        if (stock < 0)
            throw new Error('invalid stock');
        this.stock = stock;
        this.isActive = stock > 0;
        this.touch();
    }
    updatePrice(price) {
        if (price <= 0)
            throw new Error('invalid price');
        this.price = price;
        this.touch();
    }
    updateAttributes(attrs) {
        this.attributes = attrs;
        this.touch();
    }
    markAsFeatured() {
        this.isFeatured = true;
        this.touch();
    }
    removeFeatured() {
        this.isFeatured = false;
        this.touch();
    }
    updateImages(images) {
        this.images = images;
        this.touch();
    }
    deactivate() {
        this.isActive = false;
        this.touch();
    }
    activate() {
        this.isActive = true;
        this.touch();
    }
    getId() {
        return this.id;
    }
    getVariantId() {
        return this.variantId;
    }
    getProductId() {
        return this.productId;
    }
    getPrice() {
        return this.price;
    }
    getAttributes() {
        return this.attributes;
    }
    isAvailable() {
        return this.isActive && this.stock > 0;
    }
    touch() {
        this.updatedAt = new Date();
    }
}
exports.CatalogItem = CatalogItem;
//# sourceMappingURL=catalog.entity.js.map