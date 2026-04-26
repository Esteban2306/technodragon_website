import { ProductVariantDetail } from "@/src/shared/types/product.types"

type GroupedAttribute = {
  name: string
  values: string[]
}

export function groupAttributes(
  variants: ProductVariantDetail[]
): GroupedAttribute[] {

  const map: Record<string, Set<string>> = {}

  variants.forEach(variant => {
    variant.attributes.forEach(attr => {
      if (!map[attr.name]) {
        map[attr.name] = new Set<string>()
      }

      map[attr.name].add(attr.value)
    })
  })

  return Object.entries(map).map(([name, values]) => ({
    name,
    values: Array.from(values)
  }))
}