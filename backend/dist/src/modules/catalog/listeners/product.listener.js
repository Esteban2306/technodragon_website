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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockOutOfStockListener = exports.ProductUpdateStockListener = exports.ProductDeletedListener = exports.ProductUpdatedListener = exports.ProductCreatedListener = void 0;
const common_1 = require("@nestjs/common");
const prisma_catalog_repository_1 = require("../infrastructure/repositories/prisma-catalog.repository");
const catalog_repository_token_1 = require("../helpers/catalog-repository.token");
const prisma_service_1 = require("../../../infrastructure/database/prisma/prisma.service");
const catalog_item_mapper_1 = require("../helpers/catalog-item-mapper");
const catalog_condition_mapper_1 = require("../helpers/catalog-condition.mapper");
let ProductCreatedListener = class ProductCreatedListener {
    prisma;
    catalogPrisma;
    constructor(prisma, catalogPrisma) {
        this.prisma = prisma;
        this.catalogPrisma = catalogPrisma;
    }
    async handle(event) {
        const product = await this.prisma.product.findUnique({
            where: { id: event.productId },
            include: {
                brand: true,
                category: true,
                images: true,
                variants: {
                    include: {
                        attributes: true,
                    },
                },
            },
        });
        if (!product) {
            throw new Error(`Product with id ${event.productId} not found`);
        }
        const productForCatalog = {
            id: product.id,
            name: product.name,
            slug: product.slug,
            isActive: product.isActive,
            isFeatured: product.isFeatured,
            brand: {
                id: product.brand?.id,
                name: product.brand?.name,
            },
            category: {
                id: product.category?.id,
                name: product.category?.name,
            },
            images: product.images.map((img) => img.url),
            variants: product.variants.map((variant) => ({
                id: variant.id,
                price: Number(variant.price),
                stock: variant.stock,
                condition: (0, catalog_condition_mapper_1.mapPrismaConditionToDomain)(variant.condition),
                isActive: variant.isActive,
                attributes: variant.attributes.map((attr) => ({
                    name: attr.name,
                    value: attr.value,
                })),
            })),
        };
        const catalogItems = catalog_item_mapper_1.CatalogItemMapper.fromProduct(productForCatalog);
        await this.catalogPrisma.upsertMany(catalogItems);
    }
};
exports.ProductCreatedListener = ProductCreatedListener;
exports.ProductCreatedListener = ProductCreatedListener = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(catalog_repository_token_1.CATALOG_REPOSITORY)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        prisma_catalog_repository_1.PrismaCatalogRepository])
], ProductCreatedListener);
let ProductUpdatedListener = class ProductUpdatedListener {
    prisma;
    catalogRepository;
    constructor(prisma, catalogRepository) {
        this.prisma = prisma;
        this.catalogRepository = catalogRepository;
    }
    async handle(event) {
        const product = await this.prisma.product.findUnique({
            where: { id: event.productId },
            include: {
                brand: true,
                category: true,
                images: true,
                variants: {
                    include: {
                        attributes: true,
                    },
                },
            },
        });
        if (!product) {
            throw new Error(`Product ${event.productId} not found`);
        }
        const productForCatalog = {
            id: product.id,
            name: product.name,
            slug: product.slug,
            isActive: product.isActive,
            isFeatured: product.isFeatured,
            brand: product.brand
                ? {
                    id: product.brand.id,
                    name: product.brand.name,
                }
                : undefined,
            category: {
                id: product.category.id,
                name: product.category.name,
            },
            images: product.images.map((img) => img.url),
            variants: product.variants.map((variant) => ({
                id: variant.id,
                price: Number(variant.price),
                stock: variant.stock,
                condition: (0, catalog_condition_mapper_1.mapPrismaConditionToDomain)(variant.condition),
                isActive: variant.isActive,
                attributes: variant.attributes.map((attr) => ({
                    name: attr.name,
                    value: attr.value,
                })),
            })),
        };
        if (!productForCatalog.variants.length) {
            await this.catalogRepository.deleteByProductId(product.id);
            return;
        }
        const catalogItems = catalog_item_mapper_1.CatalogItemMapper.fromProduct(productForCatalog);
        await this.catalogRepository.upsertMany(catalogItems);
    }
};
exports.ProductUpdatedListener = ProductUpdatedListener;
exports.ProductUpdatedListener = ProductUpdatedListener = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(catalog_repository_token_1.CATALOG_REPOSITORY)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], ProductUpdatedListener);
let ProductDeletedListener = class ProductDeletedListener {
    catalogRepository;
    constructor(catalogRepository) {
        this.catalogRepository = catalogRepository;
    }
    async handle(event) {
        const { productId } = event;
        if (!productId) {
            throw new Error('ProductDeleted event without productId');
        }
        await this.catalogRepository.deleteByProductId(productId);
    }
};
exports.ProductDeletedListener = ProductDeletedListener;
exports.ProductDeletedListener = ProductDeletedListener = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(catalog_repository_token_1.CATALOG_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ProductDeletedListener);
let ProductUpdateStockListener = class ProductUpdateStockListener {
    catalogRepository;
    constructor(catalogRepository) {
        this.catalogRepository = catalogRepository;
    }
    async handle(event) {
        const { variantId, stock } = event;
        if (!variantId) {
            throw new Error('StockUpdated event without variantId');
        }
        if (stock === undefined || stock === null) {
            throw new Error('StockUpdated event without stock value');
        }
        await this.catalogRepository.updateStock(variantId, stock);
    }
};
exports.ProductUpdateStockListener = ProductUpdateStockListener;
exports.ProductUpdateStockListener = ProductUpdateStockListener = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(catalog_repository_token_1.CATALOG_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ProductUpdateStockListener);
let StockOutOfStockListener = class StockOutOfStockListener {
    catalogRepository;
    constructor(catalogRepository) {
        this.catalogRepository = catalogRepository;
    }
    async handle(event) {
        await this.catalogRepository.updateStock(event.variantId, 0);
    }
};
exports.StockOutOfStockListener = StockOutOfStockListener;
exports.StockOutOfStockListener = StockOutOfStockListener = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(catalog_repository_token_1.CATALOG_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], StockOutOfStockListener);
//# sourceMappingURL=product.listener.js.map