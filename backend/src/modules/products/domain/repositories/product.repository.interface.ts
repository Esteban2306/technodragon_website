import { ProductFilters } from "../../types/ProductFilters.types";
import { Product } from "../entities/product.entity";

export interface ProductRepository {

  save(product: Product): Promise<void>;

  update(product: Product): Promise<void>;

  findById(id: string): Promise<Product | null>;

  findBySlug(slug: string): Promise<Product | null>;

  findByVariantId(variantId: string): Promise<Product | null>

  findAll(filters?: ProductFilters): Promise<Product[]>;

  existsBySlug(slug: string): Promise<boolean>;

  delete(id: string): Promise<void>;
}