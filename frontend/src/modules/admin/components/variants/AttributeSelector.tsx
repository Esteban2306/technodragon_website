'use client';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/src/shared/components/popover';

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from '@/src/shared/components/collapsible';

import AttributeItem from './AttributeItem';
import { useState } from 'react';
import { CreateVariantForm } from '../../createProduct/stepper/types/fromProps.types';

type Attribute = {
  name: string;
  value: string;
};

type Props = {
  variant: CreateVariantForm;
  update: <K extends keyof CreateVariantForm>(
    field: K,
    value: CreateVariantForm[K],
  ) => void;
};

const suggested = [
  {
    name: 'Procesador',
    values: ['Intel Core i9', 'Intel Core i7', 'AMD Ryzen 7', 'AMD Ryzen 9'],
  },
  { name: 'RAM', values: ['8GB', '16GB', '32GB', '64GB'] },
  { name: 'SSD', values: ['256GB', '512GB', '1TB'] },
];

export default function AttributeSelector({ variant, update }: Props) {
  const [isCustomOpen, setIsCustomOpen] = useState(false);
  const [customAttr, setCustomAttr] = useState({
    name: '',
    value: '',
  });
  const addAttribute = (attr: Attribute) => {
    update('attributes', [...variant.attributes, attr]);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-400">Atributos</p>

      <div className="flex flex-wrap gap-2">
        {variant.attributes.map((attr: Attribute, i: number) => (
          <AttributeItem
            key={i}
            attr={attr}
            onRemove={() => {
              const updated = variant.attributes.filter(
                (_: Attribute, index: number) => index !== i,
              );

              update('attributes', updated);
            }}
          />
        ))}

        <Popover>
          <PopoverTrigger asChild>
            <button className="px-2 py-1 text-xs border cursor-pointer border-[#1a1a1a] rounded-md">
              + Añadir atributo
            </button>
          </PopoverTrigger>

          <PopoverContent className="bg-black text-white p-4 max-h-80 overflow-y-auto">
            {suggested.map((group) => (
              <div key={group.name}>
                <p className="text-xs text-gray-400">{group.name}</p>

                {group.values.map((val) => (
                  <button
                    key={val}
                    onClick={() =>
                      addAttribute({ name: group.name, value: val })
                    }
                    className="block w-full cursor-pointer text-left px-2 py-1 hover:bg-red-900/50 rounded"
                  >
                    {val}
                  </button>
                ))}
              </div>
            ))}

            <Collapsible open={isCustomOpen} onOpenChange={setIsCustomOpen}>
              <CollapsibleTrigger>
                <div className="hover:bg-red-900/40 rounded-lg px-2 py-1 text-xs  cursor-pointer mt-4">
                  <span className="text-xs text-[#7a1c1c] cursor-pointer">
                    + Crear atributo personalizado
                  </span>
                </div>
              </CollapsibleTrigger>

              <CollapsiblePanel className="mt-3 space-y-2">
                <input
                  placeholder="Nombre (ej: Color)"
                  value={customAttr.name}
                  onChange={(e) =>
                    setCustomAttr({ ...customAttr, name: e.target.value })
                  }
                  className="w-full bg-[#111] border border-[#1a1a1a] rounded-md px-2 py-1 text-xs outline-none focus:border-[#7a1c1c]"
                />

                <input
                  placeholder="Valor (ej: Rojo)"
                  value={customAttr.value}
                  onChange={(e) =>
                    setCustomAttr({ ...customAttr, value: e.target.value })
                  }
                  className="w-full bg-[#111] border border-[#1a1a1a] rounded-md px-2 py-1 text-xs outline-none focus:border-[#7a1c1c]"
                />

                <button
                  onClick={() => {
                    if (!customAttr.name || !customAttr.value) return;

                    addAttribute(customAttr);

                    setCustomAttr({ name: '', value: '' });
                    setIsCustomOpen(false);
                  }}
                  className="w-full text-xs bg-[#7a1c1c] py-1 rounded-md hover:bg-[#5c1515]"
                >
                  Guardar atributo
                </button>
              </CollapsiblePanel>
            </Collapsible>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
