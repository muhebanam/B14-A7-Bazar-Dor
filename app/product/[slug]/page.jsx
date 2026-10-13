import Link from "next/link";
import { getProductByIdOrSlug } from "@/lib/api";
import ProductDetailView from "@/components/ProductDetailView";
import { AlertCircle, Home } from "lucide-react";

export async function generateMetadata({ params }) {
  const product = await getProductByIdOrSlug(params.slug);
  if (!product) {
    return {
      title: "পণ্য পাওয়া যায়নি — বাজার দর",
    };
  }
  return {
    title: `${product.nameBn} আজকের বাজার দর — বাজার দর`,
    description: `${product.nameBn} এর আজকের বাজার দর ${product.today} টাকা (${product.unit})। বিভিন্ন বাজারের সর্বনিম্ন, সর্বাধিক ও গড় দাম এক নজরে দেখুন।`,
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductByIdOrSlug(params.slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl p-10 md:p-14 border border-base-300 shadow-sm max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-3xl bg-red-50 text-bazarError flex items-center justify-center mx-auto mb-6 text-4xl">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-base-content mb-2">
            পণ্যটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm text-base-muted mb-8 leading-relaxed">
            দুঃখিত, আপনি যে পণ্যের বিবরণ খুঁজছেন তা ডাটাবেজে পাওয়া যায়নি।
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

  return <ProductDetailView product={product} />;
}
