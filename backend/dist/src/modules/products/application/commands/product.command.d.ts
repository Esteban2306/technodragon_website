import { ProductCondition } from "../../domain/enums/product-condition.enum";
export declare class CreateProductCommand {
    readonly name: string;
    readonly slug: string;
    readonly description: string;
    readonly brandId: string;
    readonly categoryId: string;
    readonly variants: {
        sku: string;
        price: number;
        stock: number;
        condition: ProductCondition;
        attributes: {
            name: string;
            value: string;
        }[];
    }[];
    readonly images: {
        url: string;
        isMain?: boolean;
    }[];
    readonly isFeatured: boolean;
    constructor(name: string, slug: string, description: string, brandId: string, categoryId: string, variants: {
        sku: string;
        price: number;
        stock: number;
        condition: ProductCondition;
        attributes: {
            name: string;
            value: string;
        }[];
    }[], images: {
        url: string;
        isMain?: boolean;
    }[], isFeatured: boolean);
}
