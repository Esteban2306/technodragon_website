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

export function BrandOptions({ form, setForm }: Props) {
  const { setIsOpen } = useCollapsible();

  return (
    <>
      {mockBrands.map((brand) => (
        <button
          key={brand.id}
          onClick={() => {
            setForm({
              ...form,
              classification: {
                ...form.classification,
                brandId: brand.name,
              },
            });
          }}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition
            hover:bg-[#1a1a1a]
            ${
              form.classification?.brandId === brand.name
                ? 'bg-[#7a1c1c] text-white'
                : 'text-gray-300'
            }
          `}
        >
          {brand.name}
          {form.classification?.brandId === brand.id && <Check className="size-4" />}
        </button>
      ))}
    </>
  );
}

export function CategoryOptions({ form, setForm }: Props) {
  const { setIsOpen } = useCollapsible();

  return (
    <>
      {mockCategories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            setForm({
              ...form,
              classification: {
                ...form.classification,
                categoryId: cat,
              },
            });
          }}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition
            hover:bg-[#1a1a1a]
            ${
              form.classification?.categoryId === cat
                ? 'bg-[#7a1c1c] text-white'
                : 'text-gray-300'
            }
          `}
        >
          {cat}
          {form.classification?.categoryId === cat && (
            <Check className="size-4" />
          )}
        </button>
      ))}
    </>
  );
}