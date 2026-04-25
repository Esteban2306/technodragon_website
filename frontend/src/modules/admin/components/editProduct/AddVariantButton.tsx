'use client';

import { Button } from '@/src/shared/components/button';
import { ProductCondition } from '@/src/shared/types/product-condition.enum';

export default function AddVariantButton({ setForm }: any) {
  const handleAdd = () => {
    setForm((prev: any) => {
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