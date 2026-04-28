import { ProductCondition } from './product-condition.enum';

export type ProductAttribute = {
  id: string;
  name: string;
  value: string;
};

export type ProductVariantDetail = {
  id: string;
  sku: string;
  price: number;
  stock: number;
  isActive: boolean;
  condition: ProductCondition;
  attributes: ProductAttribute[];
  createdAt: string;
  updatedAt: string;
};

export type ProductImage = {
  id: string;
  url: string;
  isFeatured: boolean;
};

export type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  description: string;
  condition: ProductCondition;

  brand: {
    id: string;
    name: string;
  };

  category: {
    id: string;
    name: string;
  };

  variants: ProductVariantDetail[];
  images: ProductImage[];

  isActive: boolean;
  isFeatured: boolean;

  createdAt: string;
  updatedAt: string;
};

export type ProductPageProps = {
  params: {
    id: string;
  };
};
