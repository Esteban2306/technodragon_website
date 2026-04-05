export type ProductMessageInput = {
  name: string;
  variant: string;
  price: number;
};

export type CartItemMessageInput = {
  name: string;
  variant: string;
  price: number;
  quantity: number;
};

export type CartMessageInput = {
  items: CartItemMessageInput[];
};