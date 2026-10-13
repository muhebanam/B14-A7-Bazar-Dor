"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import SortProducts, { sortProductsList } from "@/components/SortProducts";
import { toBengaliNumber } from "@/lib/bengali";
import { Search } from "lucide-react";

export default function AllProductsSection({ initialProducts = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filteredAndSorted = useMemo(() => {
    let result = [...initialProducts];

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.nameBn?.toLowerCase().includes(q) ||
          p.categoryNameBn?.toLowerCase().includes(q) ||
          p.slug?.toLowerCase().includes(q)
      );
    }

    return sortProductsList(result, sortBy);
  }, [initialProducts, searchTerm, sortBy]);

  const countBengali = toBengaliNumber(filteredAndSorted.length);

  return (
    <section id="সব-পণ্য" className="scroll-mt-24">
      {/* Section Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
            <span>🛒</span>
            <span>নিত্যদিনের সামগ্রী</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-base-content tracking-tight">
            সব পণ্য
          </h2>
          <p className="text-sm text-base-muted mt-1">
            মোট {countBengali}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-base-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="পণ্যের নাম লিখুন…"
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white rounded-xl border border-base-300 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
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
            কোনো পণ্য পাওয়া যায়নি
          </h3>
          <p className="text-sm text-base-muted mb-6">
            “{searchTerm}” সম্পর্কিত কোনো পণ্য তালিকায় নেই। অন্য কোনো নাম দিয়ে চেষ্টা করুন।
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
    </section>
  );
}
