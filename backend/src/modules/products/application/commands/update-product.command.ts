import { ProductCondition } from "../../domain/enums/product-condition.enum";

export class UpdateProductCommand {
  constructor(
    public readonly productId: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string,
    public readonly brandId: string,
    public readonly categoryId: string,
    
    public readonly variants: {
      id?: string;
      sku: string;
      price: number;
      condition: ProductCondition
      stock: number;
      attributes: {
        name: string;
        value: string;
      }[];
    }[],
    public readonly images: {
      id?: string;
      url: string;
      isMain?: boolean
    }[],
    public readonly isFeatured: boolean
  ) {}
}