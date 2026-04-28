"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductCommand = void 0;
class UpdateProductCommand {
    productId;
    name;
    slug;
    description;
    brandId;
    categoryId;
    variants;
    images;
    isFeatured;
    constructor(productId, name, slug, description, brandId, categoryId, variants, images, isFeatured) {
        this.productId = productId;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.variants = variants;
        this.images = images;
        this.isFeatured = isFeatured;
    }
}
exports.UpdateProductCommand = UpdateProductCommand;
//# sourceMappingURL=update-product.command.js.map