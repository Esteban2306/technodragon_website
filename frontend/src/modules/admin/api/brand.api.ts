import { httpClient } from '@/src/core/api/http/http-client';
import {
  Brand,
  BrandQueryParams,
  CreateBrandPayload,
  PaginatedBrands,
  UpdateBrandPayload,
} from '../types/brand.payloads';

export const brandApi = {
  create: (data: CreateBrandPayload) =>
    httpClient.request<Brand>('/brands', 'POST', data, { auth: true }),

  getAll: (params?: BrandQueryParams) =>
    httpClient.request<PaginatedBrands>('/brands', 'GET', {
      params,
    }),

  getAllList: (params?: BrandQueryParams) =>
    httpClient
      .request<PaginatedBrands>('/brands', 'GET', undefined, {
        params: { limit: 100, ...params },
      })
      .then((res) => res.data),

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
