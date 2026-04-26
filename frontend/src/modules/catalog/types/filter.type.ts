import { ProductCondition } from "@/src/shared/types/product-condition.enum";

export type DynamicFilters = {
  brands: string[];
  brandMap: Record<string, string>;
  attributes: Record<string, string[]>;
};

export type Props = {
  dynamicFilters: DynamicFilters | null;

  filters: CatalogFilters;
  setFilters: React.Dispatch<React.SetStateAction<CatalogFilters>>;
};

export type FilterOption = {
  label: string;
  value: string;
};

export type AttributeMap = Record<string, FilterOption[]>;

export type CatalogFilters = {
  minPrice?: number;
  maxPrice?: number;

  brandId?: string[];
  categoryId?: string;

  condition?: ProductCondition[];

  attributes?: Record<string, string[]>;

  search?: string;

  page?: number;
  limit?: number;

  isFeatured?: boolean;

  sortBy?: "price" | "createdAt";
  sortOrder?: "asc" | "desc";
};