import { ProductCondition } from "@/src/shared/types/product-condition.enum";

export type CatalogItem = {
  id: string;

  productId: string;
  variantId: string;

  slug: string;
  name: string;
  description?: string;

  price: number;
  stock: number;

  brandName: string;
  brandId: string;

  categoryId: string;
    
  categoryName: string

  images: string[];

  condition: ProductCondition;

  attributes: Record<string, string[]>;

  isActive: boolean;
};