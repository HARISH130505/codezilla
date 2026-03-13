"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, type Transition } from "framer-motion";

const tx: Transition = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] };

export default function SignupPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to recruit page after 2 seconds
    const timer = setTimeout(() => {
      router.push("/recruit");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-orange-400/10 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={tx}
        className="relative w-full max-w-sm text-center"
      >
        <div className="mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-orange-400/40">
              <Image src="/branding/Copy of codezilla with fox black.png" alt="Codezilla" fill sizes="32px" className="object-contain" />
            </div>
            <span className="font-passion text-lg text-zinc-800 dark:text-zinc-200 tracking-wide">CODEZILLA</span>
          </div>
          <h1 className="font-passion text-3xl text-zinc-900 dark:text-zinc-100 mb-2">Apply to join</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Public signups are closed. Please apply through our recruitment page.</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 space-y-4 shadow-sm">
          <p className="text-4xl">📋</p>
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Redirecting you to the recruitment page...</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            We only accept new members through our formal recruitment process. Click the button below if you're not redirected automatically.
          </p>
          <Link
            href="/recruit"
            className="inline-flex items-center justify-center w-full rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(249,115,22,0.3)] transition-all duration-200 active:scale-95"
          >
            Go to recruitment page →
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
