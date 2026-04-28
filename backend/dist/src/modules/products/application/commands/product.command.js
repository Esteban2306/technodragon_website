"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductCommand = void 0;
class CreateProductCommand {
    name;
    slug;
    description;
    brandId;
    categoryId;
    variants;
    images;
    isFeatured;
    constructor(name, slug, description, brandId, categoryId, variants, images, isFeatured) {
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
exports.CreateProductCommand = CreateProductCommand;
//# sourceMappingURL=product.command.js.map