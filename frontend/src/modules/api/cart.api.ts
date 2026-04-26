import { httpClient } from "@/src/core/api/http/http-client";
import { CartResponse } from "@/src/shared/types/cart.types";

export const cartApi = {
  createCart: () => {
    return httpClient.request<CartResponse>('/cart', 'POST');
  },

  getCart: (cartId: string) => {
    return httpClient.request<CartResponse>(`/cart/${cartId}`, 'GET');
  },

  addItem: (cartId: string, data: { variantId: string; quantity: number }) => {
    return httpClient.request<CartResponse>(
      `/cart/${cartId}/items`,
      'POST',
      data
    );
  },

  updateItem: (cartId: string, data: { variantId: string; quantity: number }) => {
    return httpClient.request<CartResponse>(
      `/cart/${cartId}/items`,
      'PATCH',
      data
    );
  },

  removeItem: (cartId: string, variantId: string) => {
    return httpClient.request<void>(
      `/cart/${cartId}/items/${variantId}`,
      'DELETE'
    );
  },

  clearCart: (cartId: string) => {
    return httpClient.request<void>(
      `/cart/${cartId}/items`,
      'DELETE'
    );
  },
};