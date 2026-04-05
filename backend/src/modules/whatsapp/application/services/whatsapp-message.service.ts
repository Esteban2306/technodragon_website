import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import type { CartRepository } from 'src/modules/cart/domain/repositories/cart.repository';
import { WhatsAppMessageBuilder } from '../../domain/whatsapp-message.builder';
import { WhatsAppUrlFactory } from '../../infrastructure/whatsapp-url.factory';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WhatsAppService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cartRepository: CartRepository,
    private readonly configService: ConfigService,
  ) {}

  async generateProductUrl(variantId: string): Promise<string> {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      include: {
        product: true,
        attributes: true,
      },
    });

    if (!variant || !variant.product) {
      throw new NotFoundException('variant not found');
    }

    const variantText = variant.attributes
      .map((a) => `${a.name}: ${a.value}`)
      .join(', ');

    const message = WhatsAppMessageBuilder.buildProductMessage({
      name: variant.product.name,
      variant: variantText,
      price: Number(variant.price),
    });

    return WhatsAppUrlFactory.create({
      phone: this.getPhone(),
      message,
    });
  }

  async generateCartUrl(cartId: string): Promise<string> {
    const cart = await this.cartRepository.findById(cartId);

    if (!cart || cart.isEmpty()) {
      throw new BadRequestException('Cart is empty or not found');
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

    const message = WhatsAppMessageBuilder.buildCartMessage({items});

    return WhatsAppUrlFactory.create({
        phone: this.getPhone(),
        message
    })
  }

  private getPhone(): string {
    const phone = this.configService.get<string>('WHATSAPP_PHONE');

    if (!phone) {
      throw new Error('WHATSAPP_PHONE is not configured');
    }

    return phone;
  }
}
