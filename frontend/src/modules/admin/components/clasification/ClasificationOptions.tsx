import { Check } from 'lucide-react';
import { useCollapsible } from '@/src/shared/components/collapsible';
import { CreateProductForm } from '../../createProduct/stepper/types/fromProps.types';

type Brand = {
  id: string;
  name: string;
};

type Category = {
  id: string;
  name: string;
};

type BrandOptionsProps = {
  brands: Brand[];
  form: CreateProductForm;
  setForm: React.Dispatch<React.SetStateAction<CreateProductForm>>;
};

type CategoryOptionsProps = {
  categories: Category[];
  form: CreateProductForm;
  setForm: React.Dispatch<React.SetStateAction<CreateProductForm>>;
};

const mockBrands: Brand[] = [
  { id: '1', name: 'Logitech' },
  { id: '2', name: 'Razer' },
];

const mockCategories: Category[] = [
  { id: '1', name: 'Electrónica > Periféricos > Teclados' },
  { id: '2', name: 'Electrónica > Periféricos > Mouse' },
  { id: '3', name: 'Electrónica > Audio > Audífonos' },
];

export function BrandOptions({ brands, form, setForm }: BrandOptionsProps) {
  return (
    <>
      {brands.map((brand: Brand) => (
        <button
          key={brand.id}
          onClick={() =>
            setForm({
              ...form,
              classification: {
                ...form.classification,
                brandId: brand.id,
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

export function CategoryOptions({ categories, form, setForm }: CategoryOptionsProps) {
  return (
    <>
      {categories.map((cat: Category) => (
        <button
          key={cat.id}
          onClick={() =>
            setForm({
              ...form,
              classification: {
                ...form.classification,
                categoryId: cat.id,
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