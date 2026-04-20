'use client'

import { ProductDetail, ProductVariantDetail } from "@/src/shared/types/product.types"

type Props = {
  product: ProductDetail
  variant?: ProductVariantDetail
}

export default function ProductInfo({ product, variant }: Props) {
  return (
    <div className="flex flex-col gap-4">

      {/* BRAND */}
      <span className="text-sm text-neutral-400 uppercase tracking-widest">
        {product.brand.name}
      </span>

      {/* NAME */}
      <h1 className="text-3xl lg:text-4xl font-semibold text-white">
        {product.name}
      </h1>

      {/* PRICE */}
      <p className="text-2xl font-medium text-red-500">
        {variant ? `$${variant.price.toLocaleString()}` : "Select options"}
      </p>

      {/* DESCRIPTION */}
      <p className="text-neutral-400 text-sm leading-relaxed max-w-xl">
        {product.description}
      </p>

    </div>
  )
}