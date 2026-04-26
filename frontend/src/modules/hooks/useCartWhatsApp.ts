import { useQuery } from '@tanstack/react-query';
import { whatsappApi } from '../api/whatsapp.api';
import { whatsappKeys } from './whatsapp.keys';

export const useCartWhatsApp = (cartId?: string) => {
  return useQuery({
    queryKey: cartId
      ? whatsappKeys.cart(cartId)
      : ['whatsapp', 'cart', 'disabled'],

    queryFn: () => {
      if (!cartId) throw new Error('cartId requerido');
      return whatsappApi.getCartUrl(cartId);
    },

    enabled: !!cartId,

    staleTime: 1000 * 60 * 3,
    gcTime: 1000 * 60 * 15,

    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};