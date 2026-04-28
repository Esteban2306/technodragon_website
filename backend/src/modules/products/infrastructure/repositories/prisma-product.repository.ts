import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { Product } from '../../domain/entities/product.entity';
import { ProductVariant } from '../../domain/entities/product-varian.entity';
import { VariantAttribute } from '../../domain/entities/variant-attribute.entitt';
import { ProductImage } from '../../domain/entities/product-image.entity';
import { ProductRepository } from '../../domain/repositories/product.repository.interface';
import { PrismaProductWithRelations } from '../../types/PrismaProductWithRelations';
import { ProductFilters } from '../../types/ProductFilters.types';
import { ProductCondition } from '../../domain/enums/product-condition.enum';
import { CloudinaryService } from 'src/infrastructure/service/cloudinary/cloudinary.service';
import { Prisma } from '@prisma/client';
import {
  PrismaProductFull,
  ProductResponse,
} from '../../types/product-response.types';
import { mapPrismaConditionToDomain } from 'src/modules/catalog/helpers/catalog-condition.mapper';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async save(product: Product): Promise<void> {
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
            condition: variant.getCondition() ?? ProductCondition.NEW,

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

  async findById(id: string): Promise<ProductResponse | null> {
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

    if (!data) return null;

    return this.toResponse(data);
  }

  async findDomainById(id: string): Promise<Product | null> {
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

    if (!data) return null;

    return this.toDomain(data);
  }

  async findAll(filters?: ProductFilters): Promise<ProductResponse[]> {
    const page = Math.max(Number(filters?.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(filters?.limit ?? 20), 1), 100);
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      ...(filters?.isActive !== undefined && { isActive: filters.isActive }),
      ...(filters?.isFeatured !== undefined && {
        isFeatured: filters.isFeatured,
      }),
      ...(filters?.brandId && { brandId: filters.brandId }),
      ...(filters?.categoryId && { categoryId: filters.categoryId }),
      ...(filters?.condition && {
        variants: {
          some: {
            condition: filters.condition as ProductCondition,
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

    return data.map((d) => this.toResponse(d as PrismaProductFull));
  }

  async findAllPaginated(
    filters?: ProductFilters,
  ): Promise<{ data: ProductResponse[]; total: number }> {
    const page = Math.max(Number(filters?.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(filters?.limit ?? 20), 1), 100);
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      ...(filters?.isActive !== undefined && { isActive: filters.isActive }),
      ...(filters?.isFeatured !== undefined && {
        isFeatured: filters.isFeatured,
      }),
      ...(filters?.brandId && { brandId: filters.brandId }),
      ...(filters?.categoryId && { categoryId: filters.categoryId }),
      ...(filters?.condition && {
        variants: {
          some: { condition: filters.condition as ProductCondition },
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
      data: rows.map((d) => this.toResponse(d as PrismaProductFull)),
      total,
    };
  }

  async findByVariantId(variantId: string): Promise<Product | null> {
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

      const isSameVariantsStructure =
        existing.variants.length === incomingVariants.length &&
        existing.variants.every((v) =>
          incomingVariants.some((i) => i.getId() === v.id),
        );

      const onlyStockChanged =
        isSameVariantsStructure &&
        incomingVariants.every((incoming) => {
          const current = existing.variants.find(
            (v) => v.id === incoming.getId(),
          );
          if (!current) return false;

          return (
            current.stock !== incoming.getStock() &&
            current.price.toNumber() === incoming.getPrice() &&
            current.sku === incoming.getSku() &&
            current.condition === incoming.getCondition()
          );
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
        } else {
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

      const imagesToDelete = existing.images.filter(
        (img) => !incomingUrls.has(img.url),
      );

      for (const img of imagesToDelete) {
        const publicId = this.cloudinaryService.extractPublicId(img.url);
        if (publicId) {
          try {
            await this.cloudinaryService.deleteImage(publicId);
          } catch (error) {
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

  async updateStock(variantId: string, stock: number) {
    await this.prisma.productVariant.update({
      where: { id: variantId },
      data: {
        stock,
        isActive: stock > 0,
      },
    });
  }

  async existsBySlug(slug: string): Promise<boolean> {
    const count = await this.prisma.product.count({
      where: { slug },
    });

    return count > 0;
  }

  async findBySlug(slug: string): Promise<ProductResponse | null> {
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

    if (!data) return null;

    return this.toResponse(data);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }

  async markProductAsFeatured(productId: string): Promise<boolean> {
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

  async toggleActive(id: string, isActive: boolean): Promise<void> {
    await this.prisma.product.update({
      where: { id },
      data: {
        isActive,
      },
    });
  }

  async toggleVariantStatus(
    variantId: string,
    isActive: boolean,
  ): Promise<void> {
    await this.prisma.productVariant.update({
      where: { id: variantId },
      data: { isActive },
    });
  }

  private toDomain(data: PrismaProductWithRelations): Product {
    return new Product(
      data.id,
      data.name,
      data.slug,
      data.description ?? '',

      data.brandId,
      data.categoryId,

      data.variants.map(
        (v) =>
          new ProductVariant(
            v.id,
            v.sku,
            Number(v.price),
            v.stock,
            v.condition as ProductCondition,
            v.attributes.map(
              (a) => new VariantAttribute(a.id, a.name, a.value),
            ),
            v.isActive,
            v.createdAt,
            v.updatedAt,
          ),
      ),

      data.images.map((img) => new ProductImage(img.id, img.url, img.isMain)),

      data.isActive,
      data.isFeatured,
      data.createdAt,
      data.updatedAt,
    );
  }

  private toResponse(data: PrismaProductFull): ProductResponse {
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
        condition: mapPrismaConditionToDomain(v.condition),
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
}
