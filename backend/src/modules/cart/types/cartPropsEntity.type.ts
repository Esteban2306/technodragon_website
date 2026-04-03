import { CartItem } from "../domain/entities/cartItem.entity";

export interface CartItemProps {
  id: string;
  variantId: string;
  quantity: number;
}

export interface CartProps {
  id: string;
  items: CartItem[];
  isActive: boolean
  createdAt: Date;
  updatedAt: Date;
}