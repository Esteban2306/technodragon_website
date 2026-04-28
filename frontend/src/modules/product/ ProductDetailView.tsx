'use client'

import AddToCartSection from "./components/AddToCartSection"
import ProductGallery from "./components/ProductGallery"
import ProductInfo from "./components/ProductInfo"
import VariantSelector from "./components/VariantSelector"
import { useProductVariant } from "./hooks/useProductVariants"
import { groupAttributes } from "./utils/variant.utils"
import { ProductDetail } from "@/src/shared/types/product.types"

export default function ProductDetailView({ product }: { product: ProductDetail }) {
  const { selectedVariant, selectedAttributes, setSelectedAttributes } =
    useProductVariant(product)

  const attributes = groupAttributes(product.variants)

  return (
    <div className="container mx-auto py-10 mt-12 p-2">
      <div className="grid lg:grid-cols-2 gap-12">

        <ProductGallery
          images={product.images}
        />

        <div>
          <ProductInfo product={product} variant={selectedVariant} />

          <VariantSelector
            attributes={attributes}
            selected={selectedAttributes}
            onChange={setSelectedAttributes}
          />

          <AddToCartSection variant={selectedVariant} />
        </div>

      </div>
    </div>
  )
}