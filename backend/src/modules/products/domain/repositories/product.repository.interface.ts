import { ProductFilters } from '../../types/ProductFilters.types';
import { ProductResponse } from '../../types/product-response.types';
import { Product } from '../entities/product.entity';

export interface ProductRepository {
  save(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  findById(id: string): Promise<ProductResponse | null>;
  findDomainById(id: string): Promise<Product | null>; 
  findBySlug(slug: string): Promise<ProductResponse | null>; 
  findByVariantId(variantId: string): Promise<Product | null>;
  findAll(filters?: ProductFilters): Promise<ProductResponse[]>;
  findAllPaginated(
    filters?: ProductFilters,
  ): Promise<{ data: ProductResponse[]; total: number }>;
  existsBySlug(slug: string): Promise<boolean>;
  delete(id: string): Promise<void>;
  toggleActive(id: string, isActive: boolean): Promise<void>;
  toggleVariantStatus(variantId: string, isActive: boolean): Promise<void>;
  markProductAsFeatured(productId: string): Promise<boolean>;
}
