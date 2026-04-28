'use client';

import { Button } from '@/src/shared/components/button';
import { ProductCondition } from '@/src/shared/types/product-condition.enum';
import { EditProductForm } from '../../types/editProductForm.types';

type AddVariantButtonProps = {
  setForm: React.Dispatch<React.SetStateAction<EditProductForm | null>>;
};


export default function AddVariantButton({ setForm }: AddVariantButtonProps) {
  const handleAdd = () => {
    setForm((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        variants: [
          ...prev.variants,
          {
            id: undefined,
            sku: '',
            price: 0,
            stock: 0,
            condition: ProductCondition.NEW,
            attributes: [],
            isActive: true,
          },
        ],
      };
    });
  };

  return (
    <Button variant="outline" onClick={handleAdd}>
      + Nueva variante
    </Button>
  );
}