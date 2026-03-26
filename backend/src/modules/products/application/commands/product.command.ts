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