"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, LogIn, Mail, Lock } from "lucide-react";
import { FaGoogle } from "react-icons/fa6";
import { motion, type Transition } from "framer-motion";

const tx: Transition = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] };

export default function AdminLoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  /** Check if the email is in the allowed_emails whitelist */
  async function checkWhitelist(userEmail: string): Promise<boolean> {
    if (!supabase) return false;
    const { data, error } = await supabase
      .from("allowed_admins")
      .select("id")
      .eq("email", userEmail.toLowerCase().trim())
      .maybeSingle();
    if (error) return false;
    return !!data;
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!supabase) { setError("Supabase is not configured."); return; }
    setLoading(true);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) { setError(loginError.message); setLoading(false); return; }
    if (!data.session) { setError("Login succeeded but no session was returned."); setLoading(false); return; }

    // Whitelist check
    const allowed = await checkWhitelist(email);
    if (!allowed) {
      await supabase.auth.signOut();
      setError("Your email is not on the Codezilla Admin list. Access Denied.");
      setLoading(false);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabase.from("profiles") as any).update({ role: "admin" }).eq("id", data.session.user.id);
    
    setLoading(false);
    router.push("/admin");
  };

  const handleGoogleLogin = async () => {
    setError(null);
    if (!supabase) { setError("Supabase is not configured."); return; }
    setLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/admin` },
    });
    // Note: for Google OAuth, whitelist check happens on the admin page after redirect
    if (oauthError) { setError(oauthError.message); setLoading(false); }
  };

  const inputCls =
    "w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-10 pr-4 py-2.5 text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400 dark:focus:border-orange-500 transition shadow-sm";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* bg glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-orange-400/10 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={tx}
        className="relative w-full max-w-sm"
      >
        {/* Logo + title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden border border-orange-400/40">
              <Image src="/branding/Copy of codezilla with fox black.png" alt="Codezilla" fill sizes="32px" className="object-contain" />
            </div>
            <span className="font-passion text-lg text-zinc-800 dark:text-zinc-200 tracking-wide">CODEZILLA</span>
          </div>
          <h1 className="font-passion text-3xl text-zinc-900 dark:text-zinc-100 mb-1">Welcome back</h1>
          <p className="text-xs text-zinc-400 dark:text-zinc-500">Sign in to your Codezilla admin account</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 space-y-4 shadow-sm">
          {error && (
            <div className="rounded-xl border border-red-200 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-3">
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
            </div>
            <div className="relative">
              <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(249,115,22,0.3)] transition-all duration-200 active:scale-95"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <LogIn size={15} />}
              Sign in
            </button>
          </form>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-800" />
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 px-5 py-2.5 text-sm text-zinc-700 dark:text-zinc-200 font-medium transition-all duration-200"
          >
            <FaGoogle size={13} />
            Continue with Google
          </button>

          <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-500">
            Not a member yet?{" "}
            <Link href="/recruit" className="text-orange-500 hover:text-orange-600 transition-colors">
              Apply for membership
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
