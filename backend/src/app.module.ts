import { Module } from '@nestjs/common';
import { PrismaModule } from './infrastructure/database/prisma/prisma.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CategoriesModule } from './modules/categories/categories.module';
import { BrandModule } from './modules/brand/brand.module';


@Module({
  imports: [
    EventEmitterModule.forRoot(),

    CategoriesModule,
    BrandModule,
    
    PrismaModule
  ]
})
export class AppModule {}
