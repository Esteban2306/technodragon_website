'use client'

import { useMemo, useState } from "react"
import { ProductDetail, ProductVariantDetail } from "@/src/shared/types/product.types"

type SelectedAttributes = Record<string, string>

type UseProductVariantReturn = {
  selectedAttributes: SelectedAttributes
  setSelectedAttributes: React.Dispatch<React.SetStateAction<SelectedAttributes>>
  selectedVariant: ProductVariantDetail | undefined
}

export function useProductVariant(
  product: ProductDetail
): UseProductVariantReturn {

  const [selectedAttributes, setSelectedAttributes] =
    useState<SelectedAttributes>({})

  const selectedVariant = useMemo(() => {
    return product.variants.find(v =>
      v.attributes.every(attr =>
        selectedAttributes[attr.name] === attr.value
      )
    )
  }, [selectedAttributes, product.variants])

  return {
    selectedAttributes,
    setSelectedAttributes,
    selectedVariant
  }
}