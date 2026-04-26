import { Check } from 'lucide-react';

import {
  useCollapsible,
} from '@/src/shared/components/collapsible';

import { Props } from '../../createProduct/stepper/types/fromProps.types';

const mockBrands = [
  { id: '1', name: 'Logitech' },
  { id: '2', name: 'Razer' },
];

const mockCategories = [
  'Electrónica > Periféricos > Teclados',
  'Electrónica > Periféricos > Mouse',
  'Electrónica > Audio > Audífonos',
];


export function BrandOptions({ brands, form, setForm }: any) {
  return (
    <>
      {brands.map((brand: any) => (
        <button
          key={brand.id}
          onClick={() =>
            setForm({
              ...form,
              classification: {
                ...form.classification,
                brandId: brand.id, // 🔥 FIX
              },
            })
          }
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition
            hover:bg-[#1a1a1a]
            ${
              form.classification?.brandId === brand.id
                ? 'bg-[#7a1c1c] text-white'
                : 'text-gray-300'
            }
          `}
        >
          {brand.name}

          {form.classification?.brandId === brand.id && (
            <Check className="size-4" />
          )}
        </button>
      ))}
    </>
  );
}

export function CategoryOptions({ categories, form, setForm }: any) {
  return (
    <>
      {categories.map((cat: any) => (
        <button
          key={cat.id}
          onClick={() =>
            setForm({
              ...form,
              classification: {
                ...form.classification,
                categoryId: cat.id, // 🔥 FIX
              },
            })
          }
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition
            hover:bg-[#1a1a1a]
            ${
              form.classification?.categoryId === cat.id
                ? 'bg-[#7a1c1c] text-white'
                : 'text-gray-300'
            }
          `}
        >
          {cat.name}

          {form.classification?.categoryId === cat.id && (
            <Check className="size-4" />
          )}
        </button>
      ))}
    </>
  );
}