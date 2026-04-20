'use client'

import { useState } from "react"
import Image from "next/image"

type ProductGalleryProps = {
  images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const safeImages = images.slice(0, 4)

  const [selectedIndex, setSelectedIndex] = useState(0)

  const mainImage = safeImages[selectedIndex]
  const thumbnails = safeImages.filter((_, i) => i !== selectedIndex)

  if (!safeImages.length) {
    return (
      <div className="flex items-center justify-center h-100 bg-neutral-900 rounded-xl">
        <span className="text-neutral-500">No images available</span>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[4fr_1fr] gap-4">

      <div className="relative w-full aspect-square bg-neutral-900 rounded-xl overflow-hidden">
        <Image
          src={mainImage}
          alt="product image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col gap-4">
        {thumbnails.map((img, index) => (
          <button
            key={img}
            onClick={() => {
              const realIndex = safeImages.findIndex(i => i === img)
              setSelectedIndex(realIndex)
            }}
            className="relative w-full aspect-square rounded-lg overflow-hidden border border-neutral-800 hover:border-white transition"
          >
            <Image
              src={img}
              alt={`thumbnail ${index}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

    </div>
  )
}