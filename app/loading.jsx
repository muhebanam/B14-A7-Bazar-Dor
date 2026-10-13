import { ProductGridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12 animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-base-300 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 w-full md:w-1/2">
          <div className="h-6 w-36 rounded-full bg-base-200" />
          <div className="h-10 w-3/4 rounded-xl bg-base-300" />
          <div className="h-4 w-full rounded bg-base-200" />
          <div className="h-12 w-44 rounded-2xl bg-base-300" />
        </div>
        <div className="w-56 h-56 rounded-full bg-base-200" />
      </div>

      {/* Risers Skeleton */}
      <div className="space-y-4">
        <div className="h-7 w-48 rounded bg-base-300" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-48 rounded-2xl bg-white border border-base-300" />
          ))}
        </div>
      </div>

      {/* All Products Skeleton */}
      <div className="space-y-4">
        <div className="h-7 w-40 rounded bg-base-300" />
        <ProductGridSkeleton count={8} />
      </div>
    </div>
  );
}
