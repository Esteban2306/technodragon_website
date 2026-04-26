import { ProductFilters } from "../../types/ProductFilters.types";
import { Product } from "../entities/product.entity";

export interface ProductRepository {

  save(product: Product): Promise<void>;

  update(product: Product): Promise<void>;

  findById(id: string): Promise<Product | null>;

  findDomainById(id: string): Promise<Product | null>;

  findBySlug(slug: string): Promise<Product | null>;

  findByVariantId(variantId: string): Promise<Product | null>

  findAll(filters?: ProductFilters): Promise<Product[]>;

  existsBySlug(slug: string): Promise<boolean>;

  delete(id: string): Promise<void>;

  toggleActive(id: string, isActive: boolean): Promise<void>;

  toggleVariantStatus(variantId: string, isActive: boolean): Promise<void>;

  markProductAsFeatured(productId: string): Promise<boolean>;
}