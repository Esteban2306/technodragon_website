import { CatalogFilters } from "../../types/catalogRepository.types";
import { PaginatedResult } from "../../types/pagination.types";
import { CatalogItem } from "../entities/catalog.entity";

export interface CatalogRepository {

    upsertMany(items: CatalogItem[]): Promise<void>;

    deleteByProductId(productId: string): Promise<void>;

    updateStock(variantId: string, stock: number): Promise<void>;

    updateManyBrand(brandId: string, data: {
        brandName: string,
        isActive: boolean,
    }): Promise<void>

    updateManyByCategory(categoryId: string, data: {
        categoryName: string,
    }): Promise<void>

    findAll(filters: CatalogFilters): Promise<PaginatedResult<CatalogItem>>

    findById(id: string): Promise<CatalogItem | null>
}