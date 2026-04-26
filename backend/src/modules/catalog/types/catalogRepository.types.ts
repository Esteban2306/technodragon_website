import { CatalogItem } from "../domain/entities/catalog.entity";
import { ProductCondition } from "src/modules/products/domain/enums/product-condition.enum";
import { PaginatedResult } from "./pagination.types";

export interface CatalogRepository {
    findAll(filters: CatalogFilters): Promise<PaginatedResult<CatalogItem>>
    findById(id: string): Promise<CatalogItem | null>
}

export interface CatalogFilters {
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

  sortBy?: "price" | "createdAt";
  sortOrder?: "asc" | "desc";
}