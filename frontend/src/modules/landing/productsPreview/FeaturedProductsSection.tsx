'use client';

import { useCatalog } from '../../catalog/hook/useQueryCatalog';
import ProductsPreviewSection from './ProductsPreviewSection';
import { EmptyState } from '@/src/shared/components/ui/EmptyState/ErrorState';
import { ProductCardSkeleton } from '@/src/shared/components/ui/skeleton/ProductCardSkeleton';

export default function FeaturedProductsSection() {
  const { data, isLoading, isError } = useCatalog({
    featured: true,
    limit: 10,
  });

  if (isLoading) {
    return (
      <section className="p-8">
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <EmptyState
        title="Error cargando productos"
        description="No pudimos cargar los productos destacados."
      />
    );
  }

  if (!data || data.data.length === 0) {
    return (
      <EmptyState
        title="Sin productos destacados"
        description="No hay productos recomendados en este momento."
      />
    );
  }

  return <ProductsPreviewSection products={data.data} />;
}