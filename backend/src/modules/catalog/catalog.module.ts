import { Module } from "@nestjs/common";
import { CATALOG_REPOSITORY } from "./helpers/catalog-repository.token";
import { PrismaCatalogRepository } from "./infrastructure/repositories/prisma-catalog.repository";
import { CqrsModule } from "@nestjs/cqrs";
import { CatalogController } from "./controllers/catalog.controller";
import { GetCatalogHandler } from "./application/queries/get-catalog.handler";
import { GetCatalogByIdHandler } from "./application/queries/getByID-catalog.handler";
import { ProductCreatedListener, ProductDeletedListener, ProductUpdatedListener } from "./listeners/product.listener";
import { EventsModule } from "src/infrastructure/events/events.module";
import { catalogListener } from "./application/listener/catalog.listener";

const QueryHandlers = [
    GetCatalogHandler,
    GetCatalogByIdHandler
];

const EventListeners = [
    ProductCreatedListener,
    ProductUpdatedListener,
    ProductDeletedListener,
];
@Module({
    imports: [CqrsModule, EventsModule],
    controllers: [CatalogController],
    providers: [
        {
            provide: CATALOG_REPOSITORY,
            useClass: PrismaCatalogRepository
        },
        ...QueryHandlers,

        ...EventListeners,

        catalogListener,
        PrismaCatalogRepository
    ],

    exports: [CATALOG_REPOSITORY, PrismaCatalogRepository]
})
export class CatalogModule {}