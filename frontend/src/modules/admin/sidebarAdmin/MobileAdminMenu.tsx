'use client';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from '@/src/shared/components/dropdown-menu';

import { useState } from 'react';
import { Boxes, Menu, Package, PlusCircle, Tags } from 'lucide-react';

import { AdminView } from '../types/Admin.types';

export default function MobileAdminMenu({
  active,
  setActive,
}: {
  active: AdminView;
  setActive: (value: AdminView) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleChange = (view: AdminView) => {
    setActive(view);
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button className="bg-[#7a1c1c] hover:bg-[#5c1515] text-white p-4 rounded-full shadow-lg">
            <Menu className="w-5 h-5" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="top"
          align="end"
          className="w-64 bg-[#0b0b0c] text-gray-300 rounded-xl border border-[#1a1a1a] p-2"
        >
          <DropdownMenuGroup>
            <p className="px-2 py-1 text-xs text-gray-500 uppercase">
              Gestión
            </p>

            <DropdownMenuItem
              onClick={() => handleChange('product')}
              className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer ${
                active === 'product' ? 'bg-[#7a1c1c]' : ''
              }`}
            >
              <Package size={16} />
              Gestión de producto
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleChange('create')}
              className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer ${
                active === 'create' ? 'bg-[#7a1c1c]' : ''
              }`}
            >
              <PlusCircle size={16} />
              Crear producto
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <p className="px-2 py-1 text-xs text-gray-500 uppercase">
              Inventario
            </p>

            <DropdownMenuItem
              onClick={() => handleChange('stock')}
              className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer ${
                active === 'stock' ? 'bg-[#7a1c1c]' : ''
              }`}
            >
              <Boxes size={16} />
              Gestión de stock
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => handleChange('categories')}
              className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer ${
                active === 'categories' ? 'bg-[#7a1c1c]' : ''
              }`}
            >
              <Tags size={16} />
              Categorías / Marcas
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}