import { Module } from "@nestjs/common"
import { BrandService } from "./application/brand.service"
import { BrandRepository } from "./domain/repositories/brand.repository"
import { PrismaBrandRepository } from "./infrastructure/repositories/prisma-brand.repository"
import { BrandController } from "./controller/brand.controller"
import { EventsModule } from "src/infrastructure/events/events.module"

@Module({
    controllers: [BrandController],
    imports: [EventsModule],
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