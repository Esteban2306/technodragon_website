"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogItemMapper = void 0;
const catalog_entity_1 = require("../domain/entities/catalog.entity");
class CatalogItemMapper {
    static fromProduct(product) {
        if (!product)
            throw new Error('Product data is required');
        if (!product.variants || product.variants.length === 0)
            throw new Error('Product must have at least one variant');
        return product.variants.map((variant) => this.mapVariantToCatalogItem(product, variant));
    }
    static mapVariantToCatalogItem(product, variant) {
        return new catalog_entity_1.CatalogItem(this.buildId(product.id, variant.id), product.id, variant.id, product.name, product.slug, product.brand?.id ?? '', product.brand?.name ?? '', product.category?.id ?? '', product.category?.name ?? '', variant.price, variant.stock, variant.condition, this.mapAttributes(variant.attributes), this.mapImages(product.images.map((url) => ({ url }))), this.mapIsActivate(product, variant), product.isFeatured, new Date(), new Date());
    }
    static mapAttributes(attributes) {
        if (!attributes || attributes.length === 0)
            return {};
        const result = {};
        for (const attr of attributes) {
            if (!result[attr.name]) {
                result[attr.name] = [];
            }
            result[attr.name].push(attr.value);
        }
        return result;
    }
    static mapImages(images) {
        if (!images || images.length === 0)
            return [];
        return images.map((img) => img.url);
    }
    static mapIsActivate(product, variant) {
        return product.isActive && variant.isActive && variant.stock > 0;
    }
    static buildId(productId, variantId) {
        return `${productId}-${variantId}`;
    }
}
exports.CatalogItemMapper = CatalogItemMapper;
//# sourceMappingURL=catalog-item-mapper.js.map