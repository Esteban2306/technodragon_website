import { Brand } from "../entities/brand.entity";
export declare abstract class BrandRepository {
    abstract create(brand: Brand): Promise<Brand>;
    abstract findById(id: string): Promise<Brand | null>;
    abstract findBySlug(slug: string): Promise<Brand | null>;
    abstract findAll(params?: {
        isActive?: boolean;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<Brand[]>;
    abstract update(brand: Brand): Promise<Brand>;
    abstract delete(id: string): Promise<Brand | null>;
    abstract deactivate(id: string): Promise<void>;
    abstract activate(id: string): Promise<void>;
}
