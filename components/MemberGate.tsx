"use client";

import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { useUser } from "@/lib/useUser";

interface MemberGateProps {
  children: React.ReactNode;
  /** Label shown on the lock card, e.g. "Full event details" */
  label?: string;
}

/**
 * Wraps content that is only visible to logged-in club members.
 * Guests see a blurred placeholder + CTA to log in / sign up.
 */
export default function MemberGate({ children, label = "This content" }: MemberGateProps) {
  const { isMember, loading } = useUser();

  if (loading) {
    return (
      <div className="rounded-2xl border border-zinc-200/60 bg-zinc-50 animate-pulse h-32" />
    );
  }

  if (isMember) {
    return <>{children}</>;
  }

  // Guest view — blurred content + overlay
  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Blurred content hint */}
      <div className="select-none pointer-events-none blur-sm opacity-40 saturate-50">
        {children}
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-zinc-950/70 backdrop-blur-sm px-6 py-8 text-center gap-4">
        <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center">
          <Lock size={16} className="text-orange-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-800">{label} is members only</p>
          <p className="text-xs text-zinc-500 mt-1 max-w-xs">
            Active Codezilla members get full access. It&apos;s free to apply.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 px-4 py-2 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(249,115,22,0.35)] transition-all duration-200"
          >
            Apply for membership
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white hover:border-orange-300 px-4 py-2 text-xs font-medium text-zinc-700 transition-all duration-200"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
