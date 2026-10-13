"use client";

import Link from "next/link";
import { formatBengaliPrice, formatUnitShort, formatPct } from "@/lib/bengali";

export default function PriceTicker({ products = [] }) {
  if (!products || products.length === 0) return null;

  // Duplicate list to create a seamless infinite loop
  const tickerItems = [...products, ...products];

  return (
    <div className="bg-[#f0f5f0] border-y border-base-300 overflow-hidden py-2 select-none">
      <div className="ticker-track">
        {tickerItems.map((p, index) => {
          const isUp = p.change?.dir === "up";
          const isDown = p.change?.dir === "down";
          const arrow = isUp ? "▲" : isDown ? "▼" : "—";
          const colorClass = isUp
            ? "text-[#1a9951]"
            : isDown
            ? "text-[#d03739]"
            : "text-gray-500";

          return (
            <Link
              key={`${p.id}-${index}`}
              href={`/product/${p.id}`}
              className="inline-flex items-center gap-2 px-5 text-sm text-base-content hover:text-primary transition-colors cursor-pointer shrink-0"
            >
              <span className="text-base">{p.image || p.categoryIcon || "🛒"}</span>
              <span className="font-semibold">{p.nameBn}</span>
              <span className="text-base-muted text-xs">
                {formatBengaliPrice(p.today)}/{formatUnitShort(p.unit)}
              </span>
              <span className={`inline-flex items-center text-xs font-bold ${colorClass}`}>
                {arrow} {formatPct(p.change?.pct)}
              </span>
              <span className="text-base-300 ml-3">•</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
