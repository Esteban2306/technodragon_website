'use client';

import { useState } from 'react';
import { FolderTree, Tag } from 'lucide-react';

import CreateMetaDialog from '../productManagment/CreateProductDialog';

import { useCategoriesPaginated } from '../hooks/useCategories';
import { useBrandsPaginated } from '../hooks/useBrands';

import { StatCard } from './TopBar';
import { BrandsTable, CategoriesTable } from './tables';

type Tab = 'categories' | 'brands';

export default function CatalogView() {
  const [tab, setTab] = useState<Tab>('categories');
  const [createOpen, setCreateOpen] = useState(false);
  const [createMode, setCreateMode] = useState<'brand' | 'category'>(
    'category',
  );

  const { data: catData } = useCategoriesPaginated({ page: 1, limit: 1 });
  const { data: brandData } = useBrandsPaginated({ page: 1, limit: 1 });

  const totalCategories = catData?.meta.total ?? 0;
  const totalBrands = brandData?.meta.total ?? 0;

  const { data: activeBrandData } = useBrandsPaginated({
    page: 1,
    limit: 1,
    isActive: true,
  });
  const { data: rootCatData } = useCategoriesPaginated({
    page: 1,
    limit: 1,
    parentId: 'root',
  });

  const activeBrands = activeBrandData?.meta.total ?? 0;
  const rootCategories = rootCatData?.meta.total ?? 0;

  return (
    <>
      <div className="flex flex-col gap-6 p-6 max-w-300">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Gestión de Catálogo
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Administra las categorías y marcas disponibles en tu tienda
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="Total Categorías" value={totalCategories} />
          <StatCard label="Total Marcas" value={totalBrands} />
          <StatCard label="Categorías Raíz" value={rootCategories} />
          <StatCard
            label="Marcas Activas"
            value={activeBrands}
            sub={
              totalBrands > 0
                ? `${Math.round((activeBrands / totalBrands) * 100)}% del total`
                : '—'
            }
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-1 bg-[#0e0e0e] border border-[#1f1f1f] rounded-xl p-1 w-fit">
            <button
              onClick={() => setTab('categories')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === 'categories'
                  ? 'bg-[#7a1c1c] text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              Categorías
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  tab === 'categories'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#1a1a1a] text-gray-500'
                }`}
              >
                {totalCategories}
              </span>
            </button>
            <button
              onClick={() => setTab('brands')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                tab === 'brands'
                  ? 'bg-[#7a1c1c] text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Tag className="w-4 h-4" />
              Marcas
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  tab === 'brands'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#1a1a1a] text-gray-500'
                }`}
              >
                {totalBrands}
              </span>
            </button>
          </div>

          {tab === 'categories' ? (
            <CategoriesTable
              onEdit={(row) => console.log('edit category', row)}
              onCreate={() => {
                setCreateMode('category');
                setCreateOpen(true);
              }}
            />
          ) : (
            <BrandsTable
              onEdit={(row) => console.log('edit brand', row)}
              onCreate={() => {
                setCreateMode('brand');
                setCreateOpen(true);
              }}
            />
          )}
        </div>
      </div>

      <CreateMetaDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        defaultMode={createMode}
      />
    </>
  );
}
