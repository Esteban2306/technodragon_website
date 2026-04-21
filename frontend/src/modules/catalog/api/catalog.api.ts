import { httpClient } from '@/src/core/api/http/http-client';
import { CatalogFilters } from '../types/filter.type';
import { PaginatedResponse } from '../types/pagination.types';
import { CatalogItem } from '../types/catalog-item.type';
import { normalizeFilters } from '@/src/shared/helper/normalizeFilter';

export type CatalogQueryParams = Record<
  string,
  string | number | boolean | undefined
>;

export const catalogApi = {
  getAll: (filters?: CatalogFilters, signal?: AbortSignal) => {
    const params: CatalogQueryParams = normalizeFilters(filters);

    return httpClient.request<PaginatedResponse<CatalogItem>>(
      '/catalog',
      'GET',
      undefined,
      {
        signal,
        params,
      },
    );
  },

  getById: (id: string) =>
    httpClient.request<CatalogItem>(`/catalog/${id}`, 'GET'),
};
