export type Category = {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  createdAt?: string;
};

export type CreateCategoryPayload = {
  name: string;
  slug: string;
  parentId?: string;
};

export type UpdateCategoryPayload = {
  name?: string;
  slug?: string;
  parentId?: string;
};

export interface PaginatedCategories {
  data: Category[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export interface CategoryQueryParams {
  search?: string;
  parentId?: string;
  page?: number;
  limit?: number;
  sortBy?: 'name' | 'createdAt';
  order?: 'asc' | 'desc';
}

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  createdAt: string;
}
