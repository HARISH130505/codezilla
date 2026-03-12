"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, UserPlus, Mail, Lock, User } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { motion, type Transition } from "framer-motion";

const tx: Transition = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] };

export default function SignupPage() {
  const router = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [success,  setSuccess]  = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!supabase) { setError("Supabase is not configured."); return; }
    setLoading(true);
    const { error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });
    setLoading(false);
    if (signupError) { setError(signupError.message); return; }
    setSuccess(true);
  };

  const handleGoogleSignup = async () => {
    setError(null);
    if (!supabase) { setError("Supabase is not configured."); return; }
    setLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/portal` },
    });
    if (oauthError) { setError(oauthError.message); setLoading(false); }
  };

  const inputCls =
    "w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-10 pr-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400 dark:focus:border-orange-500 transition shadow-sm";

  if (success) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={tx}
          className="max-w-sm w-full rounded-2xl border border-emerald-200 dark:border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/10 p-8 text-center space-y-4 shadow-sm"
        >
          <p className="text-4xl">🎉</p>
          <h2 className="font-passion text-2xl text-zinc-900 dark:text-zinc-100">Check your email</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            We&apos;ve sent a confirmation link to <strong className="text-zinc-800 dark:text-zinc-200">{email}</strong>.
            Click it to activate your account then{" "}
            <Link href="/login" className="text-orange-500 hover:underline">sign in</Link>.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-orange-400/10 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={tx}
        className="relative w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-orange-400/40">
              <Image src="/branding/Copy of codezilla with fox black.png" alt="Codezilla" fill sizes="32px" className="object-contain" />
            </div>
            <span className="font-passion text-lg text-zinc-800 dark:text-zinc-200 tracking-wide">CODEZILLA</span>
          </div>
          <h1 className="font-passion text-3xl text-zinc-900 dark:text-zinc-100 mb-1">Join the club</h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Create your free Codezilla profile</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4 shadow-sm">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-3">
            <div className="relative">
              <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="text" required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
            </div>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
            </div>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="password" required minLength={6} placeholder="Password (min 6 chars)" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(249,115,22,0.3)] transition-all duration-200 active:scale-95"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <UserPlus size={15} />}
              Create account
            </button>
          </form>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
          </div>

          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 px-5 py-2.5 text-sm text-zinc-700 dark:text-zinc-200 font-medium transition-all duration-200"
          >
            <FaGoogle size={13} />
            Continue with Google
          </button>

          <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-500">
            Already a member?{" "}
            <Link href="/login" className="text-orange-500 hover:text-orange-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
