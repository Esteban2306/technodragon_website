import { ProductPreview } from "@/src/shared/types/catalog.types";
import { ProductCardBase } from "./ProductCardBase";

export const ProductCardMobile = ({ product }: { product: ProductPreview }) => {
  return <ProductCardBase product={product} showCTA />;
}; 