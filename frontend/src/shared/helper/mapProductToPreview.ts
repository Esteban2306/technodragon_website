import { ProductPreview } from "../types/catalog.types";
import { ProductDetail } from "../types/product.types";

export function mapProductToPreview(
  products: ProductDetail[]
): ProductPreview[] {
  return products.map((product) => {
    const activeVariants = product.variants.filter(v => v.isActive);

    const variants = activeVariants.map((v) => ({
      id: v.id,
      price: v.price,
      stock: v.stock,
      isFeatured: product.isFeatured,
      image: product.images?.[0]?.url,
      attributes: v.attributes.map((a) => ({
        name: a.name,
        value: a.value,
      })),
    }));

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,

      isFeatured: product.isFeatured,

      brandId: product.brand.id,
      brandName: product.brand.name,

      categoryId: product.category.id,
      categoryName: product.category.name,

      condition: activeVariants[0]?.condition,

      images: product.images.map((img) => img.url),

      variants,

      attributes: variants.flatMap(v => v.attributes),

      isAvailable: activeVariants.some((v) => v.stock > 0),
    };
  });
}