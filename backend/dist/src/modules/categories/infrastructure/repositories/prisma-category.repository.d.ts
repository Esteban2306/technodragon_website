import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { FindCategoriesQueryDto } from '../../dto/find-categories.dto';
import { PaginatedResponseDto } from 'src/common/shared/paginated-response.dto';
export declare class PrismaCategoryRepository implements CategoryRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(category: Category): Promise<Category>;
    findAll(query: FindCategoriesQueryDto): Promise<PaginatedResponseDto<Category>>;
    findById(id: string): Promise<Category | null>;
    findBySlug(slug: string): Promise<Category | null>;
    update(category: Category): Promise<Category>;
    delete(id: string): Promise<void>;
    getTree(): Promise<Category[]>;
    private toDomain;
}
