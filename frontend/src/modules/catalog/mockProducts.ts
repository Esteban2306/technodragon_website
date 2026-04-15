import { ProductPreview } from "@/src/shared/types/catalog.types";
import { ProductCondition } from "@/src/shared/types/product-condition.enum";

export const mockProducts: ProductPreview[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `prod-${i}`,
  slug: `mac-pro-M${i}`,
  name: `Macbook Pro M${i}`,
  price: 7200000,
  brandName: "apple",
  isAvailable: true,
  condition: ProductCondition.NEW,
  images: ['/products/laptop.png'],
  attributes: [
    { name: 'chip', value: 'M3 Pro' },
    { name: 'ram', value: '32GB' },
    { name: 'storage', value: '512GB' },
  ],
}));