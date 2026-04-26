import { httpClient } from '@/src/core/api/http/http-client';
import {
  Brand,
  CreateBrandPayload,
  UpdateBrandPayload,
} from '../types/brand.payloads';

export const brandApi = {
  create: (data: CreateBrandPayload) =>
    httpClient.request<Brand>('/brands', 'POST', data, { auth: true }),

  getAll: (params?: {
    search?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }) => httpClient.request<Brand[]>('/brands', 'GET', undefined, { params }),

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
