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
exports.PrismaCartRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../infrastructure/database/prisma/prisma.service");
const cart_entity_1 = require("../../domain/entities/cart.entity");
let PrismaCartRepository = class PrismaCartRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(cartId) {
        const cart = await this.prisma.cart.findUnique({
            where: { id: cartId },
            include: {
                items: {
                    include: {
                        variant: {
                            include: {
                                attributes: true,
                                product: {
                                    include: {
                                        images: true,
                                        brand: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        return cart ? this.toDomain(cart) : null;
    }
    async save(cart) {
        const data = cart.toPersistence();
        await this.prisma.$transaction(async (tx) => {
            await tx.cart.upsert({
                where: { id: data.id },
                update: {
                    isActive: data.isActive,
                },
                create: {
                    id: data.id,
                    isActive: data.isActive,
                },
            });
            const existingItems = await tx.cartItem.findMany({
                where: { cartId: data.id },
            });
            const existingMap = new Map(existingItems.map((i) => [i.variantId, i]));
            const incomingMap = new Map(data.items.map((i) => [i.variantId, i]));
            const toDelete = existingItems
                .filter((i) => !incomingMap.has(i.variantId))
                .map((i) => i.id);
            if (toDelete.length) {
                await tx.cartItem.deleteMany({
                    where: { id: { in: toDelete } },
                });
            }
            const variantIds = data.items.map((i) => i.variantId);
            const variants = await tx.productVariant.findMany({
                where: {
                    id: { in: variantIds },
                },
                select: {
                    id: true,
                    stock: true,
                    isActive: true,
                },
            });
            const variantMap = new Map(variants.map((v) => [v.id, v]));
            for (const item of data.items) {
                const variant = variantMap.get(item.variantId);
                if (!variant) {
                    throw new Error(`Variant ${item.variantId} not found`);
                }
                if (!variant.isActive) {
                    throw new Error(`Variant ${item.variantId} is inactive`);
                }
                if (variant.stock < item.quantity) {
                    throw new Error(`Stock insuficiente para ${item.variantId}`);
                }
            }
            await Promise.all(data.items.map((item) => {
                const existing = existingMap.get(item.variantId);
                if (existing) {
                    if (existing.quantity !== item.quantity) {
                        return tx.cartItem.update({
                            where: { id: existing.id },
                            data: { quantity: item.quantity },
                        });
                    }
                    return Promise.resolve();
                }
                return tx.cartItem.create({
                    data: {
                        id: item.id,
                        cartId: data.id,
                        variantId: item.variantId,
                        quantity: item.quantity,
                    },
                });
            }));
        });
    }
    async removeItem(cartId, variantId) {
        await this.prisma.cartItem.delete({
            where: {
                cartId_variantId: {
                    cartId,
                    variantId,
                },
            },
        });
    }
    async clear(cartId) {
        await this.prisma.cartItem.deleteMany({
            where: { cartId },
        });
    }
    toDomain(cart) {
        return cart_entity_1.Cart.fromPersistence({
            id: cart.id,
            isActive: cart.isActive,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
            items: cart.items.map((i) => ({
                id: i.id,
                variantId: i.variantId,
                quantity: i.quantity,
                variant: i.variant
                    ? {
                        id: i.variant.id,
                        price: Number(i.variant.price),
                        attributes: Object.fromEntries((i.variant.attributes ?? []).map((attr) => [
                            attr.name,
                            attr.value,
                        ])),
                        product: i.variant.product
                            ? {
                                name: i.variant.product.name,
                                brand: i.variant.product.brand?.name ?? 'Unknown',
                                images: i.variant.product.images.map((img) => ({
                                    url: img.url,
                                })),
                            }
                            : null,
                    }
                    : null,
            })),
        });
    }
};
exports.PrismaCartRepository = PrismaCartRepository;
exports.PrismaCartRepository = PrismaCartRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaCartRepository);
//# sourceMappingURL=prisma-cart.repository.js.map