

export type CartResponse = {
  id: string;
  items: CartItem[];
  totalItems: number;
};

export type CartItem = {
  id: string;
  variantId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
  brand: string;
  attributes: Record<string, string>;
};

export type Cart = {
  id: string;
  totalItems: number;
  items: CartItem[];
};