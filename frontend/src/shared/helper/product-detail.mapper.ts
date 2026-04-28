import { CatalogItem } from "@/src/modules/catalog/types/catalog-item.type";
import { ProductDetail, ProductVariantDetail } from "@/src/shared/types/product.types";
import { ProductCondition } from "@/src/shared/types/product-condition.enum";

export function mapCatalogItemToProductDetail(item: CatalogItem): ProductDetail {
  const variant: ProductVariantDetail = {
    id: item.variantId,
    sku: item.variantId, 
    price: item.price,
    stock: item.stock,
    isActive: item.isActive,
    condition: item.condition as ProductCondition,
    attributes: Object.entries(item.attributes).flatMap(([name, values]) =>
      values.map((value) => ({
        id: `${name}-${value}`, 
        name,
        value,
      })),
    ),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    id: item.productId,
    slug: item.slug,
    name: item.name,
    description: item.description ?? "",
    condition: item.condition as ProductCondition,

    brand: {
        id: item.brandId,
        name: item.brandName
    },

    category: {
        id: item.categoryId,
        name: item.categoryName
    },

    images: (item.images ?? []).map((url, idx) => ({
      id: `${item.productId}-img-${idx}`,
      url,
      isFeatured: idx === 0,
    })),

    variants: [variant],

    isActive: item.isActive,
    isFeatured: false,

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}