import { PrismaCatalogRepository } from '../infrastructure/repositories/prisma-catalog.repository';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { EventPayloadMap, EventTypes } from 'src/infrastructure/events/event.types';
import type { CatalogRepository } from '../domain/repositories/catalog.repository';
export declare class ProductCreatedListener {
    private prisma;
    private catalogPrisma;
    constructor(prisma: PrismaService, catalogPrisma: PrismaCatalogRepository);
    handle(event: EventPayloadMap[typeof EventTypes.PRODUCT_CREATED]): Promise<void>;
}
export declare class ProductUpdatedListener {
    private readonly prisma;
    private readonly catalogRepository;
    constructor(prisma: PrismaService, catalogRepository: CatalogRepository);
    handle(event: EventPayloadMap[typeof EventTypes.PRODUCT_UPDATED]): Promise<void>;
}
export declare class ProductDeletedListener {
    private readonly catalogRepository;
    constructor(catalogRepository: CatalogRepository);
    handle(event: EventPayloadMap[typeof EventTypes.PRODUCT_DELETED]): Promise<void>;
}
export declare class ProductUpdateStockListener {
    private readonly catalogRepository;
    constructor(catalogRepository: CatalogRepository);
    handle(event: EventPayloadMap[typeof EventTypes.STOCK_UPDATED]): Promise<void>;
}
export declare class StockOutOfStockListener {
    private readonly catalogRepository;
    constructor(catalogRepository: CatalogRepository);
    handle(event: EventPayloadMap[typeof EventTypes.STOCK_OUT_OF_STOCK]): Promise<void>;
}
