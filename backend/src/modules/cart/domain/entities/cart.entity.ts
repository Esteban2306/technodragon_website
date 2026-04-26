import { randomUUID } from 'crypto';
import { CartItem } from './cartItem.entity';
import { CartItemPersistence } from '../../types/cart.types';

type CartPersistence = {
  id: string;
  items: CartItemPersistence[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export class Cart {
  private itemsMap: Map<string, CartItem>;

  private constructor(private props: CartPersistence) {
    this.itemsMap = new Map(
      props.items.map((item) => [item.variantId, new CartItem(item)]),
    );
  }

  static create(): Cart {
    const now = new Date();

    return new Cart({
      id: randomUUID(),
      items: [],
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  }

  static fromPersistence(data: CartPersistence): Cart {
    return new Cart(data);
  }

  addItem(variantId: string, quantity: number): void {
    if (quantity <= 0) throw new Error('Quantity must be greater than 0');

    const existing = this.itemsMap.get(variantId);

    if (existing) {
      existing.increase(quantity);
    } else {
      this.itemsMap.set(
        variantId,
        new CartItem({
          id: randomUUID(),
          variantId,
          quantity,
        }),
      );
    }

    this.touch();
  }

  updateItem(variantId: string, quantity: number): void {
    if (quantity <= 0) throw new Error('Quantity must be greater than 0');

    const item = this.itemsMap.get(variantId);
    if (!item) throw new Error('Item not found in cart');

    item.update(quantity);
    this.touch();
  }

  removeItem(variantId: string): void {
    if (!this.itemsMap.has(variantId)) {
      throw new Error('Item not found in cart');
    }

    this.itemsMap.delete(variantId);
    this.touch();
  }

  clear(): void {
    this.itemsMap.clear();
    this.touch();
  }

  getId(): string {
    return this.props.id;
  }

  getItems(): CartItem[] {
    return Array.from(this.itemsMap.values());
  }

  getTotalItems(): number {
    return this.getItems().reduce((acc, i) => acc + i.getQuantity(), 0);
  }

  isEmpty(): boolean {
    return this.itemsMap.size === 0;
  }

  toJSON() {
  return {
    id: this.getId(),
    items: this.getItems().map((i) => i.toJSON()),
    totalItems: this.getTotalItems(),
  };
}

  toPersistence(): CartPersistence {
    return {
      id: this.props.id,
      isActive: this.props.isActive,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      items: this.getItems().map((item) => item.toJSON()),
    };
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}
