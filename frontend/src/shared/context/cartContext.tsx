'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  variantId: string;

  productId?: string;

  name: string;
  image: string;
  price: number;

  quantity: number;

  variantLabel?: string;
}

type CartContextType = {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, delta: number) => void;

  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.variantId === newItem.variantId,
      );

      if (existing) {
        return prev.map((item) =>
          item.variantId === newItem.variantId
            ? {
                ...item,

                quantity: item.quantity + newItem.quantity,

                price: newItem.price,
                name: newItem.name,
                image: newItem.image,
                variantLabel: newItem.variantLabel,
                productId: newItem.productId,
              }
            : item,
        );
      }

      return [...prev, newItem];
    });
  };

  const updateQuantity = (variantId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.variantId === variantId
            ? {
                ...item,
                quantity: Math.max(0, item.quantity + delta),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (variantId: string) => {
    setItems((prev) => prev.filter((item) => item.variantId !== variantId));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
