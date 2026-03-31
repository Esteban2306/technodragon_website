import { ProductCondition } from "../domain/enums/product-condition.enum";

export interface ProductFilters {
  isActive?: boolean;
  brandId?: string;
  categoryId?: string;
  condition?:ProductCondition
  minPrice?: number;
  maxPrice?: number;
}