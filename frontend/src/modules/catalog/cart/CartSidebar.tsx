'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/src/shared/components/sheet';

import { ShoppingCart2 } from '@/src/shared/components/shopping-cart2';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CartSidebar({ open, onOpenChange }: Props) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-105 sm:w-125 px-4 bg-[#0b0b0c] border-l border-[#1a1a1a] text-white p-0 flex flex-col"
      >
        <SheetHeader className="p-6 border-b border-[#1a1a1a]">
          <SheetTitle className="text-lg font-semibold">
            Tu carrito
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-1">
          <ShoppingCart2 />
        </div>
      </SheetContent>
    </Sheet>
  );
}