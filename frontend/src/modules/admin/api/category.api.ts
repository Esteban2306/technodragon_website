import { httpClient } from '@/src/core/api/http/http-client';
import {
  Category,
  CategoryQueryParams,
  CreateCategoryPayload,
  PaginatedCategories,
  UpdateCategoryPayload,
} from '../types/category.payloads';
import { ApiParams } from '../types/brand.payloads';

export const categoryApi = {
  create: (data: CreateCategoryPayload) =>
    httpClient.request<Category>('/categories', 'POST', data, {
      auth: true,
    }),

  getAll: async (
    params?: CategoryQueryParams,
  ): Promise<PaginatedCategories> => {
    const res = await httpClient.request<PaginatedCategories | Category[]>(
      '/categories',
      'GET',
      undefined,
      {
        params: params as Record<string, string | number | boolean | undefined>,
      },
    );

    if (Array.isArray(res)) {
      return {
        data: res,
        meta: { total: res.length, page: 1, limit: res.length, totalPages: 1 },
      };
    }

    return res;
  },

  getAllList: async (params?: CategoryQueryParams): Promise<Category[]> => {
    const res = await httpClient.request<PaginatedCategories | Category[]>(
      '/categories',
      'GET',
      undefined,
      { params: { limit: 100, ...params } as ApiParams },
    );

    if (Array.isArray(res)) return res;

    return res?.data ?? [];
  },

  getTree: () => httpClient.request<Category[]>('/categories/tree', 'GET'),

  getById: (id: string) =>
    httpClient.request<Category>(`/categories/${id}`, 'GET'),

  getBySlug: (slug: string) =>
    httpClient.request<Category>(`/categories/slug/${slug}`, 'GET'),

  update: (id: string, data: UpdateCategoryPayload) =>
    httpClient.request<void>(`/categories/${id}`, 'PATCH', data, {
      auth: true,
    }),

  delete: (id: string) =>
    httpClient.request<void>(`/categories/${id}`, 'DELETE', undefined, {
      auth: true,
    }),
};
