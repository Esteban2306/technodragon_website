import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  CatalogFilters,
  CatalogRepository,
} from '../../types/catalogRepository.types';
import { CatalogItem } from '../../domain/entities/catalog.entity';
import { Prisma } from '@prisma/client';
import { mapPrismaConditionToDomain } from '../../helpers/catalog-condition.mapper';
import { mapJsonToAttributes } from '../../helpers/catalog-attributes.mapper';
import { PaginatedResult } from '../../types/pagination.types';

@Injectable()
export class PrismaCatalogRepository implements CatalogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async upsertMany(items: CatalogItem[]): Promise<void> {
    if (!items.length) return;

    await this.prisma.$transaction(
      items.map((item) => {
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
            updatedAt: new Date(),
          },
          create: data,
        });
      }),
    );
  }

  async deleteByProductId(productId: string): Promise<void> {
    await this.prisma.catalogItem.updateMany({
      where: { productId },
      data: { isActive: false },
    });
  }

  async updateStock(variantId: string, stock: number): Promise<void> {
    await this.prisma.catalogItem.updateMany({
      where: { variantId },
      data: {
        stock,
        isActive: stock > 0,
      },
    });
  }

  async updateManyByBrand(
    brandId: string,
    data: { brandName?: string; isActive?: boolean },
  ): Promise<void> {
    await this.prisma.catalogItem.updateMany({
      where: { brandId },
      data,
    });
  }

  async updateManyByCategory(
    categoryId: string,
    data: { categoryName?: string },
  ): Promise<void> {
    await this.prisma.catalogItem.updateMany({
      where: { categoryId },
      data,
    });
  }

  async findAll(
    filters: CatalogFilters,
  ): Promise<PaginatedResult<CatalogItem>> {
    const {
      minPrice,
      maxPrice,
      brandId,
      categoryId,
      condition,
      attributes,
      search,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filters;

    const where: Prisma.CatalogItemWhereInput = {
      isActive: true,
    };

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
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

    if (attributes) {
      where.AND = Object.entries(attributes).map(([key, values]) => ({
        attributes: {
          path: [key],
          array_contains: values,
        },
      }));
    }

    const skip = (page - 1) * limit;

    const orderBy: Prisma.CatalogItemOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [results, total] = await this.prisma.$transaction([
      this.prisma.catalogItem.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.catalogItem.count({ where }),
    ]);

    const data = results.map((item) =>
      CatalogItem.fromPersistence({
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

        condition: mapPrismaConditionToDomain(item.condition),

        attributes: mapJsonToAttributes(item.attributes),

        images: (item.images ?? []) as string[],

        isActive: item.isActive,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }),
    );

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async findById(id: string): Promise<CatalogItem | null> {
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

    return CatalogItem.fromPersistence({
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

      condition: mapPrismaConditionToDomain(item.condition),

      attributes: mapJsonToAttributes(item.attributes),

      images: (item.images ?? []) as string[],

      isActive: item.isActive,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }
}
