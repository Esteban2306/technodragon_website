import { ProductCondition } from "@/src/shared/types/product-condition.enum";

export type CreateProductPayload = {
  name: string;
  slug: string;
  description?: string;
  brandId: string;
  categoryId: string;
  isFeatured?: boolean;

  variants: {
    sku: string;
    price: number;
    stock: number;
    condition: ProductCondition;
    attributes: {
      name: string;
      value: string;
    }[];
  }[];

  images: {
    url: string;
    isMain?: boolean;
  }[];
};

export type UpdateProductPayload = {
  name: string;
  slug: string;
  description?: string;
  brandId: string;
  categoryId: string;
  isFeatured?: boolean;

  variants: {
    id?: string;
    sku: string;
    price: number;
    stock: number;
    condition: ProductCondition;
    attributes: {
      name: string;
      value: string;
    }[];
  }[];

  images: {
    id?: string;
    url: string;
    isMain?: boolean;
  }[];
};

export type UpdateBasicProductPayload = {
  name?: string;
  slug?: string;
  description?: string;
};

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