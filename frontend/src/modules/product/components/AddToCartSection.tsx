'use client'

import { ProductVariantDetail } from "@/src/shared/types/product.types"
import { useMemo, useState } from "react"

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

  const status: VariantStatus = useMemo(() => {
    if (!variant) return "NO_MATCH"
    if (!variant.isActive) return "INACTIVE"
    if (variant.stock === 0) return "OUT_OF_STOCK"
    return "AVAILABLE"
  }, [variant])

  const isDisabled = status !== "AVAILABLE"

  const statusUI = useMemo(() => {
    switch (status) {
      case "NO_MATCH":
        return {
          text: "No hay productos con esta combinación. Ajusta los atributos.",
          color: "text-neutral-500",
          showWhatsApp: false,
        }

      case "INACTIVE":
        return {
          text: "Este producto no está disponible actualmente.",
          color: "text-red-500",
          showWhatsApp: true,
        }

      case "OUT_OF_STOCK":
        return {
          text: "Sin stock disponible por el momento.",
          color: "text-red-500",
          showWhatsApp: true,
        }

      case "AVAILABLE":
        return {
          text: "Disponible. Consulta por whatsapp y realiza tu compra.",
          color: "text-green-500",
          showWhatsApp: true,
        }
    }
  }, [status])

  return (
    <div className="mt-8 flex flex-col gap-4 border-t border-neutral-800 pt-6">

      {/* STATUS */}
      <div className="text-sm">
        <span className={statusUI.color}>
          {statusUI.text}
        </span>
      </div>

      {/* QUANTITY */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => setQuantity(q => Math.max(1, q - 1))}
          className="px-3 py-1 border border-neutral-700 rounded-md text-white"
        >
          -
        </button>

        <span className="text-white">{quantity}</span>

        <button
          onClick={() => setQuantity(q => q + 1)}
          className="px-3 py-1 border border-neutral-700 rounded-md text-white"
        >
          +
        </button>

      </div>

      {/* ADD TO CART */}
      <button
        disabled={isDisabled}
        className={`
          w-full py-3 rounded-md font-medium transition
          ${isDisabled
            ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700 text-white"
          }
        `}
      >
        Add to Cart
      </button>

      {/* WHATSAPP */}
      {statusUI.showWhatsApp && (
        <button
          className="w-full py-3 rounded-md border border-neutral-700 text-white hover:border-neutral-400 transition"
        >
          Consultar disponibilidad por WhatsApp
        </button>
      )}

    </div>
  )
}