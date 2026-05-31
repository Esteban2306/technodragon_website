import { PaginatedResponseDto } from 'src/common/shared/paginated-response.dto';
import { FindBrandsQueryDto } from '../../dto/find-brand.dto';
import { Brand } from '../entities/brand.entity';

export abstract class BrandRepository {
  abstract create(brand: Brand): Promise<Brand>;

  abstract findById(id: string): Promise<Brand | null>;

  abstract findBySlug(slug: string): Promise<Brand | null>;

  abstract findAll(
    params?: FindBrandsQueryDto,
  ): Promise<PaginatedResponseDto<Brand>>;

  abstract update(brand: Brand): Promise<Brand>;

  abstract delete(id: string): Promise<void>;

  abstract deactivate(id: string): Promise<void>;

  abstract activate(id: string): Promise<void>;
}
