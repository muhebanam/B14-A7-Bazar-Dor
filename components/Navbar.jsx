"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { getBengaliDate } from "@/lib/bengali";
import toast from "react-hot-toast";
import { User, LogOut, ChevronDown, Menu, X } from "lucide-react";

export default function Navbar({ categories = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [banglaDate, setBanglaDate] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setBanglaDate(getBengaliDate(new Date()));
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছেন");
      setUserMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  const user = session?.user;

  return (
    <header className="bg-white border-b border-base-300 sticky top-0 z-50">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo on Left */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors">
              🛒
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-2xl tracking-tight text-primary">
                  বাজার দর
                </span>
              </div>
              <p className="text-xs text-base-muted font-medium">
                {banglaDate || "আজকের তাজা বাজারদর"}
              </p>
            </div>
          </Link>

          {/* Right Side Auth Buttons / User Profile */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-base-300 hover:border-primary/50 hover:bg-base-200 transition-all text-sm font-semibold text-base-content"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center relative border border-primary/20">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-primary font-bold text-sm">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </span>
                    )}
                  </div>
                  <span className="max-w-[120px] truncate">{user.name || "ব্যবহারকারী"}</span>
                  <ChevronDown className={`w-4 h-4 text-base-muted transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-base-300 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-base-200">
                      <p className="font-bold text-sm text-base-content truncate">
                        {user.name || "ব্যবহারকারী"}
                      </p>
                      <p className="text-xs text-base-muted truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-base-content hover:bg-base-200 hover:text-primary transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>আমার প্রোফাইল</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-base-200">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-bazarError hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>সাইন আউট</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/signin"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-primary border border-primary/30 hover:bg-primary/10 transition-colors"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-primary hover:bg-primary-strong text-white shadow-sm hover:shadow transition-all"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-xl border border-base-300 text-base-content hover:bg-base-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Middle/Second Row: Category Links Bar */}
      <div className="border-t border-base-200 bg-base-100/60 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 py-2.5 overflow-x-auto no-scrollbar">
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium shrink-0 transition-all flex items-center gap-1.5 ${
                pathname === "/"
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white border border-base-300 text-base-content hover:border-primary/50 hover:bg-base-200"
              }`}
            >
              <span>🏠</span>
              <span>হোম</span>
            </Link>

            {categories.map((cat) => {
              const isActive = pathname === `/category/${cat.slug}`;
              return (
                <Link
                  key={cat.id || cat.slug}
                  href={`/category/${cat.slug}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium shrink-0 transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white border border-base-300 text-base-content hover:border-primary/50 hover:bg-base-200"
                  }`}
                >
                  <span>{cat.icon || "📦"}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-base-300 bg-white px-4 py-4 space-y-4">
          <div className="pt-2">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-base-200 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-base-content">{user.name}</p>
                    <p className="text-xs text-base-muted">{user.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-base-300 text-sm font-semibold text-base-content hover:bg-base-200"
                  >
                    <User className="w-4 h-4" />
                    <span>প্রোফাইল</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-200 text-sm font-semibold text-bazarError hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>সাইন আউট</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/signin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 rounded-xl border border-primary text-sm font-semibold text-primary"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 rounded-xl bg-primary text-sm font-semibold text-white"
                >
                  সাইন আপ
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
