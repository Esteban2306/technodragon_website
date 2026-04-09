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

type Props = {
  product: ProductPreview;
  className?: string;
  showCTA?: boolean;
};

export const ProductCardBase = ({ product, className, showCTA }: Props) => {
  const mainImage = product.images?.[0];
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`
        relative rounded-2xl border border-[#2D2F32]
        bg-linear-to-b from-[#1e1010] to-[#0F1316]
        p-5 w-65
        flex flex-col justify-between
        transition-all duration-300
        ${className}
      `}
          >
            <div className="flex justify-center items-center h-35">
              {mainImage && (
                <Image
                  src={mainImage}
                  alt={product.name}
                  width={160}
                  height={120}
                  className="object-contain"
                />
              )}
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-xs text-gray-400 capitalize">
                {product.condition.toLowerCase()}
              </p>

              <h3 className="text-lg font-semibold text-white leading-tight line-clamp-2 min-h-12">
                {product.name}
              </h3>

              <ul className="text-sm text-gray-300 space-y-1">
                {product.attributes.slice(0, 3).map((attr) => (
                  <li key={attr.name}>• {attr.value}</li>
                ))}
              </ul>

              <p className="text-xl font-bold text-white mt-2">
                {formatPriceCOP(product.price)}
              </p>
            </div>

            {showCTA && (
              <button className="mt-4 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm transition">
                Ver producto
              </button>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>{product.name}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
