import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { PrismaCatalogRepository } from '../../infrastructure/repositories/prisma-catalog.repository';
export declare class catalogListener {
    private readonly prisma;
    private readonly catalogRepository;
    constructor(prisma: PrismaService, catalogRepository: PrismaCatalogRepository);
    handleProductCreatedEvent(payload: {
        productId: string;
    }): Promise<void>;
    handleProductUpdatedEvent(payload: {
        productId: string;
    }): Promise<void>;
    handleStockUpdatedEvent(payload: {
        variantId: string;
        stock: number;
    }): Promise<void>;
    private syncProductToCatalog;
}
