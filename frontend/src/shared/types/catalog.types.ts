import { ProductCondition } from "./product-condition.enum";

export type CatalogAttribute = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string; 
  price: number;
  image?: string;
  stock: number;
  attributes: CatalogAttribute[];
};

export type ProductPreview = {
  id: string; 
  slug: string;

  name: string;

  brandId: string; 
  brandName: string;

  condition: ProductCondition;

  categoryId: string;
  categoryName: string;

  images: string[];

  attributes: CatalogAttribute[];

  variants: ProductVariant[]; 

  isAvailable: boolean;
};