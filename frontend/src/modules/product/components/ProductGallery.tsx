'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/src/shared/types/product.types';

type ProductGalleryProps = {
  images: ProductImage[];
};

export default function ProductGallery({ images }: ProductGalleryProps) {
  const safeImages = images.slice(0, 4);
  const featuredIndex = safeImages.findIndex((img) => img.isFeatured);
  const initialIndex = featuredIndex !== -1 ? featuredIndex : 0;
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);

  const mainImage = safeImages[selectedIndex];
  const thumbnails = safeImages.filter((_, i) => i !== selectedIndex);

  if (!safeImages.length) {
    return (
      <div className="flex items-center justify-center h-100 bg-neutral-900 rounded-xl">
        <span className="text-neutral-500">No images available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 lg:grid lg:grid-cols-[4fr_1fr]">
      <div className="relative w-full aspect-square bg-neutral-900 rounded-xl overflow-hidden">
        <Image
          src={mainImage.url}
          alt="product image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="grid grid-cols-3 gap-2 lg:grid-cols-1 max-h-100 lg:gap-4">
        {thumbnails.map((img) => (
          <button
            key={img.id}
            onClick={() => {
              const realIndex = safeImages.findIndex((i) => i.id === img.id);
              setSelectedIndex(realIndex);
            }}
            className="relative w-full aspect-square rounded-lg overflow-hidden   border border-neutral-800 hover:border-white transition"
          >
            <Image
              src={img.url}
              alt="thumbnail"
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}