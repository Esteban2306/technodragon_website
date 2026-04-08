import { CatalogItem } from '../domain/entities/catalog.entity';
import {
  ProductForCatalog,
  ProductVariantForCatalog,
  VariantAttributeForCatalog,
} from '../types/mapper.types';

export class CatalogItemMapper {
  static fromProduct(product: ProductForCatalog): CatalogItem[] {
    if (!product) throw new Error('Product data is required');

    if (!product.variants || product.variants.length === 0)
      throw new Error('Product must have at least one variant');

    return product.variants.map((variant) =>
      this.mapVariantToCatalogItem(product, variant),
    );
  }

  private static mapVariantToCatalogItem(
    product: ProductForCatalog,
    variant: ProductVariantForCatalog,
  ): CatalogItem {
    return new CatalogItem(
      this.buildId(product.id, variant.id),

      product.id,
      variant.id,

      product.name,
      product.slug,
      product.brand?.id ?? '',
      product.brand?.name ?? '',
      product.category?.id ?? '',
      product.category?.name ?? '',

      variant.price,
      variant.stock,
      variant.condition,

      this.mapAttributes(variant.attributes),
      this.mapImages(product.images.map((url) => ({ url }))),
      this.mapIsActivate(product, variant),

      new Date(),
      new Date(),
    );
  }

  private static mapAttributes(
    attributes: VariantAttributeForCatalog[],
  ): Record<string, string[]> {
    if (!attributes || attributes.length === 0) return {};

    const result: Record<string, string[]> = {};

    for (const attr of attributes) {
      if (!result[attr.name]) {
        result[attr.name] = [];
      }

      result[attr.name].push(attr.value);
    }

    return result;
  };

  private static mapImages(images: { url: string }[]): string[] {
    if (!images || images.length === 0) return [];

    return images.map((img) => img.url);
  }

  private static mapIsActivate(
    product: ProductForCatalog,
    variant: ProductVariantForCatalog,
  ): boolean {
    return product.isActive && variant.isActive && variant.stock > 0;
  }
  private static buildId(productId: string, variantId: string): string {
    return `${productId}-${variantId}`;
  }
}
