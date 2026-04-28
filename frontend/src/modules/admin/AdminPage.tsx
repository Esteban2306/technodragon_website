'use client';

import SidebarAdmin from './sidebarAdmin/sidebarAdmin';
import MobileAdminMenu from './sidebarAdmin/MobileAdminMenu';
import CardAdmin from './components/cards/cardAdmin';
import { useState } from 'react';
import CreateProductStepper from './createProduct/stepper/CreateProductStepper';
import { AdminView } from './types/Admin.types';
import { useProductsPaginated } from './hooks/useProducts';
import { ProductFilters } from './types/product.payloads';
import { ProductCardData } from './components/cards/mockProducts';
import ProductFilterBar from './components/filters/ProductFilterBar';

const LIMIT = 20;

export default function AdminPage() {
  const [view, setView] = useState<AdminView>('product');
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [stockMode, setStockMode] = useState(false);
  const [filters, setFilters] = useState<ProductFilters>({ page: 1, limit: LIMIT });

  const { data, isLoading, isError } = useProductsPaginated(filters);

  const products = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / LIMIT);

  const adaptedProducts: ProductCardData[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description ?? '',
    slug: product.slug,
    category: { id: product.category?.id ?? '', name: product.category?.name ?? '' },
    brand: { id: product.brand?.id ?? '', name: product.brand?.name ?? '' },
    isFeatured: product.isFeatured,
    isActive: product.isActive,
    image: product.images?.[0]?.url ?? '',
    variants: product.variants.map((v) => ({
      id: v.id,
      sku: v.sku,
      price: v.price,
      stock: v.stock,
      isActive: v.isActive,
      condition: v.condition,
      attributes: v.attributes.map((a) => ({ name: a.name, value: a.value })),
    })),
  }));

  return (
    <div className="flex">
      <div className="hidden md:block">
        <SidebarAdmin active={view} setActive={setView} stockMode={stockMode} setStockMode={setStockMode} />
      </div>
      <MobileAdminMenu active={view} setActive={setView} stockMode={stockMode} setStockMode={setStockMode} />

      <div className="flex-1 min-w-0">
        {view === 'product' && (
          <>
            <div className="my-10 mx-4">
              <h3 className="text-2xl text-white mb-1">Gestión de Producto</h3>
              <p className="text-sm text-gray-400">Gestiona los productos, variantes y stock</p>
            </div>

            <div className="mx-4 mb-6">
              <ProductFilterBar
                filters={filters}
                total={total}
                isLoading={isLoading}
                onChange={setFilters}
              />
            </div>

            <div className="p-4">
              {isError ? (
                <p className="text-red-400 text-sm">Error al cargar productos.</p>
              ) : (
                <div className="grid gap-0.5 grid-cols-[repeat(auto-fit,minmax(307px,1fr))] items-start">
                  {isLoading
                    ? Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-48 rounded-xl bg-[#111] animate-pulse" />
                      ))
                    : adaptedProducts.map((product) => (
                        <CardAdmin
                          key={product.id}
                          product={product}
                          isOpen={openCardId === product.id}
                          stockMode={stockMode}
                          onToggle={() =>
                            setOpenCardId((prev) => (prev === product.id ? null : product.id))
                          }
                        />
                      ))}
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 py-8 flex-wrap">
                <button
                  onClick={() => setFilters((p) => ({ ...p, page: Math.max((p.page ?? 1) - 1, 1) }))}
                  disabled={(filters.page ?? 1) <= 1}
                  className="px-4 py-1.5 text-sm rounded-lg border border-[#2a2a2a] text-white disabled:opacity-30 hover:border-red-600 transition"
                >
                  ← Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    const cur = filters.page ?? 1;
                    return p === 1 || p === totalPages || Math.abs(p - cur) <= 1;
                  })
                  .reduce<(number | '...')[]>((acc, p, i, arr) => {
                    if (i > 0 && typeof arr[i - 1] === 'number' && (p as number) - (arr[i - 1] as number) > 1) {
                      acc.push('...');
                    }
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '...' ? (
                      <span key={`ellipsis-${i}`} className="text-gray-600 px-1">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setFilters((prev) => ({ ...prev, page: p as number }))}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition ${
                          filters.page === p
                            ? 'border-red-600 bg-red-600/10 text-white'
                            : 'border-[#2a2a2a] text-gray-400 hover:border-red-600'
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}

                <button
                  onClick={() => setFilters((p) => ({ ...p, page: Math.min((p.page ?? 1) + 1, totalPages) }))}
                  disabled={(filters.page ?? 1) >= totalPages}
                  className="px-4 py-1.5 text-sm rounded-lg border border-[#2a2a2a] text-white disabled:opacity-30 hover:border-red-600 transition"
                >
                  Siguiente →
                </button>
              </div>
            )}
          </>
        )}

        {view === 'create' && (
          <div className="p-6">
            <CreateProductStepper onFinish={() => setView('product')} />
          </div>
        )}
      </div>
    </div>
  );
}