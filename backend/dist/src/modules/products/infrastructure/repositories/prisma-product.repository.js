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
exports.PrismaProductRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../infrastructure/database/prisma/prisma.service");
const product_entity_1 = require("../../domain/entities/product.entity");
const product_varian_entity_1 = require("../../domain/entities/product-varian.entity");
const variant_attribute_entitt_1 = require("../../domain/entities/variant-attribute.entitt");
const product_image_entity_1 = require("../../domain/entities/product-image.entity");
const product_condition_enum_1 = require("../../domain/enums/product-condition.enum");
const cloudinary_service_1 = require("../../../../infrastructure/service/cloudinary/cloudinary.service");
const catalog_condition_mapper_1 = require("../../../catalog/helpers/catalog-condition.mapper");
let PrismaProductRepository = class PrismaProductRepository {
    prisma;
    cloudinaryService;
    constructor(prisma, cloudinaryService) {
        this.prisma = prisma;
        this.cloudinaryService = cloudinaryService;
    }
    async save(product) {
        await this.prisma.product.create({
            data: {
                id: product.id,
                name: product.getName(),
                slug: product.getSlug(),
                description: product.getDescription(),
                isFeatured: product.isProductFeatured(),
                brandId: product.getBrandId(),
                categoryId: product.getCategoryId(),
                isActive: product.isProductActive(),
                images: {
                    create: product.getImages().map((img) => ({
                        id: img.getId(),
                        url: img.getUrl(),
                        isMain: img.isMain(),
                    })),
                },
                variants: {
                    create: product.getVariants().map((variant) => ({
                        id: variant.getId(),
                        sku: variant.getSku(),
                        price: variant.getPrice(),
                        stock: variant.getStock(),
                        isActive: variant.isVariantActive(),
                        condition: variant.getCondition() ?? product_condition_enum_1.ProductCondition.NEW,
                        attributes: {
                            create: variant.getAttributes().map((attr) => ({
                                id: attr.id,
                                name: attr.getName(),
                                value: attr.getValue(),
                            })),
                        },
                    })),
                },
            },
        });
    }
    async findById(id) {
        const data = await this.prisma.product.findUnique({
            where: { id },
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
        if (!data)
            return null;
        return this.toResponse(data);
    }
    async findDomainById(id) {
        const data = await this.prisma.product.findUnique({
            where: { id },
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
        if (!data)
            return null;
        return this.toDomain(data);
    }
    async findAll(filters) {
        const page = Math.max(Number(filters?.page ?? 1), 1);
        const limit = Math.min(Math.max(Number(filters?.limit ?? 20), 1), 100);
        const skip = (page - 1) * limit;
        const where = {
            ...(filters?.isActive !== undefined && { isActive: filters.isActive }),
            ...(filters?.isFeatured !== undefined && {
                isFeatured: filters.isFeatured,
            }),
            ...(filters?.brandId && { brandId: filters.brandId }),
            ...(filters?.categoryId && { categoryId: filters.categoryId }),
            ...(filters?.condition && {
                variants: {
                    some: {
                        condition: filters.condition,
                    },
                },
            }),
            ...(filters?.search && {
                OR: [
                    { name: { contains: filters.search, mode: 'insensitive' } },
                    { slug: { contains: filters.search, mode: 'insensitive' } },
                    {
                        brand: { name: { contains: filters.search, mode: 'insensitive' } },
                    },
                ],
            }),
        };
        const data = await this.prisma.product.findMany({
            where,
            skip,
            take: limit,
            orderBy: { updatedAt: 'desc' },
            include: {
                brand: true,
                category: true,
                images: true,
                variants: {
                    include: {
                        attributes: true,
                    },
                    where: { isActive: true },
                    orderBy: { price: 'asc' },
                },
            },
        });
        return data.map((d) => this.toResponse(d));
    }
    async findAllPaginated(filters) {
        const page = Math.max(Number(filters?.page ?? 1), 1);
        const limit = Math.min(Math.max(Number(filters?.limit ?? 20), 1), 100);
        const skip = (page - 1) * limit;
        const where = {
            ...(filters?.isActive !== undefined && { isActive: filters.isActive }),
            ...(filters?.isFeatured !== undefined && {
                isFeatured: filters.isFeatured,
            }),
            ...(filters?.brandId && { brandId: filters.brandId }),
            ...(filters?.categoryId && { categoryId: filters.categoryId }),
            ...(filters?.condition && {
                variants: {
                    some: { condition: filters.condition },
                },
            }),
            ...(filters?.search && {
                OR: [
                    { name: { contains: filters.search, mode: 'insensitive' } },
                    { slug: { contains: filters.search, mode: 'insensitive' } },
                    {
                        brand: { name: { contains: filters.search, mode: 'insensitive' } },
                    },
                ],
            }),
        };
        const [rows, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                where,
                skip,
                take: limit,
                orderBy: { updatedAt: 'desc' },
                include: {
                    brand: true,
                    category: true,
                    images: true,
                    variants: {
                        include: { attributes: true },
                        where: { isActive: true },
                        orderBy: { price: 'asc' },
                    },
                },
            }),
            this.prisma.product.count({ where }),
        ]);
        return {
            data: rows.map((d) => this.toResponse(d)),
            total,
        };
    }
    async findByVariantId(variantId) {
        const data = await this.prisma.product.findFirst({
            where: {
                variants: {
                    some: {
                        id: variantId,
                    },
                },
            },
            include: {
                images: true,
                variants: {
                    include: {
                        attributes: true,
                    },
                },
            },
        });
        if (!data)
            return null;
        return this.toDomain(data);
    }
    async update(product) {
        await this.prisma.$transaction(async (tx) => {
            const existing = await tx.product.findUnique({
                where: { id: product.id },
                include: {
                    images: true,
                    variants: {
                        include: { attributes: true },
                    },
                },
            });
            if (!existing) {
                throw new Error('Product not found');
            }
            const incomingVariants = product.getVariants();
            const incomingImages = product.getImages();
            await tx.product.update({
                where: { id: product.id },
                data: {
                    name: product.getName(),
                    slug: product.getSlug(),
                    description: product.getDescription(),
                    brandId: product.getBrandId(),
                    categoryId: product.getCategoryId(),
                    isActive: product.isProductActive(),
                    isFeatured: product.isProductFeatured(),
                },
            });
            const isSameVariantsStructure = existing.variants.length === incomingVariants.length &&
                existing.variants.every((v) => incomingVariants.some((i) => i.getId() === v.id));
            const onlyStockChanged = isSameVariantsStructure &&
                incomingVariants.every((incoming) => {
                    const current = existing.variants.find((v) => v.id === incoming.getId());
                    if (!current)
                        return false;
                    return (current.stock !== incoming.getStock() &&
                        current.price.toNumber() === incoming.getPrice() &&
                        current.sku === incoming.getSku() &&
                        current.condition === incoming.getCondition());
                });
            if (onlyStockChanged) {
                for (const variant of incomingVariants) {
                    await tx.productVariant.update({
                        where: { id: variant.getId() },
                        data: {
                            stock: variant.getStock(),
                            isActive: variant.getStock() > 0,
                        },
                    });
                }
                return;
            }
            const existingMap = new Map(existing.variants.map((v) => [v.id, v]));
            const incomingMap = new Map(incomingVariants.map((v) => [v.getId(), v]));
            for (const incoming of incomingVariants) {
                const existingVariant = existingMap.get(incoming.getId());
                if (existingVariant) {
                    await tx.productVariant.update({
                        where: { id: incoming.getId() },
                        data: {
                            sku: incoming.getSku(),
                            price: incoming.getPrice(),
                            stock: incoming.getStock(),
                            isActive: incoming.getStock() > 0,
                            condition: incoming.getCondition(),
                        },
                    });
                    await tx.variantAttribute.deleteMany({
                        where: { variantId: incoming.getId() },
                    });
                    await tx.variantAttribute.createMany({
                        data: incoming.getAttributes().map((attr) => ({
                            id: attr.id,
                            variantId: incoming.getId(),
                            name: attr.getName(),
                            value: attr.getValue(),
                        })),
                    });
                }
                else {
                    await tx.productVariant.create({
                        data: {
                            id: incoming.getId(),
                            productId: product.id,
                            sku: incoming.getSku(),
                            price: incoming.getPrice(),
                            stock: incoming.getStock(),
                            isActive: incoming.isVariantActive(),
                            condition: incoming.getCondition(),
                            attributes: {
                                create: incoming.getAttributes().map((attr) => ({
                                    id: attr.id,
                                    name: attr.getName(),
                                    value: attr.getValue(),
                                })),
                            },
                        },
                    });
                }
            }
            for (const existingVariant of existing.variants) {
                const stillExists = incomingMap.has(existingVariant.id);
                if (!stillExists) {
                    const inUse = await tx.cartItem.findFirst({
                        where: { variantId: existingVariant.id },
                    });
                    if (inUse) {
                        console.log('Variant in use, skipping delete:', existingVariant.id);
                        continue;
                    }
                    await tx.productVariant.delete({
                        where: { id: existingVariant.id },
                    });
                }
            }
            const incomingUrls = new Set(incomingImages.map((img) => img.getUrl()));
            const imagesToDelete = existing.images.filter((img) => !incomingUrls.has(img.url));
            for (const img of imagesToDelete) {
                const publicId = this.cloudinaryService.extractPublicId(img.url);
                if (publicId) {
                    try {
                        await this.cloudinaryService.deleteImage(publicId);
                    }
                    catch (error) {
                        console.error('Error deleting image from Cloudinary:', publicId);
                    }
                }
            }
            await tx.productImage.deleteMany({
                where: { productId: product.id },
            });
            for (const img of incomingImages) {
                await tx.productImage.create({
                    data: {
                        id: img.getId(),
                        productId: product.id,
                        url: img.getUrl(),
                        isMain: img.isMain(),
                    },
                });
            }
        });
    }
    async updateStock(variantId, stock) {
        await this.prisma.productVariant.update({
            where: { id: variantId },
            data: {
                stock,
                isActive: stock > 0,
            },
        });
    }
    async existsBySlug(slug) {
        const count = await this.prisma.product.count({
            where: { slug },
        });
        return count > 0;
    }
    async findBySlug(slug) {
        const data = await this.prisma.product.findUnique({
            where: { slug },
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
        if (!data)
            return null;
        return this.toResponse(data);
    }
    async delete(id) {
        await this.prisma.product.delete({
            where: { id },
        });
    }
    async markProductAsFeatured(productId) {
        const current = await this.prisma.product.findUnique({
            where: { id: productId },
            select: { isFeatured: true },
        });
        if (!current) {
            throw new Error('Product not found');
        }
        const newValue = !current.isFeatured;
        await this.prisma.$transaction([
            this.prisma.product.update({
                where: { id: productId },
                data: { isFeatured: newValue },
            }),
            this.prisma.catalogItem.updateMany({
                where: { productId },
                data: { isFeatured: newValue },
            }),
        ]);
        return newValue;
    }
    async toggleActive(id, isActive) {
        await this.prisma.product.update({
            where: { id },
            data: {
                isActive,
            },
        });
    }
    async toggleVariantStatus(variantId, isActive) {
        await this.prisma.productVariant.update({
            where: { id: variantId },
            data: { isActive },
        });
    }
    toDomain(data) {
        return new product_entity_1.Product(data.id, data.name, data.slug, data.description ?? '', data.brandId, data.categoryId, data.variants.map((v) => new product_varian_entity_1.ProductVariant(v.id, v.sku, Number(v.price), v.stock, v.condition, v.attributes.map((a) => new variant_attribute_entitt_1.VariantAttribute(a.id, a.name, a.value)), v.isActive, v.createdAt, v.updatedAt)), data.images.map((img) => new product_image_entity_1.ProductImage(img.id, img.url, img.isMain)), data.isActive, data.isFeatured, data.createdAt, data.updatedAt);
    }
    toResponse(data) {
        return {
            id: data.id,
            name: data.name,
            slug: data.slug,
            description: data.description ?? '',
            brand: {
                id: data.brand.id,
                name: data.brand.name,
            },
            category: {
                id: data.category.id,
                name: data.category.name,
            },
            variants: data.variants.map((v) => ({
                id: v.id,
                sku: v.sku,
                price: Number(v.price),
                stock: v.stock,
                isActive: v.isActive,
                condition: (0, catalog_condition_mapper_1.mapPrismaConditionToDomain)(v.condition),
                attributes: v.attributes.map((a) => ({
                    id: a.id,
                    name: a.name,
                    value: a.value,
                })),
                createdAt: v.createdAt,
                updatedAt: v.updatedAt,
            })),
            images: data.images.map((img) => ({
                id: img.id,
                url: img.url,
                isMain: img.isMain,
            })),
            isActive: data.isActive,
            isFeatured: data.isFeatured,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }
};
exports.PrismaProductRepository = PrismaProductRepository;
exports.PrismaProductRepository = PrismaProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        cloudinary_service_1.CloudinaryService])
], PrismaProductRepository);
//# sourceMappingURL=prisma-product.repository.js.map