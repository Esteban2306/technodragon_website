import { Module } from "@nestjs/common";
import { CartController } from "./controllers/cart.controller";
import { CartService } from "./application/services/cart.service";
import { PrismaCartRepository } from "./infrastructure/repositories/prisma-cart.repository";
import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { EventBusService } from "src/infrastructure/events/event-bus.service";

@Module({
  controllers: [CartController],
  providers: [
    CartService,
    PrismaService,
    EventBusService,
    {
      provide: "CART_REPOSITORY",
      useClass: PrismaCartRepository
    }
  ],
  exports: [CartService]
})
export class CartModule {}