import { Module } from "@nestjs/common"
import { BrandService } from "./application/brand.service"
import { BrandRepository } from "./domain/repositories/brand.repository"
import { PrismaBrandRepository } from "./infrastructure/repositories/prisma-brand.repository"
import { BrandController } from "./controller/brand.controller"

@Module({
    controllers: [BrandController],
    providers: [
        BrandService,
        {
            provide: BrandRepository,
            useClass: PrismaBrandRepository
        }
    ],
    exports: [BrandService]
})
export class BrandModule {}