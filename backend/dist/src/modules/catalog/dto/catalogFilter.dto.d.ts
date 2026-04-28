import { ProductCondition } from 'src/modules/products/domain/enums/product-condition.enum';
export declare class CatalogFilterDto {
    minPrice?: number;
    maxPrice?: number;
    brandId?: string;
    categoryId?: string;
    condition?: ProductCondition;
    attributes?: Record<string, string>;
    search?: string;
    page?: number;
    limit?: number;
    isFeatured?: boolean;
    sortBy?: 'price' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
}
