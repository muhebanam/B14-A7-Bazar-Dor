import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import AllProductsSection from "@/components/AllProductsSection";
import { toBengaliNumber } from "@/lib/bengali";
import { TrendingUp, TrendingDown, ArrowDown } from "lucide-react";

export default async function HomePage() {
  const products = await getProducts();

  // Top 6 Risers (দাম বেড়েছে)
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  // Top 6 Fallers (দাম কমেছে)
  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => Math.abs(b.change?.pct || 0) - Math.abs(a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="space-y-16 py-8 md:py-12">
      {/* 2. Hero / Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white via-[#f4faf5] to-[#eaf5ec] rounded-3xl p-6 sm:p-10 md:p-12 border border-base-300/80 shadow-sm relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Stats Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  <span>🥬</span>
                  <span>{toBengaliNumber(33)}টি নিত্যদিনের পণ্য</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-base-300 text-base-content text-xs font-semibold">
                  <span>🏪</span>
                  <span>{toBengaliNumber(12)}টি বাজার অন্তর্ভুক্ত</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-base-300 text-base-content text-xs font-semibold">
                  <span>🗺️</span>
                  <span>{toBengaliNumber(6)}টি বিভাগের তথ্য</span>
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-base-content tracking-tight leading-tight">
                আজকের বাজারের দাম <br className="hidden sm:inline" />
                <span className="text-primary">এক নজরে</span> জানুন
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-base-muted max-w-xl leading-relaxed">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <a
                  href="#সব-পণ্য"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-strong text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>সব পণ্য দেখুন</span>
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </a>
              </div>
            </div>

            {/* Right Banner Image */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                <div className="absolute inset-0 bg-primary/5 rounded-full filter blur-2xl transform scale-90" />
                <Image
                  src="/bazar-hero.png"
                  alt="নিত্যপ্রয়োজনীয় পণ্যের বাজার ঝুড়ি"
                  fill
                  priority
                  className="object-contain drop-shadow-xl relative z-10 hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 3. Section A — আজ দাম বেড়েছে ▲ */}
        <section>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#eaf6ec] text-[#1a9951] flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-2">
                  <span>আজ দাম বেড়েছে</span>
                  <span className="text-[#1a9951]">▲</span>
                </h2>
                <p className="text-xs sm:text-sm text-base-muted">
                  সর্বাধিক মূল্যবৃদ্ধির শীর্ষে থাকা ৬টি পণ্য
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {risers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 3. Section B — আজ দাম কমেছে ▼ */}
        <section>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#fef2f2] text-[#d03739] flex items-center justify-center font-bold">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-base-content flex items-center gap-2">
                  <span>আজ দাম কমেছে</span>
                  <span className="text-[#d03739]">▼</span>
                </h2>
                <p className="text-xs sm:text-sm text-base-muted">
                  আজকের বাজারে মূল্যহ্রাসের শীর্ষে থাকা ৬টি পণ্য
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {fallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 3. Section C — সব পণ্য with Search and Challenge C1 Sort Dropdown */}
        <AllProductsSection initialProducts={products} />
      </div>
    </div>
  );
}
