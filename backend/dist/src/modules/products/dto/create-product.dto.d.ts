import { ProductCondition } from '../domain/enums/product-condition.enum';
declare class AttributeDto {
    name: string;
    value: string;
}
declare class VariantDto {
    sku: string;
    price: number;
    stock: number;
    condition: ProductCondition;
    attributes: AttributeDto[];
}
declare class ImageDto {
    url: string;
    isMain?: boolean;
}
export declare class CreateProductDto {
    name: string;
    slug: string;
    description: string;
    categoryId: string;
    brandId: string;
    isFeatured?: boolean;
    variants: VariantDto[];
    images: ImageDto[];
}
export {};
