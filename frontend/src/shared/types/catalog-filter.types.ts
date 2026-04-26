import { ProductCondition } from "./product-condition.enum";

export type CatalogFilter = {
  minPrice?: number;
  maxPrice?: number;

  brandId?: string[];
  categoryId?: string;

  condition?: ProductCondition[];

  attributes?: Record<string, string[]>;

  search?: string;

  page?: number;
  limit?: number;

  sortBy?: 'price' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
};