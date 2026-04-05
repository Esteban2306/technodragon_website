import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { WhatsAppService } from '../application/services/whatsapp-message.service';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly service: WhatsAppService) {}

  @Get('product/:variantId')
  @HttpCode(HttpStatus.OK)
  async getProductUrl(@Param('variantId') variantId: string) {
    const url = await this.service.generateProductUrl(variantId);

    return { url };
  }

  @Get('cart/:cartId')
  @HttpCode(HttpStatus.OK)
  async getCartUrl(@Param('cartId') cartId: string) {
    const url = await this.service.generateCartUrl(cartId);

    return { url };
  }
}
