import { ProductCardSkeleton } from "@/src/shared/components/ui/skeleton/ProductCardSkeleton";

type Props = {
  count?: number;
};

export const ProductSkeletonGrid = ({ count = 6 }: Props) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </>
  );
};