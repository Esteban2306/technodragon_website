// components/filters/ProductFilterBar.tsx
'use client';

import { useEffect, useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { ProductFilters } from '../../types/product.payloads';
import { ProductCondition } from '@/src/shared/types/product-condition.enum';
import { useBrands } from '../../hooks/useBrands';
import { useCategories } from '../../hooks/useCategories';

type Props = {
  filters: ProductFilters;
  total: number;
  isLoading: boolean;
  onChange: (filters: ProductFilters) => void;
};

export default function ProductFilterBar({ filters, total, isLoading, onChange }: Props) {
  const [search, setSearch] = useState(filters.search ?? '');
  const { data: brands = [] } = useBrands();
  const { data: categories = [] } = useCategories();

  const hasActiveFilters =
    !!filters.search ||
    filters.isActive !== undefined ||
    filters.isFeatured !== undefined ||
    !!filters.brandId ||
    !!filters.categoryId ||
    !!filters.condition;

  useEffect(() => {
    const t = setTimeout(() => {
      onChange({ ...filters, search: search || undefined, page: 1 });
    }, 400);
    return () => clearTimeout(t);
  }, [search]);

  const setFilter = <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
    onChange({ ...filters, [key]: value, page: 1 });
  };

  const clearFilters = () => {
    setSearch('');
    onChange({ page: 1, limit: filters.limit });
  };

  return (
    <div className="bg-[#0d0d0f] border border-[#1e1e22] rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <SlidersHorizontal className="w-3.5 h-3.5" />
        <span>Filtros</span>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-auto flex items-center gap-1 text-red-500 hover:text-red-400 transition"
          >
            <X className="w-3 h-3" /> Limpiar
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre, slug o marca..."
            className="w-full bg-[#111] border border-[#2a2a2a] text-white text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-red-600 transition"
          />
        </div>

        <select
          value={filters.brandId ?? ''}
          onChange={(e) => setFilter('brandId', e.target.value || undefined)}
          className="bg-[#111] border border-[#2a2a2a] text-sm text-white rounded-lg px-3 py-2 focus:outline-none focus:border-red-600 transition min-w-36"
        >
          <option value="">Todas las marcas</option>
          {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>

        <select
          value={filters.categoryId ?? ''}
          onChange={(e) => setFilter('categoryId', e.target.value || undefined)}
          className="bg-[#111] border border-[#2a2a2a] text-sm text-white rounded-lg px-3 py-2 focus:outline-none focus:border-red-600 transition min-w-36"
        >
          <option value="">Todas las categorías</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <select
          value={filters.condition ?? ''}
          onChange={(e) => setFilter('condition', e.target.value || undefined)}
          className="bg-[#111] border border-[#2a2a2a] text-sm text-white rounded-lg px-3 py-2 focus:outline-none focus:border-red-600 transition"
        >
          <option value="">Condición: todas</option>
          <option value={ProductCondition.NEW}>Nuevo</option>
          <option value={ProductCondition.REFURBISHED}>Reacondicionado</option>
        </select>

        <select
          value={filters.isActive === undefined ? '' : String(filters.isActive)}
          onChange={(e) =>
            setFilter('isActive', e.target.value === '' ? undefined : e.target.value === 'true')
          }
          className="bg-[#111] border border-[#2a2a2a] text-sm text-white rounded-lg px-3 py-2 focus:outline-none focus:border-red-600 transition"
        >
          <option value="">Estado: todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>

        <select
          value={filters.isFeatured === undefined ? '' : String(filters.isFeatured)}
          onChange={(e) =>
            setFilter('isFeatured', e.target.value === '' ? undefined : e.target.value === 'true')
          }
          className="bg-[#111] border border-[#2a2a2a] text-sm text-white rounded-lg px-3 py-2 focus:outline-none focus:border-red-600 transition"
        >
          <option value="">Destacado: todos</option>
          <option value="true">Destacados</option>
          <option value="false">No destacados</option>
        </select>
      </div>

      <p className="text-xs text-gray-500">
        {isLoading
          ? 'Cargando...'
          : `${total} producto${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`}
      </p>
    </div>
  );
}