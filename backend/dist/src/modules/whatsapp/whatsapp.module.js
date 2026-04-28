"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppModule = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_message_service_1 = require("./application/services/whatsapp-message.service");
const whatsapp_controller_1 = require("./controllers/whatsapp.controller");
const prisma_service_1 = require("../../infrastructure/database/prisma/prisma.service");
const config_1 = require("@nestjs/config");
const prisma_cart_repository_1 = require("../cart/infrastructure/repositories/prisma-cart.repository");
const events_module_1 = require("../../infrastructure/events/events.module");
const cart_repository_token_1 = require("../cart/domain/token/cart-repository.token");
let WhatsAppModule = class WhatsAppModule {
};
exports.WhatsAppModule = WhatsAppModule;
exports.WhatsAppModule = WhatsAppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, events_module_1.EventsModule],
        controllers: [whatsapp_controller_1.WhatsAppController],
        providers: [
            whatsapp_message_service_1.WhatsAppService,
            prisma_service_1.PrismaService,
            {
                provide: cart_repository_token_1.CART_REPOSITORY,
                useClass: prisma_cart_repository_1.PrismaCartRepository
            }
        ]
    })
], WhatsAppModule);
//# sourceMappingURL=whatsapp.module.js.map