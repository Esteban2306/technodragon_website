import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CategoriesModule } from './modules/categories/categories.module';
import { BrandModule } from './modules/brand/brand.module';
import { CartModule } from './modules/cart/cart.module';
import { ProductModule } from './modules/products/products.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { WhatsAppModule } from './modules/whatsapp/whatsapp.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from './infrastructure/events/events.module';
@Module({
  imports: [
    

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    
    EventEmitterModule.forRoot(),

    AuthModule,
    EventsModule,

    CategoriesModule,
    BrandModule,
    CartModule,
    ProductModule,
    CatalogModule,
    WhatsAppModule,
    
    PrismaModule
  ]
})
export class AppModule {}
