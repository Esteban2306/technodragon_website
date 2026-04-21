'use client';

import { Skeleton } from "../../skeleton";

type Props = {
  className?: string;
};

export const ProductCardSkeleton = ({ className }: Props) => {
  return (
    <div
      className={`
        relative rounded-2xl border border-[#2D2F32]
        bg-linear-to-b from-[#1e1010] to-[#0F1316]
        p-5 w-65
        flex flex-col justify-between
        ${className}
      `}
    >
      <div className="flex justify-center items-center h-35">
        <Skeleton className="w-40 h-30 rounded-lg" />
      </div>

      <div className="mt-4 space-y-2">
        <Skeleton className="w-20 h-3" /> 
        <Skeleton className="w-full h-5" /> 
        <Skeleton className="w-3/4 h-5" />

        <div className="space-y-1  mt-2">
          <Skeleton className="w-24 h-3" />
          <Skeleton className="w-20 h-3" />
          <Skeleton className="w-28 h-3" />
        </div>

        <Skeleton className="w-28 h-6 mt-2" /> 
      </div>

      <div className="mt-4 flex gap-2">
        <Skeleton className="flex-1 h-8 rounded-lg" />
        <Skeleton className="flex-1 h-8 rounded-lg" />
      </div>
    </div>
  );
};