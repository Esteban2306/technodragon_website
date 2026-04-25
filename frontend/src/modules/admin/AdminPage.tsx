'use client';

import SidebarAdmin from './sidebarAdmin/sidebarAdmin';
import MobileAdminMenu from './sidebarAdmin/MobileAdminMenu';
import { ProductCardData } from './components/cards/mockProducts';
import CardAdmin from './components/cards/cardAdmin';
import { useState } from 'react';
import CreateProductStepper from './createProduct/stepper/CreateProductStepper';

import { AdminView } from './types/Admin.types';
import { useProducts } from './hooks/useProducts';

export default function AdminPage() {
  const [view, setView] = useState<AdminView>('product');
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const [stockMode, setStockMode] = useState(false);
  const { data: products, isLoading, isError } = useProducts();

  const adaptedProducts: ProductCardData[] =
  products?.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description ?? '',
    slug: product.slug,
    category: {
      id: product.category?.id ?? '',
      name: product.category?.name ?? '',
    },
    brand: {
      id: product.brand?.id ?? '',
      name: product.brand?.name ?? '',
    },
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
      attributes: v.attributes.map((a) => ({
        name: a.name,
        value: a.value,
      })),
    })),
  })) || [];

  return (
    <>
      <div className="flex">
        <div className="hidden md:block">
          <SidebarAdmin
            active={view}
            setActive={setView}
            stockMode={stockMode}
            setStockMode={setStockMode}
          />
        </div>

        <MobileAdminMenu
          active={view}
          setActive={setView}
          stockMode={stockMode}
          setStockMode={setStockMode}
        />

        <div className="flex-1">
          {view === 'product' && (
            <>
              <div id="#product" className="my-10 mx-4">
                <h3 className="text-2xl text-white mb-3">
                  Gestion de Producto
                </h3>
                <p className="text-sm text-gray-400">
                  Gestiona los productos, variantes y stock
                </p>
              </div>
              <div className="p-4">
                <div
                  className="
                grid 
                gap-0.5
                grid-cols-[repeat(auto-fit,minmax(307px,1fr))]
                items-start
                "
                >
                  {adaptedProducts?.map((product) => (
                    <CardAdmin
                      key={product.id}
                      product={product}
                      isOpen={openCardId === product.id}
                      stockMode={stockMode}
                      onToggle={() =>
                        setOpenCardId((prev) =>
                          prev === product.id ? null : product.id,
                        )
                      }
                    />
                  ))}
                </div>
              </div>
            </>
          )}
          {view === 'create' && (
            <div className="p-6">
              <CreateProductStepper onFinish={() => setView('product')} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
