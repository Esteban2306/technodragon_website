// /modules/product/types/product.types.ts

import { ProductCondition } from "./product-condition.enum"
import { CatalogAttribute } from "./catalog.types"

export type ProductVariantDetail = {
  id: string
  price: number
  stock: number

  condition: ProductCondition
  isActive: boolean

  attributes: CatalogAttribute[]
}

export type ProductDetail = {
  id: string
  slug: string

  name: string
  description?: string

  brand: {
    id: string
    name: string
  }

  category: {
    id: string
    name: string
  }

  images: string[]

  variants: ProductVariantDetail[]

  isActive: boolean
}

export type ProductPageProps = {
  params: {
    id: string
  }
}