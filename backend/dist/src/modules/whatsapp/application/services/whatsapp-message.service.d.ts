import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import type { CartRepository } from 'src/modules/cart/domain/repositories/cart.repository';
import { ConfigService } from '@nestjs/config';
export declare class WhatsAppService {
    private readonly prisma;
    private readonly cartRepository;
    private readonly configService;
    constructor(prisma: PrismaService, cartRepository: CartRepository, configService: ConfigService);
    generateProductUrl(variantId: string): Promise<string>;
    generateCartUrl(cartId: string): Promise<string>;
    private getPhone;
}
