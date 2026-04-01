"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, X, User, Hash, BookOpen, Building2, GraduationCap, Cpu } from "lucide-react";
import { motion, type Transition } from "framer-motion";

const tx: Transition = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] };

const POSITIONS = [
  "Lead",
  "Co-Lead",
  "Technical-Lead",
  "Design-Lead",
  "Content-Lead",
  "Management & PR - Lead",
];

const YEARS = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
];

export default function AdminOnboardingPage() {
  const router = useRouter();
  const [userId, setUserId]       = useState<string | null>(null);
  const [loading, setLoading]     = useState(true);
  const [saving,  setSaving]      = useState(false);
  const [error,   setError]       = useState<string | null>(null);

  // Form fields
  const [fullName,    setFullName]    = useState("");
  const [rollNumber,  setRollNumber]  = useState("");
  const [position,    setPosition]    = useState("");
  const [department,  setDepartment]  = useState("");
  const [year,        setYear]        = useState("");
  const [skills,      setSkills]      = useState<string[]>([]);
  const [skillInput,  setSkillInput]  = useState("");

  useEffect(() => {
    const init = async () => {
      if (!supabase) { setError("Supabase not configured."); setLoading(false); return; }
      const { data: { user }, error: uErr } = await supabase.auth.getUser();
      if (uErr || !user) { router.replace("/login"); return; }
      setUserId(user.id);
      // Pre-fill name from auth metadata
      setFullName(user.user_metadata?.full_name ?? "");
      setLoading(false);
    };
    init();
  }, [router]);

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) setSkills((prev) => [...prev, s]);
    setSkillInput("");
  };

  const onSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addSkill(); }
  };

  const removeSkill = (s: string) => setSkills((prev) => prev.filter((x) => x !== s));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase || !userId) return;
    if (!fullName.trim())   { setError("Full name is required."); return; }
    if (!position)          { setError("Please select a position."); return; }
    if (!department.trim()) { setError("Department is required."); return; }
    if (!year)              { setError("Please select your year of study."); return; }

    setSaving(true);
    setError(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: upsertError } = await (supabase.from("profiles") as any).upsert({
      id:                  userId,
      full_name:           fullName.trim(),
      roll_number:         rollNumber.trim() || null,
      position,
      department:          department.trim(),
      year,
      skills,
      onboarding_complete: true,
      joined_at:           new Date().toISOString(),
      role:                "admin",
    });

    setSaving(false);
    if (upsertError) { setError(upsertError.message); return; }

    router.push("/admin");
  };

  const fieldCls =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:focus:ring-orange-400/40 focus:border-orange-500/40 dark:focus:border-orange-400/50 transition";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="w-7 h-7 animate-spin text-orange-500 dark:text-orange-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 relative overflow-hidden">
      {/* BG glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-orange-500/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-72 h-72 bg-amber-400/5 blur-3xl rounded-full" />

      <div className="relative max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-8">
          <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-orange-400/30">
            <Image src="/branding/Copy of codezilla with fox black.png" alt="Codezilla" fill sizes="28px" className="object-contain" />
          </div>
          <span className="font-passion text-base text-zinc-800 dark:text-white/80 tracking-wide">CODEZILLA</span>
        </div>

        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={tx} className="mb-8">
          <h1 className="font-passion text-4xl text-zinc-900 dark:text-white mb-2">Welcome aboard! 🦊</h1>
          <p className="text-sm text-zinc-500 dark:text-white/40">Let&apos;s set up your Codezilla Admin profile. This takes less than a minute.</p>
        </motion.div>

        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-300">
            {error}
          </div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...tx, delay: 0.08 }}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl p-6 space-y-5"
        >
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-white/35 uppercase tracking-wider">
              <User size={10} className="text-orange-500 dark:text-orange-500/80 dark:text-orange-400/70" /> Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
              className={fieldCls}
            />
          </div>

          {/* Roll Number */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-white/35 uppercase tracking-wider">
              <Hash size={10} className="text-orange-500 dark:text-orange-500/80 dark:text-orange-400/70" /> Roll Number
            </label>
            <input
              type="text"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="e.g. RA2111003010001"
              className={fieldCls}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Position */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-white/35 uppercase tracking-wider">
                <Cpu size={10} className="text-orange-500 dark:text-orange-500/80 dark:text-orange-400/70" /> Position *
              </label>
              <select
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className={`${fieldCls} appearance-none`}
              >
                <option value="" className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Select position</option>
                {POSITIONS.map((p) => (
                  <option key={p} value={p} className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">{p}</option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-white/35 uppercase tracking-wider">
                <GraduationCap size={10} className="text-orange-500 dark:text-orange-500/80 dark:text-orange-400/70" /> Year of Study *
              </label>
              <select
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={`${fieldCls} appearance-none`}
              >
                <option value="" className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Select year</option>
                {YEARS.map((y) => (
                  <option key={y.value} value={y.value} className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">{y.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Department */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-white/35 uppercase tracking-wider">
              <Building2 size={10} className="text-orange-500 dark:text-orange-500/80 dark:text-orange-400/70" /> Department *
            </label>
            <input
              type="text"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. Computer Science & Engineering"
              className={fieldCls}
            />
          </div>

          {/* Skills */}
          <div className="space-y-1.5">
            <label className="flex items-center gap-1.5 text-[10px] text-zinc-500 dark:text-white/35 uppercase tracking-wider">
              <BookOpen size={10} className="text-orange-500 dark:text-orange-500/80 dark:text-orange-400/70" /> Skills (press Enter to add)
            </label>
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 space-y-2 focus-within:ring-2 focus-within:ring-orange-500/30 dark:focus-within:ring-orange-400/40 focus-within:border-orange-500/40 dark:focus-within:border-orange-400/50 transition">
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 rounded-full bg-orange-500/20 border border-orange-500/30 px-2.5 py-0.5 text-[11px] text-orange-600 dark:text-orange-300 font-medium"
                    >
                      {s}
                      <button type="button" onClick={() => removeSkill(s)} className="text-orange-500 dark:text-orange-500/70 dark:text-orange-400/60 hover:text-orange-600 dark:text-orange-300 transition-colors">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={onSkillKeyDown}
                onBlur={addSkill}
                placeholder="e.g. React, Python, Git…"
                className="w-full bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/25 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition-all duration-200 active:scale-95"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? "Saving…" : "Complete setup →"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
