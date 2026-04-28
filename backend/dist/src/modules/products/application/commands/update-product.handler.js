"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductHandler = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("../services/product.service");
const product_varian_entity_1 = require("../../domain/entities/product-varian.entity");
const crypto_1 = require("crypto");
const variant_attribute_entitt_1 = require("../../domain/entities/variant-attribute.entitt");
const product_image_entity_1 = require("../../domain/entities/product-image.entity");
const product_entity_1 = require("../../domain/entities/product.entity");
const product_condition_enum_1 = require("../../domain/enums/product-condition.enum");
let UpdateProductHandler = class UpdateProductHandler {
    service;
    constructor(service) {
        this.service = service;
    }
    async execute(command) {
        if (!command.productId) {
            throw new common_1.BadRequestException('Product id is requires.');
        }
        if (!command.variants || !Array.isArray(command.variants)) {
            throw new common_1.BadRequestException('Variants are required');
        }
        if (!command.images || !Array.isArray(command.images)) {
            throw new common_1.BadRequestException('Images are required');
        }
        const variants = command.variants.map((v) => new product_varian_entity_1.ProductVariant(v.id ?? (0, crypto_1.randomUUID)(), v.sku, v.price, v.stock, v.condition ?? product_condition_enum_1.ProductCondition.NEW, (v.attributes ?? []).map((attr) => new variant_attribute_entitt_1.VariantAttribute(crypto.randomUUID(), attr.name, attr.value))));
        const images = command.images.map((img) => new product_image_entity_1.ProductImage(img.id ?? (0, crypto_1.randomUUID)(), img.url, img.isMain ?? false));
        const product = new product_entity_1.Product(command.productId, command.name, command.slug, command.description, command.brandId, command.categoryId, variants, images, true, command.isFeatured, new Date(), new Date());
        await this.service.update(product);
    }
};
exports.UpdateProductHandler = UpdateProductHandler;
exports.UpdateProductHandler = UpdateProductHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], UpdateProductHandler);
//# sourceMappingURL=update-product.handler.js.map