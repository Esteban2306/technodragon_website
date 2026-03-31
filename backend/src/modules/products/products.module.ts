import { Module } from "@nestjs/common";
import { ProductController } from "./controllers/products.controller";
import { ProductService } from "./application/services/product.service";
import { PrismaProductRepository } from "./infrastructure/repositories/prisma-product.repository";
import type { ProductRepository } from "./domain/repositories/product.repository.interface";
import { PRODUCT_REPOSITORY } from "./constants/product.tokens";
@Module({
    controllers: [ProductController],
        providers: [
            ProductService,
            {
                provide: PRODUCT_REPOSITORY,
                useClass: PrismaProductRepository
            }
        ],
        exports: [ProductService]
})
export class ProductModule {}