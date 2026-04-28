"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const crypto_1 = require("crypto");
const cartItem_entity_1 = require("./cartItem.entity");
class Cart {
    props;
    itemsMap;
    constructor(props) {
        this.props = props;
        this.itemsMap = new Map(props.items.map((item) => [item.variantId, new cartItem_entity_1.CartItem(item)]));
    }
    static create() {
        const now = new Date();
        return new Cart({
            id: (0, crypto_1.randomUUID)(),
            items: [],
            isActive: true,
            createdAt: now,
            updatedAt: now,
        });
    }
    static fromPersistence(data) {
        return new Cart(data);
    }
    addItem(variantId, quantity) {
        if (quantity <= 0)
            throw new Error('Quantity must be greater than 0');
        const existing = this.itemsMap.get(variantId);
        if (existing) {
            existing.increase(quantity);
        }
        else {
            this.itemsMap.set(variantId, new cartItem_entity_1.CartItem({
                id: (0, crypto_1.randomUUID)(),
                variantId,
                quantity,
            }));
        }
        this.touch();
    }
    updateItem(variantId, quantity) {
        if (quantity <= 0)
            throw new Error('Quantity must be greater than 0');
        const item = this.itemsMap.get(variantId);
        if (!item)
            throw new Error('Item not found in cart');
        item.update(quantity);
        this.touch();
    }
    removeItem(variantId) {
        if (!this.itemsMap.has(variantId)) {
            throw new Error('Item not found in cart');
        }
        this.itemsMap.delete(variantId);
        this.touch();
    }
    clear() {
        this.itemsMap.clear();
        this.touch();
    }
    getId() {
        return this.props.id;
    }
    getItems() {
        return Array.from(this.itemsMap.values());
    }
    getTotalItems() {
        return this.getItems().reduce((acc, i) => acc + i.getQuantity(), 0);
    }
    isEmpty() {
        return this.itemsMap.size === 0;
    }
    toJSON() {
        return {
            id: this.getId(),
            items: this.getItems().map((i) => i.toJSON()),
            totalItems: this.getTotalItems(),
        };
    }
    toPersistence() {
        return {
            id: this.props.id,
            isActive: this.props.isActive,
            createdAt: this.props.createdAt,
            updatedAt: this.props.updatedAt,
            items: this.getItems().map((item) => item.toJSON()),
        };
    }
    touch() {
        this.props.updatedAt = new Date();
    }
}
exports.Cart = Cart;
//# sourceMappingURL=cart.entity.js.map