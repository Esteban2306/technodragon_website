import { ProductCondition } from '../domain/enums/product-condition.enum';
declare class UpdateAttributeDto {
    name: string;
    value: string;
}
declare class UpdateVariantDto {
    id?: string;
    sku: string;
    price: number;
    stock: number;
    condition: ProductCondition;
    attributes: UpdateAttributeDto[];
}
declare class UpdateImageDto {
    id?: string;
    url: string;
    isMain?: boolean;
}
export declare class UpdateProductDto {
    name: string;
    slug: string;
    description: string;
    categoryId: string;
    brandId: string;
    isFeatured?: boolean;
    variants: UpdateVariantDto[];
    images: UpdateImageDto[];
}
export {};
