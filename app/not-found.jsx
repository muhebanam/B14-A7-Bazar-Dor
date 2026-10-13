import Link from "next/link";
import { Home, HelpCircle } from "lucide-react";

export const metadata = {
  title: "পাতাটি খুঁজে পাওয়া যায়নি — ৪MD৪ বাজার দর",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-10 md:p-12 border border-base-300 shadow-md text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto text-4xl shadow-inner">
          <HelpCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold text-primary tracking-tight">
            ৪০৪
          </span>
          <h1 className="text-2xl font-bold text-base-content tracking-tight">
            পাতাটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm text-base-muted leading-relaxed">
            দুঃখিত, আপনি যে লিংক বা ঠিকানায় প্রবেশ করার চেষ্টা করছেন তা বর্তমান সিস্টেমে বিদ্যমান নেই।
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary hover:bg-primary-strong text-white font-bold text-sm shadow-md transition-all hover:-translate-y-0.5"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
