import { CartItemPersistence } from "../../types/cart.types";

export class CartItem {
  constructor(private props: CartItemPersistence) {}

  getId(): string {
    return this.props.id;
  }

  getVariantId(): string {
    return this.props.variantId;
  }

  getQuantity(): number {
    return this.props.quantity;
  }

  getVariant() {
    return this.props.variant ?? null;
  }

  increase(q: number) {
    this.props.quantity += q;
  }

  update(q: number) {
    this.props.quantity = q;
  }

  toJSON() {
    return {
      id: this.props.id,
      variantId: this.props.variantId,
      quantity: this.props.quantity,
      variant: this.props.variant ?? null, 
    };
  }
}