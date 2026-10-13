export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-base-300 relative overflow-hidden animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl skeleton-shimmer" />
        <div className="w-16 h-6 rounded-full skeleton-shimmer" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-5 w-3/4 rounded-md skeleton-shimmer" />
        <div className="h-4 w-1/2 rounded-md skeleton-shimmer" />
      </div>
      <div className="pt-3 border-t border-base-200 flex items-center justify-between">
        <div className="h-4 w-16 rounded-md skeleton-shimmer" />
        <div className="h-6 w-24 rounded-md skeleton-shimmer" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-pulse">
      <div className="h-6 w-48 rounded skeleton-shimmer" />
      <div className="bg-white rounded-3xl p-8 border border-base-300 flex flex-col md:flex-row gap-6 items-start justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl skeleton-shimmer" />
          <div className="space-y-3">
            <div className="h-8 w-64 rounded skeleton-shimmer" />
            <div className="h-4 w-40 rounded skeleton-shimmer" />
          </div>
        </div>
        <div className="h-12 w-48 rounded-2xl skeleton-shimmer" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="h-32 rounded-2xl skeleton-shimmer" />
        <div className="h-32 rounded-2xl skeleton-shimmer" />
        <div className="h-32 rounded-2xl skeleton-shimmer" />
      </div>
      <div className="h-96 rounded-3xl skeleton-shimmer" />
    </div>
  );
}

export default ProductGridSkeleton;
