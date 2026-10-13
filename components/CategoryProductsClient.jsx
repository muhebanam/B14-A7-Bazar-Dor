"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import SortProducts, { sortProductsList } from "@/components/SortProducts";
import { toBengaliNumber } from "@/lib/bengali";
import { Search, ArrowLeft } from "lucide-react";

export default function CategoryProductsClient({
  category,
  products = [],
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.nameBn?.toLowerCase().includes(q) ||
          p.slug?.toLowerCase().includes(q)
      );
    }

    return sortProductsList(result, sortBy);
  }, [products, searchTerm, sortBy]);

  const countBengali = toBengaliNumber(filteredAndSorted.length);

  return (
    <div className="space-y-8">
      {/* Search & Sort Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-base-300 shadow-sm">
        <p className="text-sm font-semibold text-base-content">
          মোট {countBengali}টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-base-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="পণ্যের নাম খুঁজুন…"
              className="w-full sm:w-56 pl-10 pr-4 py-2 bg-base-100 rounded-xl border border-base-300 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
            />
          </div>

          {/* Sort Dropdown */}
          <SortProducts value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Grid of Product Cards */}
      {filteredAndSorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredAndSorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-base-300 shadow-sm max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-base-200 text-3xl flex items-center justify-center mx-auto mb-4">
            🔍
          </div>
          <h3 className="font-bold text-lg text-base-content mb-1">
            কোনো পণ্য মেলেনি
          </h3>
          <p className="text-sm text-base-muted mb-6">
            “{searchTerm}” দিয়ে এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-strong transition-colors"
          >
            সার্চ রিসেট করুন
          </button>
        </div>
      )}
    </div>
  );
}
