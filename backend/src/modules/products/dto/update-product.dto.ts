import { ProductCondition } from "../domain/enums/product-condition.enum";

export class UpdateProductDto {
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  brandId: string;

  isFeatured?: boolean;

  variants: {
    id?: string;
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
    id?: string;
    url: string;
    isMain?: boolean;
  }[];
}