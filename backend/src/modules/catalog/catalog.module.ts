import { Module } from "@nestjs/common";
import { CATALOG_REPOSITORY } from "./helpers/catalog-repository.token";
import { PrismaCatalogRepository } from "./listeners/product-create.listener";
import { CqrsModule, QueryHandler } from "@nestjs/cqrs";
import { CatalogController } from "./controllers/catalog.controller";
import { GetCatalogHandler } from "./application/queries/get-catalog.handler";
import { GetCatalogByIdHandler } from "./application/queries/getByID-catalog.handler";
import { ProductCreatedListener, ProductDeletedListener, ProductUpdatedListener } from "./listeners/product.listener";

const QueryHandlers = [
    GetCatalogHandler,
    GetCatalogByIdHandler
];

const EventListeners = [
    ProductCreatedListener,
    ProductUpdatedListener,
    ProductDeletedListener,
    StockUpdatedListener
];
@Module({
    imports: [CqrsModule],
    controllers: [CatalogController],
    providers: [
        {
            provide: CATALOG_REPOSITORY,
            useClass: PrismaCatalogRepository
        },
        ...QueryHandlers,

        ...EventListeners
    ],

    exports: [CATALOG_REPOSITORY]
})
export class CatalogModule {}