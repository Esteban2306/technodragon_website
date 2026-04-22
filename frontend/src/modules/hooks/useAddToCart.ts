import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '../api/cart.api';

const CART_KEY = 'cartId';

function getCartId() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(CART_KEY);
}

function setCartId(id: string) {
  localStorage.setItem(CART_KEY, id);
}

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      variantId,
      quantity = 1,
    }: {
      variantId: string;
      quantity?: number;
    }) => {
      let cartId = getCartId();

      if (!cartId) {
        const cart = await cartApi.createCart();
        cartId = cart.id;
        setCartId(cartId);
      }

      if (!cartId) {
        throw new Error('CartId no disponible');
      }

      return cartApi.addItem(cartId, { variantId, quantity });
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['cart', data.id],
      });
    },

    onError: (error) => {
      console.error('Error al añadir al carrito:', error);
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cartId,
      variantId,
      quantity,
    }: {
      cartId: string;
      variantId: string;
      quantity: number;
    }) => {
      return cartApi.updateItem(cartId, { variantId, quantity });
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['cart', data.id],
      });
    },

    onError: (error) => {
      console.error('Error al actualizar el carrito:', error);
    },
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      cartId,
      variantId,
    }: {
      cartId: string;
      variantId: string;
    }) => {
      await cartApi.removeItem(cartId, variantId);
      return { cartId };
    },

    onSuccess: ({ cartId }) => {
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
    },
  });
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId: string) => cartApi.clearCart(cartId),

    onSuccess: (_, cartId) => {
      queryClient.invalidateQueries({ queryKey: ['cart', cartId] });
    },
  });
};
