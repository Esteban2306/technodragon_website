import { Module } from '@nestjs/common';
import { WhatsAppService } from './application/services/whatsapp-message.service';
import { WhatsAppController } from './controllers/whatsapp.controller';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaCartRepository } from '../cart/infrastructure/repositories/prisma-cart.repository';
import { EventsModule } from 'src/infrastructure/events/events.module';
import { CART_REPOSITORY } from '../cart/domain/token/cart-repository.token';

@Module({
  imports: [ConfigModule, EventsModule],
  controllers: [WhatsAppController],
  providers: [
    WhatsAppService,
    PrismaService,
    {
      provide: CART_REPOSITORY,
      useClass: PrismaCartRepository
    }
  ]
})
export class WhatsAppModule {}