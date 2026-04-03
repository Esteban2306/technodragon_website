import { randomUUID } from "crypto";
import { CartItem } from "./cartItem.entity";
import { CartProps } from "../../types/cartPropsEntity.type";

export class Cart {
  private itemsMap: Map<string, CartItem>;

  private constructor(private props: CartProps) {
    this.itemsMap = new Map(
      props.items.map(item => [item.getVariantId(), item])
    );
  }

  static create(): Cart {
    const now = new Date();

    return new Cart({
      id: randomUUID(),
      items: [],
      isActive: true,
      createdAt: now,
      updatedAt: now
    });
  }

  static fromPersistence(data: {
    id: string;
    createdAt: Date;
    isActive: boolean
    updatedAt: Date;
    items: {
      id: string;
      variantId: string;
      quantity: number;
    }[];
  }): Cart {
    return new Cart({
      id: data.id,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      items: data.items.map(i => new CartItem(i))
    });
  }

  addItem(variantId: string, quantity: number): void {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    const existing = this.itemsMap.get(variantId);

    if (existing) {
      existing.increase(quantity);
    } else {
      const newItem = new CartItem({
        id: randomUUID(),
        variantId,
        quantity
      });

      this.itemsMap.set(variantId, newItem);
    }

    this.touch();
  }

  updateItem(variantId: string, quantity: number): void {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    const item = this.itemsMap.get(variantId);

    if (!item) {
      throw new Error("Item not found in cart");
    }

    item.update(quantity);
    this.touch();
  }

  removeItem(variantId: string): void {
    if (!this.itemsMap.has(variantId)) {
      throw new Error("Item not found in cart");
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
    let total = 0;

    for (const item of this.itemsMap.values()) {
      total += item.getQuantity();
    }

    return total;
  }

  isEmpty(): boolean {
    return this.itemsMap.size === 0;
  }

  getCreatedAt(): Date {
    return this.props.createdAt;
  }

  getUpdatedAt(): Date {
    return this.props.updatedAt;
  }

  toPersistence() {
    return {
      id: this.props.id,
      isActive: this.props.isActive,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      items: this.getItems().map(item => item.toJSON())
    };
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}