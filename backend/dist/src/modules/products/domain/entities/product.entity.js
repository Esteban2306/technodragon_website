"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    id;
    name;
    slug;
    description;
    brandId;
    categoryId;
    variants;
    images;
    isActive;
    isFeatured;
    createdAt;
    updatedAt;
    constructor(id, name, slug, description, brandId, categoryId, variants = [], images = [], isActive, isFeatured, createdAt, updatedAt) {
        this.id = id;
        this.validateName(name);
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.brandId = brandId;
        this.categoryId = categoryId;
        this.variants = variants;
        this.images = images;
        this.isActive = isActive;
        this.isFeatured = isFeatured;
        this.validateUniqueSku();
        this.validateUniqueVariants();
        this.validateImages(this.images);
        this.validateVariants(this.variants);
        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();
    }
    updateName(name) {
        this.validateName(name);
        this.name = name;
        this.touch();
    }
    updateSlug(slug) {
        this.slug = this.normalizeSlug(slug);
        this.touch();
    }
    updateDescription(description) {
        this.description = description;
        this.touch();
    }
    updateBrand(brandId) {
        this.brandId = brandId;
        this.touch();
    }
    updateCategory(categoryId) {
        this.categoryId = categoryId;
        this.touch();
    }
    updateVariants(variants) {
        this.variants = variants;
        this.touch();
    }
    updateImages(images) {
        this.images = images;
        this.touch();
    }
    active() {
        this.isActive = true;
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
    isProductFeatured() {
        return this.isFeatured;
    }
    desactive() {
        this.isActive = false;
        this.variants.forEach((v) => v.deactivate());
        this.touch();
    }
    addVariants(variant) {
        this.variants.push(variant);
        this.touch();
    }
    removeVariants(variantId) {
        this.variants = this.variants.filter((v) => v.getId() !== variantId);
        this.touch();
    }
    getActiveVariants() {
        return this.variants.filter((v) => v.isVariantActive());
    }
    setFeaturedImage(imageId) {
        this.images.forEach((img) => {
            if (img.getId() === imageId) {
                img.setAsMain();
            }
            else {
                img.removeAsMain();
            }
        });
        this.touch();
    }
    addImage(image) {
        this.images.push(image);
        this.touch();
    }
    removeImage(imageId) {
        this.images = this.images.filter((img) => img.getId() !== imageId);
        this.touch();
    }
    validateName(name) {
        if (!name || name.trim().length < 2) {
            throw new Error('Product name must be at least 2 characters');
        }
    }
    normalizeSlug(slug) {
        if (!slug) {
            throw new Error('Slug is required');
        }
        return slug.toLowerCase().trim().replace(/\s+/g, '-');
    }
    validateUniqueSku() {
        const skus = new Set();
        for (const variant of this.variants) {
            if (skus.has(variant.getSku())) {
                throw new Error('Duplicate SKU in product');
            }
            skus.add(variant.getSku());
        }
    }
    validateUniqueVariants() {
        const seen = new Set();
        for (const variant of this.variants) {
            const key = variant
                .getAttributes()
                .map((a) => `${a.getName()}-${a.getValue()}`)
                .sort()
                .join('|');
            if (seen.has(key)) {
                throw new Error('Duplicate variant detected');
            }
            seen.add(key);
        }
    }
    validateImages(images) {
        if (!images || images.length === 0) {
            throw new Error('Product must have at least one image');
        }
    }
    validateVariants(variants) {
        if (!variants || variants.length === 0) {
            throw new Error('Product must have at least one variant');
        }
    }
    touch() {
        this.updatedAt = new Date();
    }
    getName() {
        return this.name;
    }
    getSlug() {
        return this.slug;
    }
    getDescription() {
        return this.description;
    }
    getBrandId() {
        return this.brandId;
    }
    getCategoryId() {
        return this.categoryId;
    }
    getVariants() {
        return this.variants;
    }
    getImages() {
        return this.images;
    }
    isProductActive() {
        return this.isActive;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
}
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map