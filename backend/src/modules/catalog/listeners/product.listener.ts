import { Inject, Injectable } from '@nestjs/common';
import { PrismaCatalogRepository } from '../infrastructure/repositories/prisma-catalog.repository';
import { CATALOG_REPOSITORY } from '../helpers/catalog-repository.token';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  EventPayloadMap,
  EventTypes,
} from 'src/infrastructure/events/event.types';
import { CatalogItemMapper } from '../helpers/catalog-item-mapper';
import { mapPrismaConditionToDomain } from '../helpers/catalog-condition.mapper';
import type { CatalogRepository } from '../domain/repositories/catalog.repository';

@Injectable()
export class ProductCreatedListener {
  constructor(
    private prisma: PrismaService,
    @Inject(CATALOG_REPOSITORY)
    private catalogPrisma: PrismaCatalogRepository,
  ) {}

  async handle(event: EventPayloadMap[typeof EventTypes.PRODUCT_CREATED]) {
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
        condition: mapPrismaConditionToDomain(variant.condition),
        isActive: variant.isActive,
        attributes: variant.attributes.map((attr) => ({
          name: attr.name,
          value: attr.value,
        })),
      })),
    };

    const catalogItems = CatalogItemMapper.fromProduct(productForCatalog);

    await this.catalogPrisma.upsertMany(catalogItems);
  }
}

@Injectable()
export class ProductUpdatedListener {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CATALOG_REPOSITORY)
    private readonly catalogRepository: CatalogRepository,
  ) {}

  async handle(event: EventPayloadMap[typeof EventTypes.PRODUCT_UPDATED]) {
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
        condition: mapPrismaConditionToDomain(variant.condition),
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

    const catalogItems = CatalogItemMapper.fromProduct(productForCatalog);

    await this.catalogRepository.upsertMany(catalogItems);
  }
}

@Injectable()
export class ProductDeletedListener {
  constructor(
    @Inject(CATALOG_REPOSITORY)
    private readonly catalogRepository: CatalogRepository,
  ) {}

  async handle(event: EventPayloadMap[typeof EventTypes.PRODUCT_DELETED]) {
    const { productId } = event;

    if (!productId) {
      throw new Error('ProductDeleted event without productId');
    }

    await this.catalogRepository.deleteByProductId(productId);
  }
}

@Injectable()
export class ProductUpdateStockListener {
  constructor(
    @Inject(CATALOG_REPOSITORY)
    private readonly catalogRepository: CatalogRepository,
  ) {}

  async handle(event: EventPayloadMap[typeof EventTypes.STOCK_UPDATED]) {
    const { variantId, stock } = event;

    if (!variantId) {
      throw new Error('StockUpdated event without variantId');
    }

    if (stock === undefined || stock === null) {
      throw new Error('StockUpdated event without stock value');
    }

    await this.catalogRepository.updateStock(variantId, stock);
  }
}

@Injectable()
export class StockOutOfStockListener {
  constructor(
    @Inject(CATALOG_REPOSITORY)
    private readonly catalogRepository: CatalogRepository,
  ) {}

  async handle(event: EventPayloadMap[typeof EventTypes.STOCK_OUT_OF_STOCK]) {
    await this.catalogRepository.updateStock(event.variantId, 0);
  }
}
