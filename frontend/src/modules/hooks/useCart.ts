import { useQuery } from '@tanstack/react-query';
import { cartApi } from '../api/cart.api';
import { Cart } from '@/src/shared/types/cart.types';

const CART_KEY = 'cartId';

function getCartId() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CART_KEY);
}

export const useCart = () => {
  const cartId = getCartId();

  return useQuery<Cart | null>({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      if (!cartId) return null;
      return cartApi.getCart(cartId);
    },
    enabled: !!cartId,
  });
};