import { ProductCondition } from "../domain/enums/product-condition.enum";

export class CreateProductDto {
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  brandId: string;

  isFeatured?: boolean;

  variants: {
    sku: string;
    price: number;
    stock: number;
    condition: ProductCondition;
    attributes: {
      name: string;
      value: string;
    }[];
  }[];

  images: {
    url: string;
    isMain?: boolean; 
  }[];
}