'use client';

import { Tag, Layers, ChevronDown } from 'lucide-react';

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from '@/src/shared/components/collapsible';

import { Props } from '../types/fromProps.types';

import {
  BrandOptions,
  CategoryOptions,
} from '../../../components/clasification/ClasificationOptions';

import { useBrands } from '../../../hooks/useBrands';
import { useCategories } from '../../../hooks/useCategories';

export default function StepClassification({ form, setForm }: Props) {
  const { data: brands = [] } = useBrands();
  const { data: categories = [] } = useCategories();

  const selectedBrand = brands.find(
    (b) => b.id === form.classification?.brandId
  );

  const selectedCategory = categories.find(
    (c) => c.id === form.classification?.categoryId
  );

  return (
    <div className="space-y-8 py-10">
      <div className="flex items-center gap-2">
        <Layers className="size-5 text-[#7a1c1c]" />
        <h2 className="text-lg font-semibold">Clasificación</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* BRAND */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <Tag className="size-4" />
            Marca
          </label>

          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center justify-between bg-[#111] border border-[#1a1a1a] rounded-md px-3 py-2 text-sm hover:border-[#7a1c1c] transition">

              <span className={selectedBrand ? 'text-white' : 'text-gray-500'}>
                {selectedBrand?.name || 'Selecciona una marca'}
              </span>

              <ChevronDown className="size-4 text-gray-500" />
            </CollapsibleTrigger>

            <CollapsiblePanel className="mt-2 bg-[#0b0b0c] border border-[#1a1a1a] rounded-md p-1">
              <BrandOptions
                brands={brands}
                form={form}
                setForm={setForm}
              />
            </CollapsiblePanel>
          </Collapsible>
        </div>

        {/* CATEGORY */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <Layers className="size-4" />
            Categoría
          </label>

          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center justify-between bg-[#111] border border-[#1a1a1a] rounded-md px-3 py-2 text-sm hover:border-[#7a1c1c] transition">

              <span className={selectedCategory ? 'text-white' : 'text-gray-500'}>
                {selectedCategory?.name || 'Selecciona una categoría'}
              </span>

              <ChevronDown className="size-4 text-gray-500" />
            </CollapsibleTrigger>

            <CollapsiblePanel className="mt-2 bg-[#0b0b0c] border border-[#1a1a1a] rounded-md p-1">
              <CategoryOptions
                categories={categories}
                form={form}
                setForm={setForm}
              />
            </CollapsiblePanel>
          </Collapsible>
        </div>

      </div>
    </div>
  );
}