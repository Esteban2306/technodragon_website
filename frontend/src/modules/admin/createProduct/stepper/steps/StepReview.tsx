import { Boxes, PackageCheck } from 'lucide-react';
import { Props } from '../types/fromProps.types';
import { formatPriceCOP } from '@/src/shared/helper/formatPrice';

export default function StepReview({ form, setForm }: Props) {
  const totalStock = form.variants.reduce((acc, v) => acc + v.stock, 0);

  return (
    <div className="space-y-8 py-10">
      <div className="flex items-center gap-3">
        <PackageCheck className="size-6 text-[#7a1c1c]" />
        <div>
          <h2 className="text-xl font-semibold">Revisión final</h2>
          <p className="text-sm text-gray-400">
            Verifica la información antes de crear el producto
          </p>
        </div>
      </div>

      <div className="bg-[#0b0b0c] border border-[#1a1a1a] rounded-xl p-5 space-y-3">
        <h3 className="text-sm text-gray-400">Información básica</h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Nombre</p>
            <p>{form.name || '-'}</p>
          </div>

          <div>
            <p className="text-gray-500">Stock total</p>
            <p>{totalStock}</p>
          </div>

          <div>
            <p className="text-gray-500">Marca</p>
            <p>{form.classification.brandId || '-'}</p>
          </div>

          <div>
            <p className="text-gray-500">Categoría</p>
            <p>{form.classification.categoryId || '-'}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Boxes className="size-5 text-[#7a1c1c]" />
          <h3 className="text-md font-semibold">Variantes</h3>
        </div>

        {form.variants.length === 0 ? (
          <p className="text-sm text-gray-500">No hay variantes creadas</p>
        ) : (
          <div className="space-y-3">
            {form.variants.map((variant, i) => (
              <div
                key={variant.id}
                className="bg-[#0b0b0c] border border-[#1a1a1a] rounded-lg p-4 space-y-3"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Variante {i + 1}</span>

                  <span className="text-gray-400">Stock: {variant.stock}</span>
                </div>

                <div className="text-sm">
                  <span className="text-gray-500">Precio: </span>
                  <span>{formatPriceCOP(variant.price)}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {variant.attributes.length === 0 ? (
                    <span className="text-xs text-gray-500">Sin atributos</span>
                  ) : (
                    variant.attributes.map((attr, idx) => (
                      <div
                        key={idx}
                        className="text-xs px-2 py-1 bg-[#111] border border-[#1a1a1a] rounded-md"
                      >
                        {attr.name}: {attr.value}
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
