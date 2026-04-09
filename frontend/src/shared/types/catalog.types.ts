import { ProductCondition } from "./product-condition.enum";

export type CatalogAttribute = {
  name: string;
  value: string;
};

export type ProductPreview = {
  id: string;
  slug: string;

  name: string;
  brandName: string;

  price: number;
  condition: ProductCondition;

  attributes: CatalogAttribute[];
  images: string[];

  isAvailable: boolean;
};