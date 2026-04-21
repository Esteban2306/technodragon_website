import { httpClient } from "@/src/core/api/http/http-client";
import {
  CreateProductPayload,
  UpdateProductPayload,
  UpdateBasicProductPayload,
  ProductFilters,
} from "../types/product.payloads";
import { ProductDetail } from "@/src/shared/types/product.types";

export const productApi = {
  getAll: (params?: ProductFilters) =>
    httpClient.request<ProductDetail[]>("/products", "GET", undefined, {
      params,
    }),

  getById: (id: string) =>
    httpClient.request<ProductDetail>(`/products/${id}`, "GET"),

  create: (data: CreateProductPayload) =>
    httpClient.request<void>("/products", "POST", data, { auth: true }),

  update: (id: string, data: UpdateProductPayload) =>
    httpClient.request<void>(`/products/${id}`, "PUT", data, {
      auth: true,
    }),

  updateBasic: (id: string, data: UpdateBasicProductPayload) =>
    httpClient.request<void>(`/products/${id}/basic`, "PUT", data, {
      auth: true,
    }),

  updateStock: (variantId: string, stock: number) =>
    httpClient.request<void>(
      `/products/variants/${variantId}/stock`,
      "PUT",
      { stock },
      { auth: true }
    ),

  markAsFeatured: (id: string) =>
    httpClient.request<void>(
      `/products/${id}/featured`,
      "PATCH",
      undefined,
      { auth: true }
    ),

  delete: (id: string) =>
    httpClient.request<void>(`/products/${id}`, "DELETE", undefined, {
      auth: true,
    }),
};