import { BrandService } from '../application/brand.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    create(dto: CreateBrandDto): Promise<import("../domain/entities/brand.entity").Brand>;
    findAll(search?: string, isActive?: string, page?: string, limit?: string): Promise<import("../domain/entities/brand.entity").Brand[]>;
    findBySlug(slug: string): Promise<import("../domain/entities/brand.entity").Brand>;
    findById(id: string): Promise<import("../domain/entities/brand.entity").Brand>;
    update(id: string, dto: UpdateBrandDto): Promise<import("../domain/entities/brand.entity").Brand>;
    deactivate(id: string): Promise<void>;
    activate(id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
