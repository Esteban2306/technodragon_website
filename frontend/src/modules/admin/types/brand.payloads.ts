export type Brand = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt?: string;
  logo?: string;
};

export type ApiParams = Record<string, string | number | boolean | undefined>;

export type CreateBrandPayload = {
  name: string;
  slug: string;
  logo?: string;
  isActive: boolean;
};

export type UpdateBrandPayload = {
  name?: string;
  slug?: string;
};

export interface PaginatedBrands {
  data: Brand[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface BrandQueryParams {
  search?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'createdAt';
  order?: 'asc' | 'desc';
}

export interface BrandRow {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  isActive: boolean;
  createdAt: string;
}
