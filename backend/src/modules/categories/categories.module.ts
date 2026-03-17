import { Module } from "@nestjs/common";
import { CategoriesService } from "./application/services/categories.service";
import { PrismaCategoryRepository } from "./infrastructure/repositories/prisma-category.repository";
import { CategoryRepository } from "./domain/repositories/category.repository";
import { CategoriesController } from "./controllers/categories.controller";

@Module({
    controllers: [CategoriesController],
    providers: [
        CategoriesService,
        {
            provide: CategoryRepository,
            useClass: PrismaCategoryRepository
        }
    ],
    exports: [CategoriesService]
})
export class CategoriesModule {}