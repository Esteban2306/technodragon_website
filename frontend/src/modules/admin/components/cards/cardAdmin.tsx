'use client';

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from '@/src/shared/components/collapsible';

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/src/shared/components/tooltip';

import Image from 'next/image';
import { useState } from 'react';
import type { ProductCardData } from './mockProducts';

import {
  Star,
  StarOff,
  Pencil,
  Trash,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/src/shared/components/popover';
import StockCounter from '@/src/shared/components/countCounter';
import EditProductDialog from '../editProduct/editProduct';
import {
  useDeleteProduct,
  useMarkAsFeatured,
  useToggleProductStatus,
} from '../../hooks/useProductMutations';

export default function CardAdmin({
  product,
  isOpen,
  onToggle,
  stockMode,
}: {
  product: ProductCardData;
  isOpen: boolean;
  stockMode: boolean | undefined;
  onToggle: () => void;
}) {
  const [featured, setFeatured] = useState(false);
  const [variants, setVariants] = useState(product.variants);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const { mutate: markAsFeatured } = useMarkAsFeatured();
  const { mutate: toggleProduct, isPending } = useToggleProductStatus();

  const updateVariantStock = (id: string, newStock: number) => {
    setVariants((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              stock: newStock,
              isActive: newStock > 0,
            }
          : v,
      ),
    );
  };

  const handleDeactivate = (id: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, stock: 0, isActive: false } : v)),
    );
  };
  const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);

  const getStockState = (stock: number) => {
    if (stock === 0) return 'out';
    if (stock < 10) return 'low';
    return 'ok';
  };

  const totalState = getStockState(totalStock);

  const isDisabled = !product.isActive;
  return (
    <>
      <EditProductDialog
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        product={product}
      />
      <div
        className={`
        relative
        rounded-xl overflow-hidden bg-[#0b0b0c] mb-5 min-w-76.75 max-w-100 mx-auto border border-[#1a1a1a]
        transition-all duration-300
        ${!product.isActive ? 'opacity-60 grayscale' : ''}
      `}
      >
        <div className="aspect-square relative">
          <div className="relative w-full h-48 md:h-56 lg:h-60">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover "
            />
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

          <div className="absolute top-2 right-2 flex gap-2 ">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    disabled={isPending}
                    onClick={() => {
                      toggleProduct({
                        id: product.id,
                        isActive: !product.isActive,
                      });
                    }}
                    className={`
                      p-1 md:h-7 rounded-md cursor-pointer
                      ${product.isActive ? 'bg-black/50' : 'bg-green-700'}
                      ${isPending ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    {product.isActive ? (
                      <Trash className="md:size-5 text-red-500" />
                    ) : (
                      <RotateCcw className="md:size-5 text-white" />
                    )}
                  </button>
                </TooltipTrigger>

                <TooltipContent side="left">
                  {product.isActive
                    ? 'Desactivar producto'
                    : 'Reactivar producto'}
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    disabled={isDisabled}
                    onClick={() => {
                      if (isDisabled) return;

                      markAsFeatured(product.id);
                    }}
                    className={`p-1 md:h-7 rounded-md  ${
                      product.isFeatured ? 'bg-amber-500' : 'bg-black/50'
                    } ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    {product.isFeatured ? (
                      <Star className="md:size-5" />
                    ) : (
                      <StarOff className="md:size-5" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  {product.isFeatured
                    ? 'Quitar de destacados'
                    : 'Marcar como destacado'}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    disabled={isDisabled}
                    onClick={() => !isDisabled && setIsEditOpen(true)}
                    className={`p-1 rounded-md bg-black/50 ${
                      isDisabled
                        ? 'opacity-40 cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                  >
                    <Pencil className="size-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Editar producto</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="p-3 space-y-2">
          <p className="text-xs text-gray-500">
            {product.brand.name} • {product.category.name}
          </p>

          <h3 className="text-sm font-medium text-white">{product.name}</h3>

          <p
            className={`text-[10px] ${
              totalState === 'out'
                ? 'text-gray-500 line-through'
                : totalState === 'low'
                  ? 'text-yellow-500'
                  : 'text-green-600'
            }`}
          >
            • {totalStock} en stock
          </p>

          <Collapsible open={isOpen} onOpenChange={onToggle}>
            <CollapsibleTrigger className="w-full">
              <span className="w-[50%] mx-auto flex items-center justify-between text-xs bg-[#7a1c1c]/20 hover:bg-[#7a1c1c]/40 py-3 px-3 cursor-pointer rounded-md transition-all">
                Ver variantes
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  size={14}
                />
              </span>
            </CollapsibleTrigger>

            <CollapsiblePanel>
              <div className="mt-2 space-y-1 max-h-40 overflow-y-auto pr-1">
                {variants.map((v) => {
                  const state = getStockState(v.stock);

                  const [openPopover, setOpenPopover] = useState(false);

                  const handleDelete = () => {
                    console.log('Soft delete variant:', v.id);
                  };

                  return (
                    <div
                      key={v.id}
                      className={`flex justify-between items-center p-2 border-b border-[#1a1a1a] ${
                        !product.isActive || !v.isActive
                          ? 'opacity-40 grayscale line-through'
                          : ''
                      }`}
                    >
                      <div className="text-xs text-gray-400">
                        {v.attributes.map((a) => a.value).join(' / ')}
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-xs ${
                            state === 'out'
                              ? 'text-gray-500 line-through'
                              : state === 'low'
                                ? 'text-yellow-500'
                                : 'text-green-500'
                          }`}
                        >
                          {v.stock}
                        </span>

                        <span className="text-sm font-medium text-white">
                          ${v.price}
                        </span>

                        {stockMode ? (
                          <div>
                            {' '}
                            <StockCounter
                              value={v.stock}
                              size="sm"
                              onChange={(newStock) => {
                                if (isDisabled) return;
                                updateVariantStock(v.id, newStock);
                              }}
                            />
                          </div>
                        ) : (
                          <Popover
                            open={openPopover}
                            onOpenChange={setOpenPopover}
                          >
                            <PopoverTrigger asChild>
                              <button
                                disabled={isDisabled}
                                onClick={() =>
                                  !isDisabled && handleDeactivate(v.id)
                                }
                                className={`text-red-500 ${
                                  isDisabled
                                    ? 'opacity-40 cursor-not-allowed'
                                    : 'hover:text-red-400'
                                }`}
                              >
                                <Trash className="size-4" />
                              </button>
                            </PopoverTrigger>

                            {state !== 'out' && (
                              <PopoverContent className="bg-[#111] border border-[#1a1a1a] text-white">
                                <PopoverHeader>
                                  <PopoverTitle>
                                    ¿Desactivar variante?
                                  </PopoverTitle>
                                  <PopoverDescription>
                                    Se ocultará del cliente, pero no se
                                    eliminará.
                                  </PopoverDescription>
                                </PopoverHeader>

                                <div className="flex justify-end gap-2 mt-2">
                                  <button
                                    onClick={() => setOpenPopover(false)}
                                    className="px-3 py-1 text-xs rounded-md cursor-pointer bg-gray-700 hover:bg-gray-600"
                                  >
                                    Cancelar
                                  </button>

                                  <button
                                    onClick={handleDelete}
                                    className="px-3 py-1 text-xs rounded-md cursor-pointer bg-red-600 hover:bg-red-500"
                                  >
                                    Confirmar
                                  </button>
                                </div>
                              </PopoverContent>
                            )}
                          </Popover>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CollapsiblePanel>
          </Collapsible>
        </div>
      </div>
    </>
  );
}
