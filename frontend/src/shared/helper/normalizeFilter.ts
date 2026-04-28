import { CatalogQueryParams } from '@/src/modules/catalog/api/catalog.api';
import { CatalogFilters } from '@/src/modules/catalog/types/filter.type';

export function normalizeFilters(filters?: CatalogFilters): CatalogQueryParams {
  if (!filters) return {};

  const params: CatalogQueryParams = {};

  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;

  if (filters.minPrice !== undefined) params.minPrice = filters.minPrice;
  if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice;

  if (filters.search) params.search = filters.search;
  if (filters.categoryId) params.categoryId = filters.categoryId;

  if (filters.sortBy) params.sortBy = filters.sortBy;
  if (filters.sortOrder) params.sortOrder = filters.sortOrder;

  if (filters.brandId?.length) {
    params.brandId = filters.brandId.join(',');
  }

  if (filters.condition?.length) {
    params.condition =
      filters.condition.length === 1
        ? filters.condition[0]
        : filters.condition.join(',');
  }

  if (filters.isFeatured !== undefined) {
    params.isFeatured = filters.isFeatured;
  }

  if (filters.attributes) {
    const pairs: string[] = [];

    Object.entries(filters.attributes).forEach(([key, values]) => {
      values.forEach((value) => {
        pairs.push(`${key}:${value}`);
      });
    });

    if (pairs.length) {
      params.attributes = pairs.join(',');
    }
  }

  return params;
}