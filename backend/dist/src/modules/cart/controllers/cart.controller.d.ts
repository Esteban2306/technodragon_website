import { CartService } from '../application/services/cart.service';
import { AddItemDto } from '../dto/addItem.dto';
import { UpdateItemDto } from '../dto/updateItem.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    createCart(): Promise<{
        id: string;
        items: {
            id: string;
            variantId: string;
            quantity: number;
            variant: import("../types/cart.types").VariantInfo | null;
        }[];
        totalItems: number;
    }>;
    getCart(cartId: string): Promise<import("../dto/cart-response.dto").CartResponseDto>;
    addItem(cartId: string, dto: AddItemDto): Promise<{
        id: string;
        items: {
            id: string;
            variantId: string;
            quantity: number;
            variant: import("../types/cart.types").VariantInfo | null;
        }[];
        totalItems: number;
    }>;
    updateItem(cartId: string, dto: UpdateItemDto): Promise<{
        id: string;
        items: {
            id: string;
            variantId: string;
            quantity: number;
            variant: import("../types/cart.types").VariantInfo | null;
        }[];
        totalItems: number;
    }>;
    removeItem(cartId: string, variantId: string): Promise<void>;
    clearCart(cartId: string): Promise<void>;
}
