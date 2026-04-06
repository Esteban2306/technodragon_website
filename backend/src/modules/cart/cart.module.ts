import { Module } from "@nestjs/common";
import { CartController } from "./controllers/cart.controller";
import { CartService } from "./application/services/cart.service";
import { PrismaCartRepository } from "./infrastructure/repositories/prisma-cart.repository";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { EventBusService } from "src/infrastructure/events/event-bus.service";
import { EventsModule } from "src/infrastructure/events/events.module";
import { CART_REPOSITORY } from "./domain/token/cart-repository.token";

@Module({
  controllers: [CartController],
  imports: [EventsModule],
  providers: [
    CartService,
    PrismaService,
    EventBusService,
    {
      provide: CART_REPOSITORY,
      useClass: PrismaCartRepository
    }
  ],
  exports: [CartService]
})
export class CartModule {}