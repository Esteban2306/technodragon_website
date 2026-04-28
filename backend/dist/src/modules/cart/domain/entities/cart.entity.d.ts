import { CartItem } from './cartItem.entity';
import { CartItemPersistence } from '../../types/cart.types';
type CartPersistence = {
    id: string;
    items: CartItemPersistence[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};
export declare class Cart {
    private props;
    private itemsMap;
    private constructor();
    static create(): Cart;
    static fromPersistence(data: CartPersistence): Cart;
    addItem(variantId: string, quantity: number): void;
    updateItem(variantId: string, quantity: number): void;
    removeItem(variantId: string): void;
    clear(): void;
    getId(): string;
    getItems(): CartItem[];
    getTotalItems(): number;
    isEmpty(): boolean;
    toJSON(): {
        id: string;
        items: {
            id: string;
            variantId: string;
            quantity: number;
            variant: import("../../types/cart.types").VariantInfo | null;
        }[];
        totalItems: number;
    };
    toPersistence(): CartPersistence;
    private touch;
}
export {};
