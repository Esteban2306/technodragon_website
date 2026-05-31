import { PaginatedResponseDto } from 'src/common/shared/paginated-response.dto';
import { FindCategoriesQueryDto } from '../../dto/find-categories.dto';
import { Category } from '../entities/category.entity';
export declare abstract class CategoryRepository {
    abstract create(category: Category): Promise<Category>;
    abstract findAll(query: FindCategoriesQueryDto): Promise<PaginatedResponseDto<Category>>;
    abstract findById(id: string): Promise<Category | null>;
    abstract findBySlug(slug: string): Promise<Category | null>;
    abstract update(category: Category): Promise<Category>;
    abstract delete(id: string): Promise<void>;
    abstract getTree(): Promise<Category[]>;
}
