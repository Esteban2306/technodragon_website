import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Product } from "../../domain/entities/product.entity";
import { ProductVariant } from "../../domain/entities/product-varian.entity";
import { VariantAttribute } from "../../domain/entities/variant-attribute.entitt";
import { ProductImage } from "../../domain/entities/product-image.entity";
import { ProductRepository } from "../../domain/repositories/product.repository.interface";
import { PrismaProductWithRelations } from "../../types/PrismaProductWithRelations";
import { ProductFilters } from "../../types/ProductFilters.types";

@Injectable()
export class PrismaProductRepository implements ProductRepository {

    constructor (private prisma: PrismaService) {}

    async save (product: Product): Promise<void> {
        await this.prisma.product.create({
            data: {
                id: product.id,
                name: product.getName(),
                slug: product.getSlug(),
                description: product.getDescription(),
                brandId: product.getBrandId(),
                categoryId: product.getCategoryId(),
                isActive: product.isProductActive(),
                images: {
                    create: product.getImages().map(img => ({
                        id: img.getId(),
                        url: img.getUrl()
                    }))
                },
                variants: {
                    create: product.getVariants().map(variant => ({
                        id: variant.getId(),
                        sku: variant.getSku(),
                        price: variant.getPrice(),
                        stock: variant.getStock(),
                        isActive: variant.isVariantActive(),

                        attributes: {
                            create: variant.getAttributes().map(attr => ({
                                id: attr.id,
                                name: attr.getName(),
                                value: attr.getValue()
                            }))
                        }
                    }))
                }
            },
        })
    }

    async findById(id: string): Promise<Product | null> {
        const data = await this.prisma.product.findUnique({
            where: {id},
            include: {
                images: true,
                variants: {
                    include: {
                        attributes: true
                    }
                }
            }
        })

        if(!data) return null

        return this.toDomain(data)
    }

    async findAll(filters?: ProductFilters): Promise<Product[]> {
        const data = await this.prisma.product.findMany({
            where: {
                isActive: filters?.isActive,
                brandId: filters?.brandId,
                categoryId: filters?.categoryId
            },
            include: {
                images: true,
                variants: {
                    include: {
                        attributes: true
                    }
                }
            }
        })

        return data.map(d => this.toDomain(d))
    }

    async findByVariantId(variantId: string): Promise<Product | null> {
        const data = await this.prisma.product.findFirst({
            where: {
                variants: {
                    some: {
                        id: variantId
                    }
                }
            },
            include: {
                images: true,
                variants: {
                    include: {
                        attributes: true
                    }
                }
            }
        });

        if (!data) return null;

        return this.toDomain(data);
    }

