"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
class Brand {
    id;
    name;
    slug;
    logo;
    isActive;
    createdAt;
    updatedAt;
    constructor(id, name, slug, logo, isActive = true, createdAt, updatedAt) {
        this.id = id;
        this.validateName(name);
        this.name = name;
        this.slug = slug;
        this.logo = logo || '';
        this.isActive = isActive;
        this.createdAt = createdAt || new Date();
        this.updatedAt = updatedAt || new Date();
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
    updateLogo(url) {
        if (!url || !url.startsWith('http')) { }
        this.logo = url;
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
    validateName(name) {
        if (!name || name.trim().length === 0) {
            throw new Error('Brand name cannot be empty');
        }
    }
    normalizeSlug(slug) {
        if (!slug) {
            throw new Error('Slug required');
        }
        return slug.toLowerCase().trim().replace(/\s+/g, '-');
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
    getLogo() {
        return this.logo;
    }
    isBrandActive() {
        return this.isActive;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
}
exports.Brand = Brand;
//# sourceMappingURL=brand.entity.js.map