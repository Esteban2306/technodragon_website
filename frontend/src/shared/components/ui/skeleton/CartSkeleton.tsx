import { AspectRatio } from "../../aspect-ratio";
import { Skeleton } from "../../skeleton";

export default function CartSkeleton() {
    return (
        <div className="p-4 space-y-6 max-w-4xl mx-auto">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row gap-4 border border-neutral-800 rounded-xl p-4 bg-neutral-900/40"
          >
            <div className="w-full sm:w-28">
              <AspectRatio ratio={1}>
                <Skeleton className="w-full h-full rounded-md" />
              </AspectRatio>
            </div>

            <div className="flex-1 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/3" />

              <div className="flex gap-2">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-6 w-12" />
              </div>

              <Skeleton className="h-4 w-1/2" />

              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-6" />
                  <Skeleton className="h-8 w-8" />
                </div>

                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        ))}

        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    )
}