export type ProductCardData = {
  id: string;
  name: string;
  description: string;
  brand: string;
  category: string;
  image: string;
  totalStock: number;
  variants: {
    id: string;
    price: number;
    stock: number;
    attributes: { name: string; value: string }[];
    isActive: boolean;
  }[];
};