import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { PrismaCatalogRepository } from '../../infrastructure/repositories/prisma-catalog.repository';
import { CatalogItem } from '../../domain/entities/catalog.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { EventTypes } from 'src/infrastructure/events/event.types';
import { mapPrismaConditionToDomain } from '../../helpers/catalog-condition.mapper';

@Injectable()
export class catalogListener {
  constructor(
    private readonly prisma: PrismaService,
    private readonly catalogRepository: PrismaCatalogRepository,
  ) {}

  @OnEvent(EventTypes.PRODUCT_CREATED)
  async handleProductCreatedEvent(payload: { productId: string}) {
    await this.syncProductToCatalog(payload.productId)
  }

  @OnEvent(EventTypes.PRODUCT_UPDATED)
  async handleProductUpdatedEvent(payload: { productId: string}) {
    await this.syncProductToCatalog(payload.productId)
  }

  
  @OnEvent(EventTypes.STOCK_UPDATED)
  async handleStockUpdatedEvent(payload: { variantId: string, stock: number }) {
    await this.catalogRepository.updateStock(payload.variantId, payload.stock)
  }

  private async syncProductToCatalog(productId: string) {
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

    if (!product) return;

    const items: CatalogItem[] = product.variants.map((variant) => {

      const attributesMap: Record<string, string[]> = {};

      variant.attributes.forEach(attr => {
        if (!attributesMap[attr.name]) {
          attributesMap[attr.name] = [];
        }
        attributesMap[attr.name].push(attr.value);
      });

      return new CatalogItem(
        crypto.randomUUID(), 
        product.id,
        variant.id,

        product.name,
        product.slug,

        product.brandId,
        product.brand.name,

        product.categoryId,
        product.category.name,

        Number(variant.price),
        variant.stock,
        mapPrismaConditionToDomain(variant.condition),

        attributesMap,
        product.images.map(img => img.url),

        variant.stock > 0,

        new Date(),
        new Date()
      );
    });

    await this.catalogRepository.upsertMany(items);
  }
}

