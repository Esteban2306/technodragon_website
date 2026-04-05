import { Module } from '@nestjs/common';
import { WhatsAppService } from './application/services/whatsapp-message.service';
import { WhatsAppController } from './controllers/whatsapp.controller';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CartRepository } from '../cart/domain/repositories/cart.repository';
import { PrismaCartRepository } from '../cart/infrastructure/repositories/prisma-cart.repository';

@Module({
  imports: [ConfigModule],
  controllers: [WhatsAppController],
  providers: [
    WhatsAppService,
    PrismaService,
    {
      provide: 'CART_REPOSITORY',
      useClass: PrismaCartRepository
    }
  ]
})
export class WhatsAppModule {}