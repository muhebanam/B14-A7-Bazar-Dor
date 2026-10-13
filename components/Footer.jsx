import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-base-200">
          {/* Left Side */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0">
              🛒
            </div>
            <div>
              <p className="font-bold text-lg text-primary">বাজার দর</p>
              <p className="text-sm text-base-content font-medium">
                বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div className="text-center md:text-right">
            <p className="text-sm text-base-muted italic">
              “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
            </p>
          </div>
        </div>

        {/* Bottom copyright & quick links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-base-muted">
          <p>© {new Date().getFullYear()} বাজার দর (BazarDor). সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-6 font-medium">
            <Link href="/" className="hover:text-primary transition-colors">
              হোম
            </Link>
            <Link href="/signin" className="hover:text-primary transition-colors">
              সাইন ইন
            </Link>
            <Link href="/signup" className="hover:text-primary transition-colors">
              সাইন আপ
            </Link>
            <Link href="/profile" className="hover:text-primary transition-colors">
              প্রোফাইল
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
