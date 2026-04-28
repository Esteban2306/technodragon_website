'use client';

import Image from 'next/image';
import { ProductPreview } from '@/src/shared/types/catalog.types';
import { formatPriceCOP } from '@/src/shared/helper/formatPrice';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../tooltip';
import { useMediaQuery } from '@/src/shared/hooks/useMediaQuery';
import { CartItem, useCart } from '@/src/shared/context/cartContext';
import { CONDITION_LABEL } from '@/src/shared/helper/conditionLabel';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Monitor,
  Layers,
  Tag,
  Zap,
  Battery,
  Wifi,
} from 'lucide-react';

type Props = {
  product: ProductPreview;
  className?: string;
  showCTA?: boolean;
};

const getAttributeIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('ram') || n.includes('memoria')) return MemoryStick;
  if (n.includes('storage') || n.includes('almacen') || n.includes('disco') || n.includes('ssd') || n.includes('hdd')) return HardDrive;
  if (n.includes('cpu') || n.includes('procesador') || n.includes('processor') || n.includes('chip')) return Cpu;
  if (n.includes('pantalla') || n.includes('screen') || n.includes('display') || n.includes('pulgadas')) return Monitor;
  if (n.includes('bateria') || n.includes('battery') || n.includes('mah')) return Battery;
  if (n.includes('wifi') || n.includes('red') || n.includes('network') || n.includes('bluetooth')) return Wifi;
  if (n.includes('gpu') || n.includes('grafica') || n.includes('video')) return Zap;
  if (n.includes('os') || n.includes('sistema') || n.includes('windows') || n.includes('android')) return Layers;
  return Tag;
};

export const ProductCardBase = ({ product, className, showCTA }: Props) => {
  const mainImage = product.images?.[0];
  const { addItem } = useCart();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const defaultVariant = product.variants[0];

  const handleAddToCart = () => {
    if (!defaultVariant) return;
    const cartItem: CartItem = {
      variantId: defaultVariant.id,
      productId: product.id,
      name: product.name,
      image: defaultVariant.image || product.images?.[0] || '',
      price: defaultVariant.price,
      quantity: 1,
      variantLabel: defaultVariant.attributes
        .map((attr) => `${attr.name}: ${attr.value}`)
        .join(', '),
    };
    addItem(cartItem);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover="hover"
            initial="rest"
            animate="rest"
            className={`
              relative rounded-2xl border border-[#2D2F32]
              bg-linear-to-b from-[#1a1a1e] to-[#0F1316]
              w-65 flex flex-col overflow-hidden cursor-pointer
              transition-colors duration-300 hover:border-red-900/50
              ${className}
            `}
          >
            <motion.div
              variants={{
                rest: { scaleX: 0, opacity: 0 },
                hover: { scaleX: 1, opacity: 1 },
              }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-red-600 to-transparent z-20 origin-center"
            />

            <div className="relative w-full aspect-4/3 overflow-hidden bg-[#111316]">
              {mainImage ? (
                <>
                  <motion.div
                    variants={{
                      rest: { scale: 1 },
                      hover: { scale: 1.06 },
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={mainImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="260px"
                    />
                  </motion.div>

                  <div className="absolute inset-0 bg-linear-to-t from-[#0F1316] via-[#0F1316]/30 to-transparent" />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                  Sin imagen
                </div>
              )}

              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] text-gray-300 border border-white/10 capitalize z-10">
                {CONDITION_LABEL[product.condition] ?? product.condition}
              </span>
            </div>

            <div className="flex flex-col flex-1 px-4 pt-3 pb-4 space-y-2">

              <h3 className="text-sm font-semibold text-white truncate">
                {product.name}
              </h3>

              <div className="flex items-center gap-1.5 flex-wrap">
                {product.brandName && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950/60 border border-red-900/40 text-red-400 font-medium leading-none">
                    {product.brandName}
                  </span>
                )}
                {product.categoryName && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 leading-none">
                    {product.categoryName}
                  </span>
                )}
              </div>

              <motion.div
                variants={{
                  rest: { scaleX: 0.25, opacity: 0.25 },
                  hover: { scaleX: 1, opacity: 1 },
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="h-px bg-linear-to-r from-red-700/70 via-red-500/40 to-transparent origin-left"
              />

              <ul className="space-y-1">
                {product.attributes.slice(0, 3).map((attr) => {
                  const Icon = getAttributeIcon(attr.name);
                  return (
                    <li
                      key={attr.name}
                      className="flex items-center gap-1.5 text-xs text-gray-400"
                    >
                      <Icon className="w-3 h-3 text-red-500 shrink-0" />
                      <span className="truncate">{attr.value}</span>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-end justify-between pt-1">
                <p className="text-base font-bold text-white">
                  {formatPriceCOP(product.variants[0].price)}
                </p>

                {defaultVariant?.stock > 0 ? (
                  <span className="flex items-center gap-1 text-[10px] text-green-500">
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"
                    />
                    En stock
                  </span>
                ) : (
                  <span className="text-[10px] text-red-500">Agotado</span>
                )}
              </div>

              {showCTA && (
                <Link
                  href={`/product/${product.id}`}
                  className="
                    block w-full text-center mt-1
                    bg-white/6 hover:bg-red-950/50
                    border border-white/10 hover:border-red-800/50
                    text-white py-2 rounded-xl text-xs font-medium
                    transition-all duration-200
                  "
                >
                  Ver producto
                </Link>
              )}
            </div>

            <motion.div
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-0 right-0 w-28 h-28 bg-red-700/10 rounded-full blur-2xl pointer-events-none"
            />
          </motion.div>
        </TooltipTrigger>

        <TooltipContent>{product.name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};