'use client';

import { Plus, Boxes } from 'lucide-react';
import { useState } from 'react';
import VariantList from '../../../components/variants/VariantList';
import { CreateVariantForm, Props } from '../types/fromProps.types';

export default function StepVariants({ form, setForm }: Props) {
  const addVariant = () => {
    const newVariant: CreateVariantForm = {
      id: crypto.randomUUID(),
      sku: '',
      price: 0,
      stock: 0,
      attributes: [],
      isActive: true,
    };

    setForm((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));
  };

  return (
    <div className="space-y-8 py-10">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-2">
            <Boxes className="size-5 text-[#7a1c1c]" />

            <h2 className="text-lg font-semibold">Variantes y atributos</h2>
            <p className="text-sm text-gray-400">
              Configura precios, stock y atributos del producto
            </p>
          </div>
        </div>

        <button
          onClick={addVariant}
          className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#111] border border-[#1a1a1a] hover:border-[#7a1c1c]"
        >
          <Plus className="size-4" />
          Agregar variante
        </button>
      </div>

      <VariantList variants={form.variants} setForm={setForm} />
    </div>
  );
}
