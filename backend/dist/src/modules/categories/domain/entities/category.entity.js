"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    id;
    name;
    slug;
    parentId;
    children = [];
    createdAt;
    updatedAt;
    constructor(id, name, slug, parentId, children = [], createdAt, updatedAt) {
        this.id = id;
        this.validateName(name);
        this.name = name;
        this.slug = this.normalizeSlug(slug);
        this.parentId = parentId;
        this.children = children;
        this.createdAt = createdAt ?? new Date();
        this.updatedAt = updatedAt ?? new Date();
    }
    updateName(name) {
        this.validateName(name);
        this.name = name;
        this.touch();
    }
    updateSlug(slug) {
        this.slug = slug;
        this.touch();
    }
    updateParent(parentId) {
        if (parentId === this.id) {
            throw new Error("Category cannot be its own parent");
        }
        this.parentId = parentId;
        this.touch();
    }
    setChildren(children) {
        this.children = children;
    }
    validateName(name) {
        if (!name || name.trim().length < 2) {
            throw new Error("Category name must be at least 2 characters");
        }
    }
    normalizeSlug(slug) {
        if (!slug) {
            throw new Error("Slug is required");
        }
        return slug.toLowerCase().trim().replace(/\s+/g, "-");
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
    getParentId() {
        return this.parentId;
    }
    getChildren() {
        return this.children;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
}
exports.Category = Category;
//# sourceMappingURL=category.entity.js.map