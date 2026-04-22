import { useMutation, useQueryClient } from '@tanstack/react-query';
import { whatsappApi } from '../api/whatsapp.api';
import { whatsappKeys } from './whatsapp.keys';

export const useOpenCartWhatsApp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartId: string) => {
      const cached = queryClient.getQueryData<{ url: string }>(
        whatsappKeys.cart(cartId),
      );

      if (cached) return cached.url;

      const res = await whatsappApi.getCartUrl(cartId);
      return res.url;
    },

    onSuccess: (url, cartId) => {
      queryClient.setQueryData(whatsappKeys.cart(cartId), { url });

      window.open(url, '_blank');
    },
  });
};