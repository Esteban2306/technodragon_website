'use client';

import { catalogCategories } from '@/src/shared/components/ui/navbar/catalog-categorie.data';
import { ProductCardBase } from '@/src/shared/components/ui/product-card/ProductCardBase';
import { getCategoryIcon } from '@/src/shared/utils/categoryIcons';
import { mockProducts } from './mockProducts';
import { SidebarProvider } from '@/src/shared/components/sidebar';
import { motion, easeOut } from 'framer-motion';
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
import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import MobileFilters from './MobileFilter';

export default function CatalogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
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
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10"
          >
            {catalogCategories.map((cat) => {
              const Icon = getCategoryIcon(cat.title);

              return (
                <motion.div
                  key={cat.title}
                  variants={itemVariants}
                  className="
                flex flex-col items-center justify-center
                bg-[#0F1316] border border-[#2D2F32]
                rounded-xl p-4 min-h-40
                hover:bg-red-900/10 transition
                "
                >
                  <div className="bg-red-950/60 p-4 mb-4 rounded-2xl">
                    <Icon className="w-8 h-8 text-red-500" />
                  </div>
                  <span className="text-sm text-white">{cat.title}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <div className="flex w-full">
          <aside className="hidden lg:block w-75 shrink-0">
            <FiltersSidebar />
          </aside>

          <div className="flex-1">
            <div className="max-w-7xl mx-auto px-6">
              <motion.div
                variants={productContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: '-80px' }}
                className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                lg:grid-cols-3 
                gap-6 
                p-10
                justify-items-center
            "
              >
                {mockProducts.map((product) => (
                  <motion.div key={product.id} variants={productItem}>
                    <ProductCardBase product={product} showCTA />
                  </motion.div>
                ))}
              </motion.div>
              <div className="flex justify-center mt-10">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                      />
                    </PaginationItem>

                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;

                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={currentPage === page}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
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
              <MobileFilters />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </SidebarProvider>
  );
}
