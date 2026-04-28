"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModule = void 0;
const common_1 = require("@nestjs/common");
const cart_controller_1 = require("./controllers/cart.controller");
const cart_service_1 = require("./application/services/cart.service");
const prisma_cart_repository_1 = require("./infrastructure/repositories/prisma-cart.repository");
const prisma_service_1 = require("../../infrastructure/database/prisma/prisma.service");
const event_bus_service_1 = require("../../infrastructure/events/event-bus.service");
const events_module_1 = require("../../infrastructure/events/events.module");
const cart_repository_token_1 = require("./domain/token/cart-repository.token");
let CartModule = class CartModule {
};
exports.CartModule = CartModule;
exports.CartModule = CartModule = __decorate([
    (0, common_1.Module)({
        controllers: [cart_controller_1.CartController],
        imports: [events_module_1.EventsModule],
        providers: [
            cart_service_1.CartService,
            prisma_service_1.PrismaService,
            event_bus_service_1.EventBusService,
            {
                provide: cart_repository_token_1.CART_REPOSITORY,
                useClass: prisma_cart_repository_1.PrismaCartRepository
            }
        ],
        exports: [cart_service_1.CartService]
    })
], CartModule);
//# sourceMappingURL=cart.module.js.map