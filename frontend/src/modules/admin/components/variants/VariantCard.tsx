import { Trash2 } from 'lucide-react';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from '@/src/shared/components/collapsible';
import AttributeSelector from './AttributeSelector';
import {
  CreateVariantForm,
  Props,
} from '../../createProduct/stepper/types/fromProps.types';
import { useState } from 'react';
import { formatPriceCOP, parseNumber } from '@/src/shared/helper/formatPrice';
import { ProductCondition } from '@/src/shared/types/product-condition.enum';
import { SetEditFormFn } from '../../types/editProductForm.types';

type VariantCardProps = {
  variant: CreateVariantForm;
  index: number;
  setForm: SetEditFormFn;
};

export default function VariantCard({
  variant,
  setForm,
  index,
}: VariantCardProps) {
  const [priceInput, setPriceInput] = useState(
    variant.price ? formatPriceCOP(variant.price) : '',
  );

  const [stockInput, setStockInput] = useState(
    variant.stock ? String(variant.stock) : '',
  );

  const conditionOptions = [
    { value: ProductCondition.NEW, label: 'Nuevo' },
    { value: ProductCondition.REFURBISHED, label: 'Reacondicionado' },
  ];

  const update = <K extends keyof CreateVariantForm>(
    field: K,
    value: CreateVariantForm[K],
  ) => {
    setForm((prev) => {
      if (!prev) return prev;
      const updated = [...prev.variants];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, variants: updated };
    });
  };

  const remove = () => {
    setForm((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        variants: prev.variants.filter((_, i) => i !== index),
      };
    });
  };

  const stockColor =
    variant.stock > 10
      ? 'bg-green-500'
      : variant.stock > 0
        ? 'bg-yellow-500'
        : 'bg-red-500';

  return (
    <Collapsible defaultOpen>
      <div className="border border-[#1a1a1a] rounded-xl bg-[#0b0b0c] p-4 space-y-4">
        <div className="flex items-center justify-between">
          <CollapsibleTrigger className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${stockColor}`} />
            <span className="text-sm font-medium">Variante {index + 1}</span>
          </CollapsibleTrigger>

          <button onClick={remove} className="cursor-pointer">
            <Trash2 className="size-4 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <CollapsiblePanel className="space-y-4">
          <AttributeSelector variant={variant} update={update} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Condición</label>

              <select
                value={variant.condition}
                onChange={(e) =>
                  update('condition', e.target.value as ProductCondition)
                }
                className="bg-[#111] border border-[#1a1a1a] rounded-md px-3 py-2 text-sm"
              >
                {conditionOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Stock</label>

              <input
                type="text"
                inputMode="numeric"
                value={stockInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setStockInput(value);
                  update('stock', Number(value) || 0);
                }}
                className="bg-[#111] border border-[#1a1a1a] rounded-md px-3 py-2 text-sm"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">SKU</label>

              <input
                value={variant.sku ?? ''}
                onChange={(e) => update('sku', e.target.value)}
                className="bg-[#111] border border-[#1a1a1a] rounded-md px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Precio</label>

            <input
              type="text"
              inputMode="numeric"
              value={priceInput}
              onChange={(e) => {
                const value = e.target.value;
                const numericValue = parseNumber(value);

                setPriceInput(formatPriceCOP(numericValue));
                update('price', numericValue);
              }}
              className="bg-[#111] border border-[#1a1a1a] rounded-md px-3 py-2 text-sm w-full"
            />
          </div>
        </CollapsiblePanel>
      </div>
    </Collapsible>
  );
}
