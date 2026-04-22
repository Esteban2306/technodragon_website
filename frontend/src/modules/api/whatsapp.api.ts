import { httpClient } from "@/src/core/api/http/http-client";

export interface WhatsAppResponse {
  url: string;
}

export const whatsappApi = {
  getProductUrl(variantId: string) {
    return httpClient.request<WhatsAppResponse>(
      `/whatsapp/product/${variantId}`,
      'GET',
    );
  },

  getCartUrl(cartId: string) {
    return httpClient.request<WhatsAppResponse>(
      `/whatsapp/cart/${cartId}`,
      'GET',
    );
  },
};