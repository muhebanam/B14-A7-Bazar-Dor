import { ProductGridSkeleton } from "@/components/Skeleton";

export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 animate-pulse">
      <div className="h-4 w-32 rounded bg-base-300" />
      <div className="bg-white rounded-3xl p-8 border border-base-300 flex items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-base-200" />
        <div className="space-y-2">
          <div className="h-8 w-48 rounded bg-base-300" />
          <div className="h-4 w-32 rounded bg-base-200" />
        </div>
      </div>
      <ProductGridSkeleton count={8} />
    </div>
  );
}
