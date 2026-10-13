import Link from "next/link";
import { getCategoryBySlug, getProducts } from "@/lib/api";
import CategoryProductsClient from "@/components/CategoryProductsClient";
import { toBengaliNumber } from "@/lib/bengali";
import { ChevronRight, Home, AlertCircle } from "lucide-react";

export async function generateMetadata({ params }) {
  const category = await getCategoryBySlug(params.slug);
  if (!category) {
    return {
      title: "ক্যাটাগরি পাওয়া যায়নি — বাজার দর",
    };
  }
  return {
    title: `${category.nameBn} বাজার দর — বাজার দর`,
    description: `${category.nameBn} ক্যাটাগরির সকল নিত্যপ্রয়োজনীয় পণ্যের আজকের সর্বশেষ দাম ও পরিবর্তন।`,
  };
}

export default async function CategoryPage({ params }) {
  const category = await getCategoryBySlug(params.slug);
  const products = category ? await getProducts(params.slug) : [];

  // Empty state / 404-style message if invalid slug or no products
  if (!category || products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-10 md:p-14 border border-base-300 shadow-sm max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-red-50 text-bazarError flex items-center justify-center mx-auto mb-6 text-4xl">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-base-content mb-2">
            ক্যাটাগরিটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm text-base-muted mb-8 leading-relaxed">
            দুঃখিত, আপনি যে ক্যাটাগরি খুঁজছেন তা বিদ্যমান নেই অথবা এতে কোনো পণ্য যুক্ত করা হয়নি।
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-strong text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    );
  }

  const countBengali = toBengaliNumber(products.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-base-muted">
        <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>হোম</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-base-content">{category.nameBn}</span>
      </nav>

      {/* Category Header Banner */}
      <div className="bg-gradient-to-r from-white to-[#f0f7f2] rounded-3xl p-6 sm:p-8 border border-base-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-4xl sm:text-5xl shadow-inner shrink-0">
            {category.icon || "🛒"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
              {category.nameBn}
            </h1>
            <p className="text-sm text-base-muted mt-1 font-medium">
              {countBengali}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="text-xs sm:text-sm font-semibold text-primary hover:text-primary-strong transition-colors flex items-center gap-1.5 self-end sm:self-center bg-white px-4 py-2 rounded-xl border border-base-300 shadow-sm"
        >
          <span>← সব পণ্য দেখুন</span>
        </Link>
      </div>

      {/* Category Products Explorer with Sort & Search */}
      <CategoryProductsClient category={category} products={products} />
    </div>
  );
}
