"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, Mail, LogOut, Edit3, ArrowLeft, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে সাইন ইন করুন");
      router.replace("/signin?callbackUrl=/profile");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছেন");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  if (isPending) {
    return (
      <div className="max-w-2xl mx-auto my-16 px-4 animate-pulse space-y-6">
        <div className="h-8 w-48 rounded bg-base-300" />
        <div className="bg-white rounded-3xl p-8 border border-base-300 space-y-6">
          <div className="w-24 h-24 rounded-full bg-base-200 mx-auto" />
          <div className="h-6 w-40 rounded bg-base-200 mx-auto" />
          <div className="h-4 w-60 rounded bg-base-200 mx-auto" />
        </div>
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back to Home */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-base-muted hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>হোম পেজে ফিরে যান</span>
      </Link>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-base-300 shadow-md space-y-8 relative overflow-hidden">
        {/* Header */}
        <div className="text-center space-y-2 border-b border-base-200 pb-8">
          <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-primary/20 bg-primary/10 shadow-md">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User Avatar"}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-extrabold text-primary">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight mt-4">
            {user.name || "ব্যবহারকারী"}
          </h1>
          <p className="text-sm text-base-muted font-medium">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* Profile Info Fields */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-base-100 rounded-2xl border border-base-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-base-muted font-semibold">নাম</p>
                <p className="text-sm font-bold text-base-content">{user.name}</p>
              </div>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold">
              সক্রিয়
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-base-100 rounded-2xl border border-base-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-base-muted font-semibold">ইমেইল</p>
                <p className="text-sm font-bold text-base-content">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#1a9951] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>ভেরিফাইড</span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Challenge C3 Update Information */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <Link
            href="/profile/update"
            className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-primary hover:bg-primary-strong text-white font-bold text-sm shadow-md hover:shadow transition-all hover:-translate-y-0.5"
          >
            <Edit3 className="w-4 h-4" />
            <span>তথ্য আপডেট করুন</span>
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-red-200 text-bazarError hover:bg-red-50 font-bold text-sm transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>সাইন আউট</span>
          </button>
        </div>
      </div>
    </div>
  );
}
