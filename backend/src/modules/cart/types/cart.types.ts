export interface ProductImage {
  url: string;
}

export interface ProductInfo {
  name: string;
  images: ProductImage[];
  brand: string;
}

export interface VariantInfo {
  id: string;
  price: number;
  attributes: Record<string, string>;
  product: ProductInfo | null;
}

export interface CartItemPersistence {
  id: string;
  variantId: string;
  quantity: number;
  variant?: VariantInfo | null;
} 