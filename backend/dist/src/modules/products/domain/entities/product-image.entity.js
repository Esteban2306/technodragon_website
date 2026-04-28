"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImage = void 0;
class ProductImage {
    id;
    url;
    isFeatured;
    constructor(id, url, isFeatured = false) {
        this.id = id;
        this.url = url;
        this.isFeatured = isFeatured;
    }
    getId() {
        return this.id;
    }
    getUrl() {
        return this.url;
    }
    isMain() {
        return this.isFeatured;
    }
    setAsMain() {
        this.isFeatured = true;
    }
    removeAsMain() {
        this.isFeatured = false;
    }
}
exports.ProductImage = ProductImage;
//# sourceMappingURL=product-image.entity.js.map