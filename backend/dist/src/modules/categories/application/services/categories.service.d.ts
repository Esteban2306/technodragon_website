import { CategoryRepository } from '../../domain/repositories/category.repository';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { Category } from '../../domain/entities/category.entity';
import { UpdateCategoryDto } from '../../dto/update-category.dto';
import { EventBusService } from 'src/infrastructure/events/event-bus.service';
export declare class CategoriesService {
    private readonly categoryRepo;
    private readonly eventBus;
    constructor(categoryRepo: CategoryRepository, eventBus: EventBusService);
    private execute;
    create(dto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
    findById(id: string): Promise<Category>;
    findBySlug(slug: string): Promise<Category>;
    update(id: string, dto: UpdateCategoryDto): Promise<Category>;
    delete(id: string): Promise<void>;
    getTree(): Promise<Category[]>;
}
