import { CartItemProps } from "../../types/cartPropsEntity.type";

export class CartItem {
  constructor(private props: CartItemProps) {
    this.validate();
  }

  private validate() {
    if (!this.props.variantId) throw new Error("variantId required");
    if (this.props.quantity <= 0) throw new Error("invalid quantity");
  }

  increase(qty: number) {
    if (qty <= 0) throw new Error("invalid quantity");
    this.props.quantity += qty;
  }

  update(qty: number) {
    if (qty <= 0) throw new Error("invalid quantity");
    this.props.quantity = qty;
  }

  getVariantId() {
    return this.props.variantId;
  }

  getQuantity() {
    return this.props.quantity;
  }

  toJSON() {
    return { ...this.props };
  }
}