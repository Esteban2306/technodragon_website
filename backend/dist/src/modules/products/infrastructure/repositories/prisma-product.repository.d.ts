import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository.interface';
import { ProductFilters } from '../../types/ProductFilters.types';
import { CloudinaryService } from 'src/infrastructure/service/cloudinary/cloudinary.service';
import { ProductResponse } from '../../types/product-response.types';
export declare class PrismaProductRepository implements ProductRepository {
    private prisma;
    private cloudinaryService;
    constructor(prisma: PrismaService, cloudinaryService: CloudinaryService);
    save(product: Product): Promise<void>;
    findById(id: string): Promise<ProductResponse | null>;
    findDomainById(id: string): Promise<Product | null>;
    findAll(filters?: ProductFilters): Promise<ProductResponse[]>;
    findAllPaginated(filters?: ProductFilters): Promise<{
        data: ProductResponse[];
        total: number;
    }>;
    findByVariantId(variantId: string): Promise<Product | null>;
    update(product: Product): Promise<void>;
    updateStock(variantId: string, stock: number): Promise<void>;
    existsBySlug(slug: string): Promise<boolean>;
    findBySlug(slug: string): Promise<ProductResponse | null>;
    delete(id: string): Promise<void>;
    markProductAsFeatured(productId: string): Promise<boolean>;
    toggleActive(id: string, isActive: boolean): Promise<void>;
    toggleVariantStatus(variantId: string, isActive: boolean): Promise<void>;
    private toDomain;
    private toResponse;
}
