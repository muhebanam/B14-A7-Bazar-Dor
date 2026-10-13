import Link from "next/link";
import { formatBengaliPrice, formatUnit, formatPct } from "@/lib/bengali";

export default function ProductCard({ product }) {
  if (!product) return null;

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const isFlat = !isUp && !isDown;

  const arrowSymbol = isUp ? "▲" : isDown ? "▼" : "—";
  const badgeClasses = isUp
    ? "bg-[#eaf6ec] text-[#1a9951] border-[#b8e2bf]"
    : isDown
    ? "bg-[#fef2f2] text-[#d03739] border-[#fecaca]"
    : "bg-gray-100 text-gray-600 border-gray-200";

  const href = `/product/${product.id}`;

  return (
    <Link
      href={href}
      className="group block bg-white rounded-2xl p-5 border border-base-300 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Top row with emoji and category tag */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-inner">
          <span>{product.image || product.categoryIcon || "🛒"}</span>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeClasses}`}
        >
          <span>{arrowSymbol}</span>
          <span>{formatPct(product.change?.pct)}</span>
        </span>
      </div>

      {/* Product Title and Unit */}
      <div className="mb-4">
        <h3 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors line-clamp-1">
          {product.nameBn}
        </h3>
        <p className="text-sm text-base-muted mt-0.5">
          {formatUnit(product.unit)}
        </p>
      </div>

      {/* Price row */}
      <div className="pt-3 border-t border-base-200 flex items-baseline justify-between">
        <span className="text-xs font-medium text-base-muted">
          আজকের দাম
        </span>
        <span className="text-xl font-bold text-primary group-hover:text-primary-strong transition-colors">
          {formatBengaliPrice(product.today)}
        </span>
      </div>
    </Link>
  );
}
