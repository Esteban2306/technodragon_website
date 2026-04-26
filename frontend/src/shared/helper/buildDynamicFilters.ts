import { ProductPreview } from "../types/catalog.types";

export function buildDynamicFilters(products: ProductPreview[]) {
  const attributes: Record<string, Set<string>> = {};
  const brands = new Set<string>();

  // 🔥 NUEVO: mapa interno
  const brandMap: Record<string, string> = {};

  for (const product of products) {
    // seguimos usando brandName para UI
    brands.add(product.brandName);

    // 🔥 guardamos relación real
    if (product.brandName && product.brandId) {
      brandMap[product.brandName] = product.brandId;
    }

    for (const attr of product.attributes) {
      if (!attributes[attr.name]) {
        attributes[attr.name] = new Set();
      }
      attributes[attr.name].add(attr.value);
    }
  }

  return {
    brands: Array.from(brands), // 👈 NO ROMPE TU UI
    brandMap, // 🔥 NUEVO (CLAVE)
    attributes: Object.fromEntries(
      Object.entries(attributes).map(([key, set]) => [
        key,
        Array.from(set),
      ]),
    ),
  };
}