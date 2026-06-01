'use client';

import { useState } from 'react';
import { Plus, Search, FolderTree, Tag } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/src/shared/components/table';
import { Button } from '@/src/shared/components/button';
import { Input } from '@/src/shared/components/input';

import { useCategoriesPaginated } from '../hooks/useCategories';
import { useBrandsPaginated } from '../hooks/useBrands';
import { useDeleteCategory } from '../hooks/useCategoryMutations';
import {
  useDeleteBrand,
  useActivateBrand,
  useDeactivateBrand,
} from '../hooks/useBrandMutations';

import { Category, CategoryQueryParams } from '../types/category.payloads';
import { Brand, BrandQueryParams } from '../types/brand.payloads';
import { Badge } from './TopBar';
import { ActionButtons } from './ActionButtons';

export function TableSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <TableRow key={i} className="border-[#1f1f1f]">
          {Array.from({ length: cols }).map((_, j) => (
            <TableCell key={j} className="py-3">
              <div className="h-4 rounded bg-[#1a1a1a] animate-pulse w-3/4" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

export function CategoriesTable({
  onEdit,
  onCreate,
}: {
  onEdit: (row: Category) => void;
  onCreate: () => void;
}) {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState<CategoryQueryParams>({
    page: 1,
    limit: 20,
  });

  const { data, isLoading, isError } = useCategoriesPaginated({
    ...query,
    search: search || undefined,
  });

  const deleteCategory = useDeleteCategory();

  const rows = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar categorías..."
            className="pl-9 bg-[#0e0e0e] border-[#1f1f1f] text-white placeholder:text-gray-600 h-9 text-sm"
          />
        </div>
        <Button
          onClick={onCreate}
          size="sm"
          className="bg-[#7a1c1c] hover:bg-[#8f2020] text-white gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Crear Categoría
        </Button>
      </div>

      <div className="rounded-xl border border-[#1f1f1f] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[#1f1f1f] hover:bg-transparent">
              <TableHead className="text-gray-500 text-xs font-medium uppercase tracking-wider bg-[#0a0a0a] py-3">
                Nombre
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium uppercase tracking-wider bg-[#0a0a0a] py-3">
                Slug
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium uppercase tracking-wider bg-[#0a0a0a] py-3">
                Tipo
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium uppercase tracking-wider bg-[#0a0a0a] py-3">
                Creado
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium uppercase tracking-wider bg-[#0a0a0a] py-3 text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton cols={5} />
            ) : isError ? (
              <TableRow className="border-[#1f1f1f]">
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-red-400 text-sm"
                >
                  Error al cargar categorías
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow className="border-[#1f1f1f]">
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-gray-600 text-sm"
                >
                  {search
                    ? 'Sin resultados para esa búsqueda'
                    : 'Haz clic en "Crear Categoría" para añadir una nueva'}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-[#1f1f1f] hover:bg-[#0f0f0f]"
                >
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                        <FolderTree className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <span className="text-white text-sm font-medium">
                        {row.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <code className="text-xs text-gray-400 bg-[#111] px-2 py-0.5 rounded">
                      {row.slug}
                    </code>
                  </TableCell>
                  <TableCell className="py-3">
                    <span className="text-xs text-gray-500">
                      {row.parentId ? 'Subcategoría' : 'Raíz'}
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-xs">
                    {row.createdAt
                      ? new Date(row.createdAt).toLocaleDateString('es-CO', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <ActionButtons
                      onEdit={() => onEdit(row)}
                      onDelete={() => deleteCategory.mutate(row.id)}
                      isDeleting={
                        deleteCategory.isPending &&
                        deleteCategory.variables === row.id
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {(data?.meta.totalPages ?? 0) > 1 && (
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>{total} categorías en total</span>
          <div className="flex gap-2">
            <button
              disabled={(query.page ?? 1) <= 1}
              onClick={() =>
                setQuery((q) => ({ ...q, page: (q.page ?? 1) - 1 }))
              }
              className="px-3 py-1 rounded-lg bg-[#111] border border-[#1f1f1f] hover:border-[#7a1c1c] disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Anterior
            </button>
            <span className="px-3 py-1">
              {query.page} / {data?.meta.totalPages}
            </span>
            <button
              disabled={(query.page ?? 1) >= (data?.meta.totalPages ?? 1)}
              onClick={() =>
                setQuery((q) => ({ ...q, page: (q.page ?? 1) + 1 }))
              }
              className="px-3 py-1 rounded-lg bg-[#111] border border-[#1f1f1f] hover:border-[#7a1c1c] disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function BrandsTable({
  onEdit,
  onCreate,
}: {
  onEdit: (row: Brand) => void;
  onCreate: () => void;
}) {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState<BrandQueryParams>({ page: 1, limit: 20 });

  const { data, isLoading, isError } = useBrandsPaginated({
    ...query,
    search: search || undefined,
  });

  const deleteBrand = useDeleteBrand();
  const activateBrand = useActivateBrand();
  const deactivateBrand = useDeactivateBrand();

  const rows = data?.data ?? [];
  const total = data?.meta.total ?? 0;

  const handleToggle = (id: string, isActive: boolean) => {
    if (isActive) {
      deactivateBrand.mutate(id);
    } else {
      activateBrand.mutate(id);
    }
  };

  const isToggling = (id: string) =>
    (activateBrand.isPending && activateBrand.variables === id) ||
    (deactivateBrand.isPending && deactivateBrand.variables === id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar marcas..."
            className="pl-9 bg-[#0e0e0e] border-[#1f1f1f] text-white placeholder:text-gray-600 h-9 text-sm"
          />
        </div>
        <Button
          onClick={onCreate}
          size="sm"
          className="bg-[#7a1c1c] hover:bg-[#8f2020] text-white gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Crear Marca
        </Button>
      </div>

      <div className="rounded-xl border border-[#1f1f1f] overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-[#1f1f1f] hover:bg-transparent">
              <TableHead className="text-gray-500 text-xs font-medium uppercase tracking-wider bg-[#0a0a0a] py-3">
                Marca
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium uppercase tracking-wider bg-[#0a0a0a] py-3">
                Slug
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium uppercase tracking-wider bg-[#0a0a0a] py-3">
                Estado
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium uppercase tracking-wider bg-[#0a0a0a] py-3">
                Creado
              </TableHead>
              <TableHead className="text-gray-500 text-xs font-medium uppercase tracking-wider bg-[#0a0a0a] py-3 text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableSkeleton cols={5} />
            ) : isError ? (
              <TableRow className="border-[#1f1f1f]">
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-red-400 text-sm"
                >
                  Error al cargar marcas
                </TableCell>
              </TableRow>
            ) : rows.length === 0 ? (
              <TableRow className="border-[#1f1f1f]">
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-gray-600 text-sm"
                >
                  {search
                    ? 'Sin resultados para esa búsqueda'
                    : 'Haz clic en "Crear Marca" para añadir una nueva'}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-[#1f1f1f] hover:bg-[#0f0f0f]"
                >
                  <TableCell className="py-3">
                    <div className="flex items-center gap-2.5">
                      {row.logo ? (
                        <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] overflow-hidden flex items-center justify-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={row.logo}
                            alt={row.name}
                            className="w-5 h-5 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                          <Tag className="w-3.5 h-3.5 text-gray-500" />
                        </div>
                      )}
                      <span className="text-white text-sm font-medium">
                        {row.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <code className="text-xs text-gray-400 bg-[#111] px-2 py-0.5 rounded">
                      {row.slug}
                    </code>
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge active={row.isActive} />
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-xs">
                    {row.createdAt
                      ? new Date(row.createdAt).toLocaleDateString('es-CO', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '—'}
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <ActionButtons
                      onEdit={() => onEdit(row)}
                      onDelete={() => deleteBrand.mutate(row.id)}
                      onToggle={() => handleToggle(row.id, row.isActive)}
                      isActive={row.isActive}
                      showToggle
                      isDeleting={
                        deleteBrand.isPending &&
                        deleteBrand.variables === row.id
                      }
                      isToggling={isToggling(row.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {(data?.meta.totalPages ?? 0) > 1 && (
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>{total} marcas en total</span>
          <div className="flex gap-2">
            <button
              disabled={(query.page ?? 1) <= 1}
              onClick={() =>
                setQuery((q) => ({ ...q, page: (q.page ?? 1) - 1 }))
              }
              className="px-3 py-1 rounded-lg bg-[#111] border border-[#1f1f1f] hover:border-[#7a1c1c] disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Anterior
            </button>
            <span className="px-3 py-1">
              {query.page} / {data?.meta.totalPages}
            </span>
            <button
              disabled={(query.page ?? 1) >= (data?.meta.totalPages ?? 1)}
              onClick={() =>
                setQuery((q) => ({ ...q, page: (q.page ?? 1) + 1 }))
              }
              className="px-3 py-1 rounded-lg bg-[#111] border border-[#1f1f1f] hover:border-[#7a1c1c] disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
