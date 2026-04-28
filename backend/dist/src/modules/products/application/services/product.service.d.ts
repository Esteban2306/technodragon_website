import { PrismaProductRepository } from '../../infrastructure/repositories/prisma-product.repository';
import { EventBusService } from 'src/infrastructure/events/event-bus.service';
import { Product } from '../../domain/entities/product.entity';
import { ProductFilters } from '../../types/ProductFilters.types';
import { ProductResponse } from '../../types/product-response.types';
export declare class ProductService {
    private productRepository;
    private eventBus;
    constructor(productRepository: PrismaProductRepository, eventBus: EventBusService);
    private readonly ERRORS;
    create(product: Product): Promise<void>;
    update(product: Product): Promise<ProductResponse>;
    updateBasic(id: string, data: {
        name?: string;
        description?: string;
        slug?: string;
    }): Promise<ProductResponse>;
    updateStock(variantId: string, stock: number): Promise<void>;
    findById(id: string): Promise<ProductResponse>;
    findAll(filters: ProductFilters): Promise<ProductResponse[]>;
    findAllPaginated(filters: ProductFilters): Promise<{
        data: ProductResponse[];
        total: number;
    }>;
    delete(id: string): Promise<void>;
    markAsFeatured(productId: string): Promise<void>;
    changeProductStatus(id: string, isActive: boolean): Promise<void>;
    changeVariantStatus(variantId: string, isActive: boolean): Promise<void>;
    private ensureSlugIsUnique;
    private validateProduct;
    private ensureValidConditions;
    private ensureSlugIsUniqueOnUpdate;
}
