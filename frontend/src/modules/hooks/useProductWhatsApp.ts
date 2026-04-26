import { useQuery } from '@tanstack/react-query';
import { whatsappApi } from '../api/whatsapp.api';
import { whatsappKeys } from './whatsapp.keys';

export const useProductWhatsApp = (variantId?: string) => {
  return useQuery({
    queryKey: variantId
      ? whatsappKeys.product(variantId)
      : ['whatsapp', 'product', 'disabled'],

    queryFn: () => {
      if (!variantId) throw new Error('variantId requerido');
      return whatsappApi.getProductUrl(variantId);
    },

    enabled: !!variantId,

    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,

    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};