import { CatalogItem } from "../domain/entities/catalog.entity";
import { ProductCondition } from "src/modules/products/domain/enums/product-condition.enum";

export interface CatalogRepository {
    findAll(filters: CatalogFilters): Promise<CatalogItem[]>
    findById(id: string): Promise<CatalogItem | null>
}

export interface CatalogFilters {
    minPrice: number;
    maxPrice: number;

    brandId: string;
    categoryId: string

    condition: ProductCondition;

    attributes: string;

    search: string;

    page: number;
    limit: number; 

    sortBy?: "price" | "createdAt"
    sortorder?: "asc" | "desc"
}