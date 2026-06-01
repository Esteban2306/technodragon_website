import { httpClient } from '@/src/core/api/http/http-client';
import {
  Category,
  CategoryQueryParams,
  CreateCategoryPayload,
  PaginatedCategories,
  UpdateCategoryPayload,
} from '../types/category.payloads';

export const categoryApi = {
  create: (data: CreateCategoryPayload) =>
    httpClient.request<Category>('/categories', 'POST', data, {
      auth: true,
    }),

  getAll: (params?: CategoryQueryParams) =>
    httpClient.request<PaginatedCategories>('/categories', 'GET', {
      params,
    }),

  getAllList: (params?: CategoryQueryParams) =>
    httpClient
      .request<PaginatedCategories>('/categories', 'GET', undefined, {
        params: { limit: 100, ...params },
      })
      .then((res) => res.data),

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
