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
exports.catalogListener = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../infrastructure/database/prisma/prisma.service");
const prisma_catalog_repository_1 = require("../../infrastructure/repositories/prisma-catalog.repository");
const catalog_entity_1 = require("../../domain/entities/catalog.entity");
const event_emitter_1 = require("@nestjs/event-emitter");
const event_types_1 = require("../../../../infrastructure/events/event.types");
const catalog_condition_mapper_1 = require("../../helpers/catalog-condition.mapper");
let catalogListener = class catalogListener {
    prisma;
    catalogRepository;
    constructor(prisma, catalogRepository) {
        this.prisma = prisma;
        this.catalogRepository = catalogRepository;
    }
    async handleProductCreatedEvent(payload) {
        await this.syncProductToCatalog(payload.productId);
    }
    async handleProductUpdatedEvent(payload) {
        await this.syncProductToCatalog(payload.productId);
    }
    async handleStockUpdatedEvent(payload) {
        await this.catalogRepository.updateStock(payload.variantId, payload.stock);
    }
    async syncProductToCatalog(productId) {
        const product = await this.prisma.product.findUnique({
            where: { id: productId },
            include: {
                variants: {
                    include: {
                        attributes: true
                    }
                },
                images: true,
                brand: true,
                category: true
            }
        });
        if (!product)
            return;
        const items = product.variants.map((variant) => {
            const attributesMap = {};
            variant.attributes.forEach(attr => {
                if (!attributesMap[attr.name]) {
                    attributesMap[attr.name] = [];
                }
                attributesMap[attr.name].push(attr.value);
            });
            return new catalog_entity_1.CatalogItem(crypto.randomUUID(), product.id, variant.id, product.name, product.slug, product.brandId, product.brand.name, product.categoryId, product.category.name, Number(variant.price), variant.stock, (0, catalog_condition_mapper_1.mapPrismaConditionToDomain)(variant.condition), attributesMap, product.images.map(img => img.url), variant.stock > 0, product.isFeatured, new Date(), new Date());
        });
        await this.catalogRepository.upsertMany(items);
    }
};
exports.catalogListener = catalogListener;
__decorate([
    (0, event_emitter_1.OnEvent)(event_types_1.EventTypes.PRODUCT_CREATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], catalogListener.prototype, "handleProductCreatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)(event_types_1.EventTypes.PRODUCT_UPDATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], catalogListener.prototype, "handleProductUpdatedEvent", null);
__decorate([
    (0, event_emitter_1.OnEvent)(event_types_1.EventTypes.STOCK_UPDATED),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], catalogListener.prototype, "handleStockUpdatedEvent", null);
exports.catalogListener = catalogListener = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        prisma_catalog_repository_1.PrismaCatalogRepository])
], catalogListener);
//# sourceMappingURL=catalog.listener.js.map