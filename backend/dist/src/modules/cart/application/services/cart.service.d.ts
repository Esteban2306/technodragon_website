import type { CartRepository } from '../../domain/repositories/cart.repository';
import { Cart } from '../../domain/entities/cart.entity';
import { EventBusService } from 'src/infrastructure/events/event-bus.service';
export declare class CartService {
    private readonly cartRepository;
    private readonly eventBus;
    constructor(cartRepository: CartRepository, eventBus: EventBusService);
    createCart(): Promise<Cart>;
    addItem(params: {
        cartId: string;
        variantId: string;
        quantity: number;
    }): Promise<Cart>;
    updateItem(params: {
        cartId: string;
        variantId: string;
        quantity: number;
    }): Promise<Cart>;
    removeItem(params: {
        cartId: string;
        variantId: string;
    }): Promise<void>;
    clearCart(cartId: string): Promise<void>;
    getCart(cartId: string): Promise<Cart>;
}
