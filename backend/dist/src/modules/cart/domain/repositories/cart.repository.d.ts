import { Cart } from "../entities/cart.entity";
export interface CartRepository {
    findById(cartId: string): Promise<Cart | null>;
    save(cart: Cart): Promise<void>;
    removeItem(cartId: string, variantId: string): Promise<void>;
    clear(cartId: string): Promise<void>;
}
