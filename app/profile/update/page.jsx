"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft, User, CheckCircle2 } from "lucide-react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("অনুগ্রহ করে সাইন ইন করুন");
      router.replace("/signin?callbackUrl=/profile/update");
    } else if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("অনুগ্রহ করে আপনার নাম লিখুন");
      return;
    }

    setLoading(true);
    try {
      // BetterAuth updateUser API
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res?.error) {
        toast.error(res.error.message || "তথ্য আপডেট ব্যর্থ হয়েছে");
        setLoading(false);
        return;
      }

      toast.success("তথ্য সফলভাবে আপডেট করা হয়েছে!");
      router.push("/profile");
      router.refresh();
    } catch (err) {
      toast.error(err?.message || "তথ্য আপডেটে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="max-w-md mx-auto my-16 px-4 animate-pulse space-y-4">
        <div className="h-8 w-40 rounded bg-base-300" />
        <div className="h-48 rounded-3xl bg-white border border-base-300" />
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 py-12 space-y-6">
      {/* Back to Profile */}
      <Link
        href="/profile"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-base-muted hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>প্রোফাইলে ফিরে যান</span>
      </Link>

      <div className="bg-white rounded-3xl p-8 border border-base-300 shadow-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-base-content tracking-tight">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-base-muted mt-1">
            আপনার অ্যাকাউন্টের নাম পরিবর্তন করতে নিচের ফরমটি পূরণ করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-base-content mb-1.5">
              নাম (Name)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-base-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full pl-10 pr-4 py-2.5 bg-base-100 rounded-xl border border-base-300 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-base-muted mb-1.5">
              ইমেইল (পরিবর্তনযোগ্য নয়)
            </label>
            <input
              type="email"
              disabled
              value={session.user.email}
              className="w-full px-4 py-2.5 bg-base-200 text-base-muted rounded-xl border border-base-300 text-sm cursor-not-allowed opacity-75"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary-strong text-white font-bold text-sm shadow-md hover:shadow transition-all disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{loading ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
