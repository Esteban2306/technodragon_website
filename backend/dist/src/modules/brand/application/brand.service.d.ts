import { BrandRepository } from '../domain/repositories/brand.repository';
import { Brand } from '../domain/entities/brand.entity';
import { EventBusService } from 'src/infrastructure/events/event-bus.service';
import { CreateBrandDto } from '../dto/create-brand.dto';
import { UpdateBrandDto } from '../dto/update-brand.dto';
import { FindBrandsQueryDto } from '../dto/find-brand.dto';
import { PaginatedResponseDto } from 'src/common/shared/paginated-response.dto';
export declare class BrandService {
    private readonly brandRepo;
    private readonly eventBus;
    constructor(brandRepo: BrandRepository, eventBus: EventBusService);
    private execute;
    create(dto: CreateBrandDto): Promise<Brand>;
    findAll(params?: FindBrandsQueryDto): Promise<PaginatedResponseDto<Brand>>;
    findById(id: string): Promise<Brand>;
    findBySlug(slug: string): Promise<Brand>;
    update(id: string, dto: UpdateBrandDto): Promise<Brand>;
    deactivate(id: string): Promise<void>;
    activate(id: string): Promise<void>;
    delete(id: string): Promise<void>;
}