   async update(product: Product): Promise<void> {
    await this.prisma.$transaction(async (tx) => {

        const existing = await tx.product.findUnique({
        where: { id: product.id },
        include: {
            images: true,
            variants: {
            include: { attributes: true }
            }
        }
        });

        if (!existing) {
        throw new Error("Product not found");
        }

        const incomingVariants = product.getVariants();
        const incomingImages = product.getImages();

        const isSameBasicInfo =
        existing.name === product.getName() &&
        existing.slug === product.getSlug() &&
        existing.description === product.getDescription() &&
        existing.isActive === product.isProductActive();


        const existingVariantIds = new Set(existing.variants.map(v => v.id));
        const incomingVariantIds = new Set(incomingVariants.map(v => v.getId()));

        const isSameVariantsStructure =
        existingVariantIds.size === incomingVariantIds.size &&
        [...existingVariantIds].every(id => incomingVariantIds.has(id));

        const existingImageIds = new Set(existing.images.map(i => i.id));
        const incomingImageIds = new Set(incomingImages.map(i => i.getId()));

        const isSameImagesStructure =
        existingImageIds.size === incomingImageIds.size &&
        [...existingImageIds].every(id => incomingImageIds.has(id));

        const isSameStructure = isSameVariantsStructure && isSameImagesStructure;


        const onlyStockChanged = isSameVariantsStructure && incomingVariants.every(incoming => {
        const current = existing.variants.find(v => v.id === incoming.getId());
        if (!current) return false;

        const sameAttributes =
            current.attributes.length === incoming.getAttributes().length &&
            current.attributes.every(attr =>
            incoming.getAttributes().some(i =>
                i.getName() === attr.name && i.getValue() === attr.value
            )
            );

        return (
            current.stock !== incoming.getStock() &&

            current.price.toNumber() === incoming.getPrice() &&
            current.sku === incoming.getSku() &&
            current.isActive === incoming.isVariantActive() &&
            sameAttributes
        );
        });


        if (isSameStructure) {

        if (!isSameBasicInfo) {
            await tx.product.update({
            where: { id: product.id },
            data: {
                name: product.getName(),
                slug: product.getSlug(),
                description: product.getDescription(),
                isActive: product.isProductActive()
            }
            });
        }

        if (onlyStockChanged) {
            for (const variant of incomingVariants) {
            await tx.productVariant.update({
                where: { id: variant.getId() },
                data: {
                stock: variant.getStock(),
                isActive: variant.getStock() === 0 ? false : variant.isVariantActive()
                }
            });
            }

            return;
        }

        if (isSameBasicInfo) {
            return;
        }
        }

        await tx.product.update({
        where: { id: product.id },
        data: {
            name: product.getName(),
            slug: product.getSlug(),
            description: product.getDescription(),
            isActive: product.isProductActive()
        }
        });

        const existingMap = new Map(existing.variants.map(v => [v.id, v]));

        const toDelete = existing.variants
        .filter(v => !incomingVariants.some(i => i.getId() === v.id))
        .map(v => v.id);

        if (toDelete.length > 0) {
        await tx.productVariant.deleteMany({
            where: { id: { in: toDelete } }
        });
        }

        for (const variant of incomingVariants) {
        const exists = existingMap.get(variant.getId());

        if (!exists) {
            await tx.productVariant.create({
            data: {
                id: variant.getId(),
                productId: product.id,
                sku: variant.getSku(),
                price: variant.getPrice(),
                stock: variant.getStock(),
                isActive: variant.isVariantActive(),
                attributes: {
                create: variant.getAttributes().map(attr => ({
                    id: attr.id,
                    name: attr.getName(),
                    value: attr.getValue()
                }))
                }
            }
            });
        } else {

            if (
            exists.price.toNumber() !== variant.getPrice() ||
            exists.sku !== variant.getSku() ||
            exists.isActive !== variant.isVariantActive()
            ) {
            await tx.productVariant.update({
                where: { id: variant.getId() },
                data: {
                price: variant.getPrice(),
                sku: variant.getSku(),
                isActive: variant.isVariantActive()
                }
            });
            }

            const existingAttrs = new Map(
            exists.attributes.map(a => [`${a.name}-${a.value}`, a])
            );

            const incomingAttrs = variant.getAttributes();

            const toDeleteAttrs = exists.attributes
            .filter(a =>
                !incomingAttrs.some(i =>
                i.getName() === a.name && i.getValue() === a.value
                )
            )
            .map(a => a.id);

            if (toDeleteAttrs.length > 0) {
            await tx.variantAttribute.deleteMany({
                where: { id: { in: toDeleteAttrs } }
            });
            }

            for (const attr of incomingAttrs) {
            const key = `${attr.getName()}-${attr.getValue()}`;

            if (!existingAttrs.has(key)) {
                await tx.variantAttribute.create({
                data: {
                    id: attr.id,
                    variantId: variant.getId(),
                    name: attr.getName(),
                    value: attr.getValue()
                }
                });
            }
            }
        }
        }

    const existingImages = new Map(existing.images.map(i => [i.id, i]));

    const imagesToDelete = existing.images
      .filter(img => !incomingImages.some(i => i.getId() === img.id))
      .map(img => img.id);

    if (imagesToDelete.length > 0) {
      await tx.productImage.deleteMany({
        where: { id: { in: imagesToDelete } }
      });
    }

    for (const img of incomingImages) {
      if (!existingImages.has(img.getId())) {
        await tx.productImage.create({
          data: {
            id: img.getId(),
            productId: product.id,
            url: img.getUrl()
          }
        });
      }
    }

  });
    }

    async updateStock(variantId: string, stock: number) {
        await this.prisma.productVariant.update({
            where: {id: variantId},
            data: {
                stock,
                isActive: stock === 0 ? false : true
            }
        })
    }

    async existsBySlug(slug: string): Promise<boolean> {
        const count = await this.prisma.product.count({
            where: {slug}
        })

        return count > 0
    }

    async findBySlug(slug: string): Promise<Product | null> {
        const data = await this.prisma.product.findUnique({
            where: {slug},
            include: {
                images: true,
                variants: {
                    include: {
                        attributes: true
                    }
                }
            }
        })

        if(!data) return null

        return this.toDomain(data)
    }

    async delete(id: string): Promise<void> {
        await this.prisma.product.update({
            where: {id},
            data: {
                isActive: false
            }
        })
    }

    private toDomain(data: PrismaProductWithRelations): Product {
        return new Product(
            data.id,
            data.name,
            data.slug,
            data.description ?? '',
            data.brandId,
            data.categoryId,

            data.variants.map(v => new ProductVariant(
            v.id,
            v.sku,
            Number(v.price),
            v.stock,
            v.attributes.map(a => new VariantAttribute(
                a.id,
                a.name,
                a.value
            )),
            v.isActive,
            v.createdAt,
            v.updatedAt
            )),

            data.images.map(img => new ProductImage(
            img.id,
            img.url
            )),

            data.isActive,
            data.createdAt,
            data.updatedAt
        );
    }

}