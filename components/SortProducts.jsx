"use client";

import { ChevronDown, ArrowUpDown } from "lucide-react";

export const SORT_OPTIONS = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

export function sortProductsList(products, sortBy) {
  if (!Array.isArray(products)) return [];
  const list = [...products];

  if (sortBy === "price-asc") {
    return list.sort((a, b) => Number(a.today || 0) - Number(b.today || 0));
  }
  if (sortBy === "price-desc") {
    return list.sort((a, b) => Number(b.today || 0) - Number(a.today || 0));
  }
  return list;
}

export default function SortProducts({ value = "default", onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-base-300 text-sm font-medium text-base-content hover:border-primary/50 transition-colors shadow-sm">
        <ArrowUpDown className="w-4 h-4 text-primary" />
        <span className="text-base-muted text-xs sm:text-sm">সাজান:</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent font-semibold text-base-content focus:outline-none cursor-pointer pr-6 appearance-none text-xs sm:text-sm"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-base-muted absolute right-3 pointer-events-none" />
      </div>
    </div>
  );
}
