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
exports.PrismaCatalogRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../infrastructure/database/prisma/prisma.service");
const catalog_entity_1 = require("../../domain/entities/catalog.entity");
const catalog_condition_mapper_1 = require("../../helpers/catalog-condition.mapper");
const catalog_attributes_mapper_1 = require("../../helpers/catalog-attributes.mapper");
const normalize_attribute_1 = require("../../helpers/normalize-attribute");
let PrismaCatalogRepository = class PrismaCatalogRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async upsertMany(items) {
        if (!items.length)
            return;
        await this.prisma.$transaction(items.map((item) => {
            const data = item.toPersistence();
            return this.prisma.catalogItem.upsert({
                where: {
                    productId_variantId: {
                        productId: data.productId,
                        variantId: data.variantId,
                    },
                },
                update: {
                    name: data.name,
                    slug: data.slug,
                    brandId: data.brandId,
                    brandName: data.brandName,
                    categoryId: data.categoryId,
                    categoryName: data.categoryName,
                    price: data.price,
                    stock: data.stock,
                    condition: data.condition,
                    attributes: data.attributes,
                    images: data.images,
                    isActive: data.isActive,
                    isFeatured: data.isFeatured,
                    updatedAt: new Date(),
                },
                create: data,
            });
        }));
    }
    async deleteByProductId(productId) {
        await this.prisma.catalogItem.updateMany({
            where: { productId },
            data: { isActive: false },
        });
    }
    async updateStock(variantId, stock) {
        await this.prisma.catalogItem.updateMany({
            where: { variantId },
            data: {
                stock,
                isActive: stock > 0,
            },
        });
    }
    async updateManyByBrand(brandId, data) {
        await this.prisma.catalogItem.updateMany({
            where: { brandId },
            data,
        });
    }
    async updateManyByCategory(categoryId, data) {
        await this.prisma.catalogItem.updateMany({
            where: { categoryId },
            data,
        });
    }
    async findAll(filters) {
        const { minPrice, maxPrice, brandId, categoryId, condition, attributes, search, isFeatured, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', } = filters;
        const safePage = Number(page);
        const safeLimit = Number(limit);
        const where = {
            isActive: true,
        };
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined)
                where.price.gte = minPrice;
            if (maxPrice !== undefined)
                where.price.lte = maxPrice;
        }
        if (brandId) {
            where.brandId = brandId;
        }
        if (categoryId) {
            where.categoryId = categoryId;
        }
        if (condition) {
            where.condition = condition;
        }
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { slug: { contains: search, mode: 'insensitive' } },
            ];
        }
        if (typeof isFeatured === 'boolean') {
            where.isFeatured = isFeatured;
        }
        if (attributes) {
            where.AND = Object.entries(attributes).map(([key, values]) => ({
                attributes: {
                    path: [(0, normalize_attribute_1.normalizeAttribute)(key)],
                    array_contains: Array.isArray(values)
                        ? values.map(normalize_attribute_1.normalizeAttribute)
                        : [(0, normalize_attribute_1.normalizeAttribute)(values)],
                },
            }));
        }
        const skip = (safePage - 1) * safeLimit;
        const orderBy = {
            [sortBy]: sortOrder,
        };
        const [results, total] = await this.prisma.$transaction([
            this.prisma.catalogItem.findMany({
                where,
                orderBy,
                skip,
                take: safeLimit,
            }),
            this.prisma.catalogItem.count({ where }),
        ]);
        const data = results.map((item) => catalog_entity_1.CatalogItem.fromPersistence({
            id: item.id,
            productId: item.productId,
            variantId: item.variantId,
            name: item.name,
            slug: item.slug,
            brandId: item.brandId,
            brandName: item.brandName,
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            price: Number(item.price),
            stock: item.stock,
            condition: (0, catalog_condition_mapper_1.mapPrismaConditionToDomain)(item.condition),
            attributes: (0, catalog_attributes_mapper_1.mapJsonToAttributes)(item.attributes),
            images: (item.images ?? []),
            isActive: item.isActive,
            isFeatured: item.isFeatured,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        }));
        const totalPages = Math.ceil(total / safeLimit);
        return {
            data,
            meta: {
                total,
                page: safePage,
                limit: safeLimit,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        };
    }
    async findById(id) {
        if (!id) {
            throw new Error('CatalogItem id is required');
        }
        const item = await this.prisma.catalogItem.findFirst({
            where: {
                id,
                isActive: true,
            },
        });
        if (!item) {
            return null;
        }
        return catalog_entity_1.CatalogItem.fromPersistence({
            id: item.id,
            productId: item.productId,
            variantId: item.variantId,
            name: item.name,
            slug: item.slug,
            brandId: item.brandId,
            brandName: item.brandName,
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            price: Number(item.price),
            stock: item.stock,
            condition: (0, catalog_condition_mapper_1.mapPrismaConditionToDomain)(item.condition),
            attributes: (0, catalog_attributes_mapper_1.mapJsonToAttributes)(item.attributes),
            images: (item.images ?? []),
            isActive: item.isActive,
            isFeatured: item.isFeatured,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
        });
    }
};
exports.PrismaCatalogRepository = PrismaCatalogRepository;
exports.PrismaCatalogRepository = PrismaCatalogRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCatalogRepository);
//# sourceMappingURL=prisma-catalog.repository.js.map