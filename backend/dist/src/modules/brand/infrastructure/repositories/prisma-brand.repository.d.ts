import { PrismaService } from "src/infrastructure/database/prisma/prisma.service";
import { Brand } from "../../domain/entities/brand.entity";
import { BrandRepository } from "../../domain/repositories/brand.repository";
export declare class PrismaBrandRepository implements BrandRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(brand: Brand): Promise<Brand>;
    findAll(params?: {
        isActive?: boolean;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<Brand[]>;
    findById(id: string): Promise<Brand | null>;
    findBySlug(slug: string): Promise<Brand | null>;
    update(brand: Brand): Promise<Brand>;
    deactivate(id: string): Promise<void>;
    activate(id: string): Promise<void>;
    delete(id: string): Promise<Brand | null>;
    private toDomain;
}
