import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { CatalogFilters, CatalogRepository } from '../../types/catalogRepository.types';
import { CatalogItem } from '../../domain/entities/catalog.entity';
import { PaginatedResult } from '../../types/pagination.types';
export declare class PrismaCatalogRepository implements CatalogRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    upsertMany(items: CatalogItem[]): Promise<void>;
    deleteByProductId(productId: string): Promise<void>;
    updateStock(variantId: string, stock: number): Promise<void>;
    updateManyByBrand(brandId: string, data: {
        brandName?: string;
        isActive?: boolean;
    }): Promise<void>;
    updateManyByCategory(categoryId: string, data: {
        categoryName?: string;
    }): Promise<void>;
    findAll(filters: CatalogFilters): Promise<PaginatedResult<CatalogItem>>;
    findById(id: string): Promise<CatalogItem | null>;
}
