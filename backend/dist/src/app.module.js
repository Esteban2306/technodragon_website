"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./infrastructure/database/prisma/prisma.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const categories_module_1 = require("./modules/categories/categories.module");
const brand_module_1 = require("./modules/brand/brand.module");
const cart_module_1 = require("./modules/cart/cart.module");
const products_module_1 = require("./modules/products/products.module");
const catalog_module_1 = require("./modules/catalog/catalog.module");
const whatsapp_module_1 = require("./modules/whatsapp/whatsapp.module");
const auth_module_1 = require("./modules/auth/auth.module");
const config_1 = require("@nestjs/config");
const events_module_1 = require("./infrastructure/events/events.module");
const cloudinary_module_1 = require("./infrastructure/service/cloudinary/cloudinary.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            auth_module_1.AuthModule,
            events_module_1.EventsModule,
            cloudinary_module_1.CloudinaryModule,
            categories_module_1.CategoriesModule,
            brand_module_1.BrandModule,
            cart_module_1.CartModule,
            products_module_1.ProductModule,
            catalog_module_1.CatalogModule,
            whatsapp_module_1.WhatsAppModule,
            prisma_module_1.PrismaModule
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map