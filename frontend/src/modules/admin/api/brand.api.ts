import { httpClient } from '@/src/core/api/http/http-client';
import {
  ApiParams,
  Brand,
  BrandQueryParams,
  CreateBrandPayload,
  PaginatedBrands,
  UpdateBrandPayload,
} from '../types/brand.payloads';

export const brandApi = {
  create: (data: CreateBrandPayload) =>
    httpClient.request<Brand>('/brands', 'POST', data, { auth: true }),

  getAll: async (params?: BrandQueryParams): Promise<PaginatedBrands> => {
    const res = await httpClient.request<PaginatedBrands | Brand[]>(
      '/brands',
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

  getAllList: async (params?: BrandQueryParams): Promise<Brand[]> => {
    const res = await httpClient.request<PaginatedBrands | Brand[]>(
      '/brands',
      'GET',
      undefined,
      { params: { limit: 100, ...params } as ApiParams },
    );

    if (Array.isArray(res)) return res;

    return res?.data ?? [];
  },

  getById: (id: string) => httpClient.request<Brand>(`/brands/${id}`, 'GET'),

  getBySlug: (slug: string) =>
    httpClient.request<Brand>(`/brands/slug/${slug}`, 'GET'),

  update: (id: string, data: UpdateBrandPayload) =>
    httpClient.request<void>(`/brands/${id}`, 'PATCH', data, {
      auth: true,
    }),

  activate: (id: string) =>
    httpClient.request<void>(`/brands/${id}/activate`, 'PATCH', undefined, {
      auth: true,
    }),

  deactivate: (id: string) =>
    httpClient.request<void>(`/brands/${id}/deactivate`, 'PATCH', undefined, {
      auth: true,
    }),

  delete: (id: string) =>
    httpClient.request<void>(`/brands/${id}`, 'DELETE', undefined, {
      auth: true,
    }),
};
