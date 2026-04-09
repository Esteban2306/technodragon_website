import { ProductPreview } from "@/src/shared/types/catalog.types";
import { ProductCardBase } from "./ProductCardBase";

export const ProductCardDesktop = ({ product }: { product: ProductPreview }) => {
  return (
    <div
      className="
        group relative w-fit
        transition-transform duration-300
        hover:scale-103
      "
    >
      <ProductCardBase
        product={product}
        className="transition-all duration-300 group-hover:border-white/40"
      />

      <div
        className="
          absolute inset-0
          flex items-center justify-center
          rounded-2xl
          bg-black/40

          opacity-0 group-hover:opacity-100
          transition-all duration-300
        "
      >
        <button
          className="
            cursor-pointer
            bg-white text-black px-4 py-2 rounded-lg text-sm
            hover:scale-103 transition
          "
        >
          Ver producto
        </button>
      </div>
    </div>
  );
};