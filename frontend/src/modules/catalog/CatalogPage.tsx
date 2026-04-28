'use client';

import { ProductCardBase } from '@/src/shared/components/ui/product-card/ProductCardBase';
import { getCategoryIcon } from '@/src/shared/utils/categoryIcons';
import { SidebarProvider } from '@/src/shared/components/sidebar';
import { motion, easeOut } from 'framer-motion';
import { useCatalog } from './hook/useQueryCatalog';
import FiltersSidebar from './FilterSideBar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '@/src/shared/components/dropdown-menu';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/src/shared/components/pagination';
import { useEffect, useMemo, useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import MobileFilters from './MobileFilter';
import { buildDynamicFilters } from '@/src/shared/helper/buildDynamicFilters';
import { CatalogFilters } from './types/filter.type';
import { ProductSkeletonGrid } from './components/ProductSkeletonGrid';
import { EmptyState } from '@/src/shared/components/ui/EmptyState/ErrorState';
import { useSearchParams } from 'next/navigation';

type Props = {
  initialCategoryId?: string;
};

export default function CatalogPage({ initialCategoryId }: Props) {
  const [filters, setFilters] = useState<CatalogFilters>({
    page: 1,
    limit: 9,
  });
  const { data, isLoading, isError } = useCatalog(filters);

  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('categoryId');

  useEffect(() => {
    if (!categoryFromUrl) return;

    setFilters((prev) => {
      if (prev.categoryId === categoryFromUrl) return prev;

      return {
        ...prev,
        categoryId: categoryFromUrl,
        page: 1,
      };
    });
  }, [categoryFromUrl]);

  const totalPages = data?.meta.totalPages ?? 1;

  const dynamicFilters = useMemo(() => {
    if (!data?.data) return null;

    return buildDynamicFilters(data.data);
  }, [data]);

  const categories = useMemo(() => {
    if (!data?.data || data.data.length === 0) return [];

    const map = new Map<string, { id: string; name: string }>();

    data.data.forEach((product) => {
      if (product?.categoryId && product?.categoryName) {
        map.set(product.categoryId, {
          id: product.categoryId,
          name: product.categoryName,
        });
      }
    });

    return Array.from(map.values());
  }, [data]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: easeOut,
      },
    },
  };

  const productContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const productItem = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
      filter: 'blur(10px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        delay: i * 0.05,
      },
    }),
  };

  return (
    <SidebarProvider>
      <section className="w-full py-20">
        <div className="mb-12 mt-1 px-2 lg:px-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="
      flex flex-wrap justify-center gap-4 mb-10
    "
          >
            {categories.map((cat) => {
              const Icon = getCategoryIcon(cat.name);

              return (
                <motion.div
                  key={cat.id}
                  variants={itemVariants}
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      categoryId:
                        prev.categoryId === cat.id ? undefined : cat.id,
                      page: 1,
                    }))
                  }
                  className={`
                    w-40 lg:w-55
                    flex flex-col items-center justify-center
                    bg-[#0F1316] border border-[#2D2F32]
                    rounded-xl p-4 min-h-40
                    cursor-pointer transition
                    ${
                      filters.categoryId === cat.id
                        ? 'border-red-500 bg-red-900/20'
                        : 'hover:bg-red-900/10'
                    }
                  `}
                >
                  <div className="bg-red-950/60 p-4 mb-4 rounded-2xl">
                    <Icon className="w-8 h-8 text-red-500" />
                  </div>
                  <span className="text-sm text-white text-center">
                    {cat.name}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="flex w-full">
          <aside className="hidden lg:block w-75 shrink-0">
            <FiltersSidebar
              dynamicFilters={dynamicFilters}
              filters={filters}
              setFilters={setFilters}
            />
          </aside>

          <div className="flex-1">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                variants={productContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-10 justify-items-center"
              >
                {isLoading ? (
                  <ProductSkeletonGrid count={6} />
                ) : isError ? (
                  <EmptyState
                    title="Error al cargar productos"
                    description="Algo salió mal. Intenta nuevamente."
                    action={
                      <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm"
                      >
                        Reintentar
                      </button>
                    }
                  />
                ) : data?.data?.length === 0 ? (
                  <EmptyState
                    title="No hay productos"
                    description="Prueba cambiando los filtros o explorando otras categorías."
                    action={
                      <button
                        onClick={() =>
                          setFilters({
                            page: 1,
                            limit: 9,
                          })
                        }
                        className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20"
                      >
                        Limpiar filtros
                      </button>
                    }
                  />
                ) : (
                  data?.data?.map((product, i) => (
                    <motion.div key={product.id} variants={productItem}>
                      <ProductCardBase product={product} showCTA />
                    </motion.div>
                  ))
                )}
              </motion.div>
              <div className="flex justify-center mt-10">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            page: Math.max((prev.page ?? 1) - 1, 1),
                          }));
                        }}
                      />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;

                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={filters.page === page}
                            onClick={() => {
                              setFilters((prev) => ({
                                ...prev,
                                page,
                              }));
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            page: Math.min((prev.page ?? 1) + 1, totalPages),
                          }))
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="
                w-14 h-14
                flex items-center justify-center
                rounded-full
                bg-red-600
                shadow-lg shadow-red-900/40
                hover:bg-red-500
                transition
                "
              >
                <SlidersHorizontal className="w-6 h-6 text-white" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              align="end"
              className="
                w-[320px]
                max-h-[80vh]
                overflow-y-auto
                rounded-xl
                border border-[#2D2F32]
                bg-[#0F1316]
                p-3
            "
            >
              <MobileFilters
                dynamicFilters={dynamicFilters}
                filters={filters}
                setFilters={setFilters}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </SidebarProvider>
  );
}
