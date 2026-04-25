export type Variant = {
  id: string;
  price: number;
  sku: string;
  stock: number;
  isActive: boolean;
  attributes: { name: string; value: string }[];
};

export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  brand: {
    id: string,
    name: string
  }
  category: {
    id: string
    name: string
  }
  isFeatured?: boolean;
  isActive: boolean;
  image: string;
  variants: {
    id: string;
    sku: string;
    price: number;
    stock: number;
    isActive: boolean;
    condition: string;
    attributes: {
      name: string;
      value: string;
    }[];
  }[];
};

