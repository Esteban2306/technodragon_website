import { CatalogItem } from "@/src/modules/catalog/types/catalog-item.type";
import { ProductPreview, ProductVariant } from '@/src/shared/types/catalog.types';
import { mapAttributesToArray } from './attribute.mapper';

export function mapCatalogToPreview(
  items: CatalogItem[]
): ProductPreview[] {
  const map = new Map<string, ProductPreview>();

  for (const item of items) {
    const existing = map.get(item.productId);

    const variant: ProductVariant = {
      id: item.variantId,
      price: item.price,
      stock: item.stock,
      image: item.images?.[0],
      attributes: mapAttributesToArray(item.attributes),
    };

    if (!existing) {
      map.set(item.productId, {
        id: item.productId,
        slug: item.slug,
        name: item.name,

        brandId: item.brandId,
        brandName: item.brandName ?? 'Sin marca',

        categoryId: item.categoryId,
        categoryName: item.categoryName ?? 'Sin categoría',

        condition: item.condition,
        images: item.images ?? [],

        attributes: mapAttributesToArray(item.attributes),

        variants: [variant],

        isAvailable: item.stock > 0,
      });
    } else {
      existing.variants.push(variant);

      if (item.stock > 0) {
        existing.isAvailable = true;
      }
    }
  }

  return Array.from(map.values());
}