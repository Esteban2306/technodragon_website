'use client';

import { useMediaQuery } from '@/src/shared/hooks/useMediaQuery';
import { ProductCardMobile } from '@/src/shared/components/ui/product-card/ProductCardMobile';
import { ProductCardDesktop } from '@/src/shared/components/ui/product-card/ProductCardDesktop';
import { ProductPreview } from '@/src/shared/types/catalog.types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/src/shared/components/carousel';

type Props = {
  products: ProductPreview[];
};

export default function ProductsPreviewSection({ products }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section className="p-8">
      <div className="flex flex-col justify-center text-center mb-12">
        <h1 className="text-3xl max-w-125 m-auto mb-4">
          Portátiles y computadores destacados
        </h1>

        <span className="text-[16px] max-w-177.5 m-auto text-gray-400">
          Descubre nuestros portátiles y computadores más populares disponibles
          nuevos y reacondicionados con garantía.
        </span>
      </div>

      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
        }}
        className="max-w-6xl mx-auto"
      >
        <CarouselContent className="min-h-110 overflow-visible px-4 cursor-grab">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-3 py-6 "
            >
              {isMobile ? (
                <ProductCardMobile product={product} />
              ) : (
                <ProductCardDesktop product={product} />
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex left-2" />
        <CarouselNext className="hidden md:flex right-2" />
      </Carousel>
    </section>
  );
}
