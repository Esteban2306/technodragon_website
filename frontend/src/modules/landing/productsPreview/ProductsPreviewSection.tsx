'use client';

import { motion } from 'framer-motion';
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
import SwipeHint from './swipeHint';
import { useState } from 'react';
import { useIsVisible } from '@/src/shared/hooks/useIsViseble';
import {
  cardItem,
  cardsContainer,
  textContainer,
  textItem,
} from '@/src/shared/animations/card.animations';

type Props = {
  products: ProductPreview[];
};

export default function ProductsPreviewSection({ products }: Props) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { ref, isVisible } = useIsVisible<HTMLDivElement>();

  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <section ref={ref} className="relative p-8">
      <div className="absolute -right-30 -top-1 w-100 h-100 bg-red-600/20 rounded-full blur-3xl" />
      <div className="absolute -left-30 -top-1 w-100 h-100 bg-red-600/20 rounded-full blur-3xl" />

      <motion.div
        className="flex flex-col justify-center text-center mb-12"
        variants={textContainer}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl max-w-125 m-auto mb-4"
        >
          Portátiles y computadores destacados
        </motion.h1>

        <motion.span
          variants={textItem}
          className="text-[16px] max-w-177.5 m-auto text-gray-400"
        >
          Descubre nuestros portátiles y computadores más populares disponibles
          nuevos y reacondicionados con garantía.
        </motion.span>
      </motion.div>

      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
        }}
        onPointerDown={() => {
          setTimeout(() => setHasInteracted(true), 300);
        }}
        className="max-w-6xl mx-auto"
      >
        <motion.div
          variants={cardsContainer}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
        >
          <CarouselContent className="min-h-110 overflow-visible gap-6 sm:gap-4 md:gap-3 px-4 cursor-grab">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-3 py-6"
              >
                <motion.div variants={cardItem}>
                  {isMobile ? (
                    <ProductCardMobile product={product} />
                  ) : (
                    <ProductCardDesktop product={product} />
                  )}
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </motion.div>

        <CarouselPrevious className="hidden md:flex left-2" />
        <CarouselNext className="hidden md:flex right-2" />
      </Carousel>

      <SwipeHint visible={!hasInteracted} />
    </section>
  );
}
