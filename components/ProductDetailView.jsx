"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  formatBengaliPrice,
  formatUnit,
  formatPct,
  toBengaliNumber,
} from "@/lib/bengali";
import { ProductDetailSkeleton } from "@/components/Skeleton";
import toast from "react-hot-toast";
import {
  Home,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  MapPin,
  Building2,
  Calendar,
  Lock,
} from "lucide-react";

export default function ProductDetailView({ product }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [selectedDivision, setSelectedDivision] = useState("সব");

  // Protect route: redirect if not logged in
  useEffect(() => {
    if (!isPending && !session) {
      toast.error("পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.replace(`/signin?callbackUrl=/product/${product?.id || ""}`);
    }
  }, [session, isPending, router, product]);

  const markets = product?.markets || [];

  // Divisions list
  const divisions = useMemo(() => {
    const set = new Set(markets.map((m) => m.division).filter(Boolean));
    return ["সব", ...Array.from(set)];
  }, [markets]);

  // Filtered markets
  const filteredMarkets = useMemo(() => {
    if (selectedDivision === "সব") return markets;
    return markets.filter((m) => m.division === selectedDivision);
  }, [markets, selectedDivision]);

  // Summary statistics
  const stats = useMemo(() => {
    if (markets.length === 0) {
      return {
        minVal: product?.today || 0,
        maxVal: product?.today || 0,
        avgVal: product?.today || 0,
        minMarket: null,
        maxMarket: null,
      };
    }
    const mins = markets.map((m) => m.min);
    const maxs = markets.map((m) => m.max);
    const minVal = Math.min(...mins);
    const maxVal = Math.max(...maxs);
    const minMarket = markets.find((m) => m.min === minVal);
    const maxMarket = markets.find((m) => m.max === maxVal);
    const sum = markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0);
    const avgVal = Math.round(sum / markets.length);

    return { minVal, maxVal, avgVal, minMarket, maxMarket };
  }, [markets, product]);

  // If loading session, show skeleton
  if (isPending) {
    return <ProductDetailSkeleton />;
  }

  // If unauthenticated, show protected placeholder while redirecting
  if (!session) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-base-300 text-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-base-content mb-2">
          লগইন প্রয়োজন
        </h2>
        <p className="text-sm text-base-muted mb-6">
          পণ্যের বিস্তারিত দেখতে অনুগ্রহ করে সাইন ইন করুন। আপনাকে সাইন ইন পেজে নিয়ে যাওয়া হচ্ছে…
        </p>
        <Link
          href={`/signin?callbackUrl=/product/${product?.id || ""}`}
          className="inline-block px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-strong transition-colors"
        >
          সাইন ইন পেজে যান
        </Link>
      </div>
    );
  }

  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const isFlat = !isUp && !isDown;

  const priceDiff = Math.abs(
    (product.today || 0) - (product.yesterday || product.today || 0)
  );

  let changeSummaryText = "গতকালের তুলনায় আজকের দাম অপরিবর্তিত রয়েছে";
  if (isUp) {
    changeSummaryText = `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBengaliNumber(priceDiff)} টাকা`;
  } else if (isDown) {
    changeSummaryText = `গতকালের তুলনায় আজ দাম কমেছে · ${toBengaliNumber(priceDiff)} টাকা`;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-base-muted">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>হোম</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-primary transition-colors"
        >
          {product.categoryNameBn || "ক্যাটাগরি"}
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-base-content truncate">
          {product.nameBn}
        </span>
      </nav>

      {/* Top Summary Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-base-300 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-base-200">
          {/* Left Title & Info */}
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-base-200 flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
              <span>{product.image || product.categoryIcon || "🛒"}</span>
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/category/${product.category}`}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
                >
                  {product.categoryNameBn || "ক্যাটাগরি"}
                </Link>
                <span className="text-xs text-base-muted font-medium">
                  {formatUnit(product.unit)}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-base-content tracking-tight">
                {product.nameBn}
              </h1>
              <p className="text-sm font-medium text-base-muted flex items-center gap-1.5">
                {isUp ? (
                  <TrendingUp className="w-4 h-4 text-[#1a9951]" />
                ) : isDown ? (
                  <TrendingDown className="w-4 h-4 text-[#d03739]" />
                ) : (
                  <Minus className="w-4 h-4 text-gray-500" />
                )}
                <span>{changeSummaryText}</span>
              </p>
            </div>
          </div>

          {/* Right Today Price Badge */}
          <div className="bg-base-200/60 p-5 rounded-2xl border border-base-300 self-start md:self-auto min-w-[200px]">
            <p className="text-xs text-base-muted font-semibold uppercase tracking-wider mb-1">
              আজকের নির্ধারিত দাম
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-primary">
                {formatBengaliPrice(product.today)}
              </span>
              <span className="text-xs text-base-muted">
                / {product.unit === "kg" ? "কেজি" : product.unit}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isUp
                    ? "bg-[#eaf6ec] text-[#1a9951]"
                    : isDown
                    ? "bg-[#fef2f2] text-[#d03739]"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
                <span>{formatPct(product.change?.pct)}</span>
              </span>
              <span className="text-xs text-base-muted">
                গতকালের চেয়ে {isUp ? "বৃদ্ধি" : isDown ? "হ্রাস" : "অপরিবর্তিত"}
              </span>
            </div>
          </div>
        </div>

        {/* Historical Price Trend Row */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 bg-base-100 rounded-xl border border-base-200">
            <span className="text-xs text-base-muted font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" /> গতকাল
            </span>
            <p className="text-lg font-bold text-base-content mt-1">
              {formatBengaliPrice(product.yesterday || product.today)}
            </p>
          </div>
          <div className="p-3.5 bg-base-100 rounded-xl border border-base-200">
            <span className="text-xs text-base-muted font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" /> গত সপ্তাহ
            </span>
            <p className="text-lg font-bold text-base-content mt-1">
              {formatBengaliPrice(product.lastWeek || product.today)}
            </p>
          </div>
          <div className="p-3.5 bg-base-100 rounded-xl border border-base-200">
            <span className="text-xs text-base-muted font-medium flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-primary" /> গত মাস
            </span>
            <p className="text-lg font-bold text-base-content mt-1">
              {formatBengaliPrice(product.lastMonth || product.today)}
            </p>
          </div>
          <div className="p-3.5 bg-base-100 rounded-xl border border-base-200">
            <span className="text-xs text-base-muted font-medium flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-primary" /> বাজার পর্যবেক্ষণ
            </span>
            <p className="text-lg font-bold text-primary mt-1">
              {toBengaliNumber(markets.length)}টি বাজার
            </p>
          </div>
        </div>
      </div>

      {/* Price Summary (দামের সারসংক্ষেপ) */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-base-content tracking-tight">
          দামের সারসংক্ষেপ
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Card 1: গড় দাম */}
          <div className="bg-white rounded-3xl p-6 border border-base-300 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-semibold text-base-muted uppercase tracking-wider mb-2">
              গড় দাম
            </p>
            <p className="text-3xl font-extrabold text-base-content">
              {formatBengaliPrice(stats.avgVal)}
            </p>
            <p className="text-xs text-base-muted mt-2">
              {formatUnit(product.unit)}-এর হিসাবে সারাদেশের গড়
            </p>
          </div>

          {/* Card 2: সর্বনিম্ন দাম */}
          <div className="bg-white rounded-3xl p-6 border border-[#b8e2bf] bg-gradient-to-br from-white to-[#f0fbf3] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-[#1a9951] uppercase tracking-wider">
                সর্বনিম্ন দাম
              </p>
              <span className="px-2 py-0.5 rounded-full bg-[#eaf6ec] text-[#1a9951] text-xs font-bold">
                সাশ্রয়ী
              </span>
            </div>
            <p className="text-3xl font-extrabold text-[#1a9951]">
              {formatBengaliPrice(stats.minVal)}
            </p>
            <p className="text-xs text-base-muted mt-2 truncate">
              সবচেয়ে কম দামের বাজার:{" "}
              <span className="font-semibold text-base-content">
                {stats.minMarket ? `${stats.minMarket.market} (${stats.minMarket.division})` : "—"}
              </span>
            </p>
          </div>

          {/* Card 3: সর্বাধিক দাম */}
          <div className="bg-white rounded-3xl p-6 border border-[#fecaca] bg-gradient-to-br from-white to-[#fff7f7] shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-[#d03739] uppercase tracking-wider">
                সর্বাধিক দাম
              </p>
              <span className="px-2 py-0.5 rounded-full bg-[#fef2f2] text-[#d03739] text-xs font-bold">
                সর্বোচ্চ
              </span>
            </div>
            <p className="text-3xl font-extrabold text-[#d03739]">
              {formatBengaliPrice(stats.maxVal)}
            </p>
            <p className="text-xs text-base-muted mt-2 truncate">
              সবচেয়ে বেশি দামের বাজার:{" "}
              <span className="font-semibold text-base-content">
                {stats.maxMarket ? `${stats.maxMarket.market} (${stats.maxMarket.division})` : "—"}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* বাজারভিত্তিক আজকের দাম (Market Breakdown) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-base-300 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-base-content tracking-tight">
              বাজারভিত্তিক আজকের দাম
            </h2>
            <p className="text-xs sm:text-sm text-base-muted mt-1">
              বিভিন্ন পাইকারি ও খুচরা বাজারের রেঞ্জ ও গড় মূল্য তালিকা
            </p>
          </div>

          {/* Division Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 bg-base-200 rounded-2xl">
            {divisions.map((div) => (
              <button
                key={div}
                type="button"
                onClick={() => setSelectedDivision(div)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                  selectedDivision === div
                    ? "bg-white text-primary shadow-sm"
                    : "text-base-muted hover:text-base-content"
                }`}
              >
                {div}
              </button>
            ))}
          </div>
        </div>

        {/* Markets Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-base-200 text-xs font-semibold text-base-muted">
                <th className="py-3 px-4">বাজারের নাম</th>
                <th className="py-3 px-4">বিভাগ</th>
                <th className="py-3 px-4 text-right">সর্বনিম্ন</th>
                <th className="py-3 px-4 text-right">সর্বাধিক</th>
                <th className="py-3 px-4 text-right">গড় মূল্য</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200 text-sm">
              {filteredMarkets.map((m, index) => {
                const avg = ((m.min + m.max) / 2).toFixed(1);
                return (
                  <tr
                    key={`${m.market}-${index}`}
                    className="hover:bg-base-100/80 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-semibold text-base-content flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span>{m.market}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-base-200 text-base-content text-xs font-medium">
                        {m.division}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-[#1a9951]">
                      {formatBengaliPrice(m.min)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-[#d03739]">
                      {formatBengaliPrice(m.max)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-primary">
                      {toBengaliNumber(avg)} টাকা
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
