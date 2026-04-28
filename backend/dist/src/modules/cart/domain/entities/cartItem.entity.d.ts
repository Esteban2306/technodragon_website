import { CartItemPersistence } from "../../types/cart.types";
export declare class CartItem {
    private props;
    constructor(props: CartItemPersistence);
    getId(): string;
    getVariantId(): string;
    getQuantity(): number;
    getVariant(): import("../../types/cart.types").VariantInfo | null;
    increase(q: number): void;
    update(q: number): void;
    toJSON(): {
        id: string;
        variantId: string;
        quantity: number;
        variant: import("../../types/cart.types").VariantInfo | null;
    };
}
