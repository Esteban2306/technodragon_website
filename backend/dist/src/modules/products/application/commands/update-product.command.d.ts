import { ProductCondition } from "../../domain/enums/product-condition.enum";
export declare class UpdateProductCommand {
    readonly productId: string;
    readonly name: string;
    readonly slug: string;
    readonly description: string;
    readonly brandId: string;
    readonly categoryId: string;
    readonly variants: {
        id?: string;
        sku: string;
        price: number;
        condition: ProductCondition;
        stock: number;
        attributes: {
            name: string;
            value: string;
        }[];
    }[];
    readonly images: {
        id?: string;
        url: string;
        isMain?: boolean;
    }[];
    readonly isFeatured: boolean;
    constructor(productId: string, name: string, slug: string, description: string, brandId: string, categoryId: string, variants: {
        id?: string;
        sku: string;
        price: number;
        condition: ProductCondition;
        stock: number;
        attributes: {
            name: string;
            value: string;
        }[];
    }[], images: {
        id?: string;
        url: string;
        isMain?: boolean;
    }[], isFeatured: boolean);
}
