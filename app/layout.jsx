import "./globals.css";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";
import { getCategories, getProducts } from "@/lib/api";

export const metadata = {
  title: "বাজার দর (BazarDor) — নিত্যপ্রয়োজনীয় পণ্যের বাজার দর এক নজরে",
  description:
    "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার আপডেটেড বাজার দর এক নজরে যাচাই করুন। বাংলাদেশ সরকারের বাজারভিত্তিক মূল্য তালিকা।",
  keywords: [
    "বাজার দর",
    "BazarDor",
    "চাল",
    "ডাল",
    "তেল",
    "সবজি",
    "মাছ",
    "মাংস",
    "ডিম",
    "নিত্যপণ্যের দাম",
    "কারওয়ান বাজার",
  ],
  icons: {
    icon: "/logo-icon.png",
  },
};

export default async function RootLayout({ children }) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <html lang="bn">
      <head>
        <link rel="icon" href="/logo-icon.png" />
      </head>
      <body className="bg-base-100 text-base-content min-h-screen flex flex-col font-bengali antialiased">
        <ToastProvider />
        <Navbar categories={categories} />
        <PriceTicker products={products} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
