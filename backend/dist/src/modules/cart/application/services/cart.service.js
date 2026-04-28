"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const cart_entity_1 = require("../../domain/entities/cart.entity");
const event_bus_service_1 = require("../../../../infrastructure/events/event-bus.service");
const event_types_1 = require("../../../../infrastructure/events/event.types");
let CartService = class CartService {
    cartRepository;
    eventBus;
    constructor(cartRepository, eventBus) {
        this.cartRepository = cartRepository;
        this.eventBus = eventBus;
    }
    async createCart() {
        const cart = cart_entity_1.Cart.create();
        await this.cartRepository.save(cart);
        await this.eventBus.emitAsync({
            name: event_types_1.EventTypes.CART_CREATED,
            payload: {
                cartId: cart.getId(),
            },
            occurredAt: new Date(),
        });
        return cart;
    }
    async addItem(params) {
        if (params.quantity <= 0) {
            throw new common_1.BadRequestException('Invalid quantity');
        }
        const cart = await this.cartRepository.findById(params.cartId);
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        cart.addItem(params.variantId, params.quantity);
        await this.cartRepository.save(cart);
        await this.eventBus.emitAsync({
            name: event_types_1.EventTypes.CART_PRODUCT_ADDED,
            payload: {
                cartId: cart.getId(),
                variantId: params.variantId,
                quantity: params.quantity,
            },
            occurredAt: new Date(),
        });
        return cart;
    }
    async updateItem(params) {
        if (params.quantity <= 0) {
            throw new common_1.BadRequestException('Invalid quantity');
        }
        const cart = await this.cartRepository.findById(params.cartId);
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        cart.updateItem(params.variantId, params.quantity);
        await this.cartRepository.save(cart);
        await this.eventBus.emitAsync({
            name: event_types_1.EventTypes.CART_PRODUCT_UPDATED,
            payload: {
                cartId: cart.getId(),
                variantId: params.variantId,
                quantity: params.quantity,
            },
            occurredAt: new Date(),
        });
        return cart;
    }
    async removeItem(params) {
        const cart = await this.cartRepository.findById(params.cartId);
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        cart.removeItem(params.variantId);
        await this.cartRepository.removeItem(params.cartId, params.variantId);
        await this.eventBus.emitAsync({
            name: event_types_1.EventTypes.CART_PRODUCT_REMOVED,
            payload: {
                cartId: params.cartId,
                variantId: params.variantId,
            },
            occurredAt: new Date(),
        });
    }
    async clearCart(cartId) {
        const cart = await this.cartRepository.findById(cartId);
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        cart.clear();
        await this.cartRepository.clear(cartId);
        await this.eventBus.emitAsync({
            name: event_types_1.EventTypes.CART_CLEARED,
            payload: { cartId },
            occurredAt: new Date(),
        });
    }
    async getCart(cartId) {
        const cart = await this.cartRepository.findById(cartId);
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        return cart;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CART_REPOSITORY')),
    __metadata("design:paramtypes", [Object, event_bus_service_1.EventBusService])
], CartService);
//# sourceMappingURL=cart.service.js.map