import { ProductCondition } from "../domain/enums/product-condition.enum";

export type ProductFilters = {
  search?: string;
  page?: number;
  limit?: number;
  isFeatured?: boolean;
  isActive?: boolean;
  brandId?: string;
  categoryId?: string;
  condition?: string;
};