'use client'

import { ProductVariantDetail } from "@/src/shared/types/product.types"
import { useMemo, useState } from "react"
import { useAddToCart } from "../../hooks/useAddToCart"

type Props = {
  variant?: ProductVariantDetail
}

type VariantStatus =
  | "NO_MATCH"
  | "INACTIVE"
  | "OUT_OF_STOCK"
  | "AVAILABLE"

export default function AddToCartSection({ variant }: Props) {
  const [quantity, setQuantity] = useState(1)

  const { mutate: addToCart, isPending } = useAddToCart()

  const status: VariantStatus = useMemo(() => {
    if (!variant) return "NO_MATCH"
    if (!variant.isActive) return "INACTIVE"
    if (variant.stock === 0) return "OUT_OF_STOCK"
    return "AVAILABLE"
  }, [variant])

  const isDisabled = status !== "AVAILABLE" || isPending

  const statusText = {
    NO_MATCH: "Selecciona una combinación válida",
    INACTIVE: "Producto no disponible",
    OUT_OF_STOCK: "Sin stock",
    AVAILABLE: "Disponible",
  }

  const handleAddToCart = () => {
    if (!variant) return

    addToCart({
      variantId: variant.id,
      quantity,
    })
  }

  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-neutral-800 pt-6">

      <span className="text-sm text-neutral-400">
        {statusText[status]}
      </span>

      <div className="flex items-center gap-3">

        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          disabled={isPending}
          className="px-3 py-1 border border-neutral-700 rounded-md text-white"
        >
          -
        </button>

        <span className="text-white">{quantity}</span>

        <button
          onClick={() => setQuantity(q => q + 1)}
          disabled={isPending}
          className="px-3 py-1 border border-neutral-700 rounded-md text-white"
        >
          +
        </button>

      </div>

      <button
        onClick={handleAddToCart}
        disabled={isDisabled}
        className={`
          w-full py-3 rounded-md font-medium transition
          ${isDisabled
            ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 text-white"
          }
        `}
      >
        {isPending ? "Añadiendo..." : "Añadir al carrito"}
      </button>

    </div>
  )
}