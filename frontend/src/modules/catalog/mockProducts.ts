import { ProductPreview } from "@/src/shared/types/catalog.types";
import { ProductCondition } from "@/src/shared/types/product-condition.enum";

export const mockProducts: ProductPreview[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `prod-${i}`,
  slug: `mac-pro-M${i}`,
  name: `Macbook Pro M${i}`,
  brandName: "apple",
  isAvailable: true,
  condition: ProductCondition.NEW,
  images: ['/products/laptop.png'],
  price: 7200000,

  attributes: [
    { name: 'chip', value: 'M3 Pro' },
    { name: 'ram', value: '32GB' },
  ],

  variants: [
    {
      id: `variant-${i}-1`,
      price: 7200000,
      stock: 10,
      image: '/products/laptop.png',
      attributes: [
        { name: 'storage', value: '512GB' },
      ],
    },
    {
      id: `variant-${i}-2`,
      price: 8200000,
      stock: 5,
      image: '/products/laptop.png',
      attributes: [
        { name: 'storage', value: '1TB' },
      ],
    },
  ],
}));