import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import type { CartRepository } from '../../domain/repositories/cart.repository';
import { Cart } from '../../domain/entities/cart.entity';
import { EventBusService } from 'src/infrastructure/events/event-bus.service';
import { EventTypes } from 'src/infrastructure/events/event.types';
import { randomUUID } from 'crypto';

@Injectable()
export class CartService {
  constructor(
    @Inject('CART_REPOSITORY')
    private readonly cartRepository: CartRepository,
    private readonly eventBus: EventBusService,
  ) {}

  async createCart(): Promise<Cart> {
    const cart = Cart.create();

    await this.cartRepository.save(cart);

    await this.eventBus.emitAsync({
      name: EventTypes.CART_CREATED,
      payload: {
        cartId: cart.getId(),
      },
      occurredAt: new Date(),
    });

    return cart;
  }

  async addItem(params: {
    cartId: string;
    variantId: string;
    quantity: number;
  }): Promise<Cart> {
    if (params.quantity <= 0) {
      throw new BadRequestException('Invalid quantity');
    }

    const cart = await this.cartRepository.findById(params.cartId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.addItem(params.variantId, params.quantity);

    await this.cartRepository.save(cart);

    await this.eventBus.emitAsync({
      name: EventTypes.CART_PRODUCT_ADDED,
      payload: {
        cartId: cart.getId(),
        variantId: params.variantId,
        quantity: params.quantity,
      },
      occurredAt: new Date(),
    });

    return cart;
  }

  async updateItem(params: {
    cartId: string;
    variantId: string;
    quantity: number;
  }): Promise<Cart> {
    if (params.quantity <= 0) {
      throw new BadRequestException('Invalid quantity');
    }

    const cart = await this.cartRepository.findById(params.cartId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.updateItem(params.variantId, params.quantity);

    await this.cartRepository.save(cart);

    await this.eventBus.emitAsync({
      name: EventTypes.CART_PRODUCT_UPDATED,
      payload: {
        cartId: cart.getId(),
        variantId: params.variantId,
        quantity: params.quantity,
      },
      occurredAt: new Date(),
    });

    return cart;
  }

  async removeItem(params: {
    cartId: string;
    variantId: string;
  }): Promise<void> {
    const cart = await this.cartRepository.findById(params.cartId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.removeItem(params.variantId);

    await this.cartRepository.removeItem(params.cartId, params.variantId);

    await this.eventBus.emitAsync({
      name: EventTypes.CART_PRODUCT_REMOVED,
      payload: {
        cartId: params.cartId,
        variantId: params.variantId,
      },
      occurredAt: new Date(),
    });
  }

  async clearCart(cartId: string): Promise<void> {
    const cart = await this.cartRepository.findById(cartId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.clear();

    await this.cartRepository.clear(cartId);

    await this.eventBus.emitAsync({
      name: EventTypes.CART_CLEARED,
      payload: { cartId },
      occurredAt: new Date(),
    });
  }

  async getCart(cartId: string): Promise<Cart> {
    const cart = await this.cartRepository.findById(cartId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return cart;
  }
}
