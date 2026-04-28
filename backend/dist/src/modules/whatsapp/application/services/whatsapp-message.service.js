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
exports.WhatsAppService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../../infrastructure/database/prisma/prisma.service");
const whatsapp_message_builder_1 = require("../../domain/whatsapp-message.builder");
const whatsapp_url_factory_1 = require("../../infrastructure/whatsapp-url.factory");
const config_1 = require("@nestjs/config");
const cart_repository_token_1 = require("../../../cart/domain/token/cart-repository.token");
let WhatsAppService = class WhatsAppService {
    prisma;
    cartRepository;
    configService;
    constructor(prisma, cartRepository, configService) {
        this.prisma = prisma;
        this.cartRepository = cartRepository;
        this.configService = configService;
    }
    async generateProductUrl(variantId) {
        const variant = await this.prisma.productVariant.findUnique({
            where: { id: variantId },
            include: {
                product: true,
                attributes: true,
            },
        });
        if (!variant || !variant.product) {
            throw new common_1.NotFoundException('variant not found');
        }
        const variantText = variant.attributes
            .map((a) => `${a.name}: ${a.value}`)
            .join(', ');
        const message = whatsapp_message_builder_1.WhatsAppMessageBuilder.buildProductMessage({
            name: variant.product.name,
            variant: variantText,
            price: Number(variant.price),
        });
        return whatsapp_url_factory_1.WhatsAppUrlFactory.create({
            phone: this.getPhone(),
            message,
        });
    }
    async generateCartUrl(cartId) {
        const cart = await this.cartRepository.findById(cartId);
        if (!cart || cart.isEmpty()) {
            throw new common_1.BadRequestException('Cart is empty or not found');
        }
        const variantIds = cart.getItems().map((i) => i.getVariantId());
        const variants = await this.prisma.productVariant.findMany({
            where: { id: { in: variantIds } },
            include: {
                product: true,
                attributes: true,
            },
        });
        const variantMap = new Map(variants.map((v) => [v.id, v]));
        const items = cart.getItems().map((item) => {
            const variant = variantMap.get(item.getVariantId());
            if (!variant) {
                throw new Error(`Variant ${item.getVariantId()} not found`);
            }
            const variantText = variant.attributes
                .map((a) => `${a.name}: ${a.value}`)
                .join(', ');
            return {
                name: variant.product.name,
                variant: variantText || 'Default',
                price: Number(variant.price),
                quantity: item.getQuantity(),
            };
        });
        const message = whatsapp_message_builder_1.WhatsAppMessageBuilder.buildCartMessage({ items });
        return whatsapp_url_factory_1.WhatsAppUrlFactory.create({
            phone: this.getPhone(),
            message
        });
    }
    getPhone() {
        const phone = this.configService.get('WHATSAPP_PHONE');
        if (!phone) {
            throw new Error('WHATSAPP_PHONE is not configured');
        }
        return phone;
    }
};
exports.WhatsAppService = WhatsAppService;
exports.WhatsAppService = WhatsAppService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cart_repository_token_1.CART_REPOSITORY)),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object, config_1.ConfigService])
], WhatsAppService);
//# sourceMappingURL=whatsapp-message.service.js.map