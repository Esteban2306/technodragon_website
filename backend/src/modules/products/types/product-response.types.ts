import { Prisma } from '@prisma/client';
import { ProductCondition } from '../domain/enums/product-condition.enum';



type AttributeResponse = {
  id: string;
  name: string;
  value: string;
};

type VariantResponse = {
  id: string;
  sku: string;
  price: number;
  stock: number;
  isActive: boolean;
  condition: ProductCondition;
  attributes: AttributeResponse[];
  createdAt: Date;
  updatedAt: Date;
};

type ImageResponse = {
  id: string;
  url: string;
  isMain: boolean;
};

export type ProductResponse = {
  id: string;
  name: string;
  slug: string;
  description: string;
  brand: { id: string; name: string };
  category: { id: string; name: string };
  variants: VariantResponse[];
  images: ImageResponse[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type PrismaProductFull = Prisma.ProductGetPayload<{
  include: {
    brand: true;
    category: true;
    images: true;
    variants: {
      include: {
        attributes: true;
      };
    };
  };
}>;

