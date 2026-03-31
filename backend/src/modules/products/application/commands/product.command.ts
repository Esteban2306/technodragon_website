import { ProductCondition } from "../../domain/enums/product-condition.enum";

export class CreateProductCommand {
  constructor(
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string,
    public readonly brandId: string,
    public readonly categoryId: string,
    public readonly variants: {
      sku: string;
      price: number;
      stock: number;
      condition: ProductCondition;
      attributes: {
        name: string;
        value: string;
      }[];
    }[],
    public readonly images: {
      url: string;
    }[]
  ) {}
}