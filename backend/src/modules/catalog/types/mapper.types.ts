import { ProductCondition } from "src/modules/products/domain/enums/product-condition.enum";

export interface ProductForCatalog {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
    isFeatured: boolean;


    brand?: {
        id: string;
        name: string;
    };

    category?: {
        id: string;
        name: string;
    };

    images: string[]

    variants: ProductVariantForCatalog[];
}

export interface ProductVariantForCatalog {
    id: string;
    price: number;
    stock: number;
    condition: ProductCondition;
    isActive: boolean;

    attributes: VariantAttributeForCatalog[];
}

export interface VariantAttributeForCatalog {
    name: string;
    value: string;
}