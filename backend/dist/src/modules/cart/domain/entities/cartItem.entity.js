"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
class CartItem {
    props;
    constructor(props) {
        this.props = props;
    }
    getId() {
        return this.props.id;
    }
    getVariantId() {
        return this.props.variantId;
    }
    getQuantity() {
        return this.props.quantity;
    }
    getVariant() {
        return this.props.variant ?? null;
    }
    increase(q) {
        this.props.quantity += q;
    }
    update(q) {
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
exports.CartItem = CartItem;
//# sourceMappingURL=cartItem.entity.js.map