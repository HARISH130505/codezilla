"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { CheckCircle2, ArrowLeft, Users, Zap, Globe, Code2 } from "lucide-react";

const tx = (delay = 0): Transition => ({
  duration: 0.55,
  ease: [0.25, 0.46, 0.45, 0.94],
  delay,
});

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: tx(delay),
});

const PERKS = [
  { icon: Code2,  title: "Build real things",       desc: "Ship actual projects — not just assignments. We build tools, websites and apps used by real people on campus." },
  { icon: Globe,  title: "Open source by default",  desc: "Everything we make is open. You'll learn to contribute to open source and get your name on code that lasts." },
  { icon: Zap,    title: "Workshops & hackathons",   desc: "Regular hands-on sessions, internal hackathons, and access to Mozilla's global campus club network." },
  { icon: Users,  title: "A team that knows you",   desc: "40 active members — small enough that everyone has a role, big enough to get serious things done." },
];

const WHAT_WE_LOOK_FOR = [
  "Curiosity — you don't need to be an expert, just keen to learn",
  "Commitment — show up, follow through, contribute consistently",
  "Collaboration — you work well with others and share credit",
  "Any year, any branch — we're domain-agnostic",
];

type FormState = "idle" | "submitting" | "success";

export default function RecruitPage() {
  const [form, setForm] = useState({ name: "", email: "", branch: "", year: "", why: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    // Simulate submission — wire up to your backend / Supabase / Google Form as needed
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
  };

  const inputCls =
    "w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400/50 transition";

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* ── Top bar ── */}
      <div className="max-w-5xl mx-auto px-5 md:px-8 pt-6 pb-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/80 transition-colors"
        >
          <ArrowLeft size={14} /> Back to home
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 pt-10 pb-16 md:pt-16 md:pb-20">
        <motion.div {...fade(0)} className="flex items-center gap-3 mb-6">
          <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-orange-400/30">
            <Image src="/branding/codezilla with fox 2.png" alt="Codezilla" fill sizes="36px" className="object-contain" />
          </div>
          <span className="text-[11px] font-semibold text-orange-400 uppercase tracking-widest">
            Codezilla · Open Recruitment
          </span>
        </motion.div>

        <motion.h1 {...fade(0.06)} className="font-passion text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-4">
          Join the core team.
        </motion.h1>
        <motion.p {...fade(0.12)} className="text-base text-white/50 max-w-2xl leading-relaxed">
          We're the Mozilla Campus Club at SRMIST Ramapuram. We're looking for students who want to
          do more than attend events — people who want to <span className="text-white/80">build, lead and ship</span>.
        </motion.p>
      </section>

      {/* ── Two-col: perks + form ── */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 pb-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* Left — what you get */}
        <div className="space-y-10">
          <motion.div {...fade(0.1)} className="space-y-4">
            <h2 className="font-passion text-3xl text-white">What you get</h2>
            <div className="space-y-4">
              {PERKS.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  {...fade(0.1 + i * 0.06)}
                  className="flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-400/20 flex items-center justify-center">
                    <Icon size={16} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white mb-1">{title}</p>
                    <p className="text-xs text-white/45 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fade(0.32)} className="space-y-3">
            <h2 className="font-passion text-2xl text-white">What we look for</h2>
            <ul className="space-y-2">
              {WHAT_WE_LOOK_FOR.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-white/50">
                  <CheckCircle2 size={15} className="text-orange-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right — application form */}
        <motion.div {...fade(0.16)}>
          {state === "success" ? (
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-orange-500/10 border border-orange-400/30 flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} className="text-orange-400" />
              </div>
              <h3 className="font-passion text-3xl text-white">Application received!</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                Thanks for applying. We review applications every semester and will reach out to you
                at the email you provided. Keep an eye on your inbox.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center mt-2 px-6 py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.05] text-sm text-white/70 hover:text-white transition-colors"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.04] p-6 md:p-8 space-y-5"
            >
              <div>
                <h2 className="font-passion text-2xl text-white mb-1">Apply now</h2>
                <p className="text-xs text-white/40">Takes about 2 minutes.</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs text-white/50 mb-1.5 font-medium">Full name</label>
                <input
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={inputCls}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-white/50 mb-1.5 font-medium">SRM email</label>
                <input
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="yourname@srmist.edu.in"
                  className={inputCls}
                />
              </div>

              {/* Branch + Year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 font-medium">Branch</label>
                  <input
                    name="branch"
                    required
                    value={form.branch}
                    onChange={handleChange}
                    placeholder="e.g. CSE, ECE"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/50 mb-1.5 font-medium">Year</label>
                  <select
                    name="year"
                    required
                    value={form.year}
                    onChange={handleChange}
                    className={inputCls}
                  >
                    <option value="" disabled>Select</option>
                    <option value="1">1st year</option>
                    <option value="2">2nd year</option>
                    <option value="3">3rd year</option>
                    <option value="4">4th year</option>
                  </select>
                </div>
              </div>

              {/* Why */}
              <div>
                <label className="block text-xs text-white/50 mb-1.5 font-medium">
                  Why do you want to join? <span className="text-white/25">(2–3 sentences)</span>
                </label>
                <textarea
                  name="why"
                  required
                  rows={4}
                  value={form.why}
                  onChange={handleChange}
                  placeholder="Tell us what drew you to Codezilla and what you'd like to work on..."
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={state === "submitting"}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 active:scale-[0.98] shadow-[0_8px_24px_rgba(249,115,22,0.35)]"
              >
                {state === "submitting" ? "Submitting…" : "Submit application →"}
              </button>

              <p className="text-[11px] text-white/25 text-center">
                Already a member?{" "}
                <Link href="/login" className="text-orange-400 hover:text-orange-300 underline underline-offset-2">
                  Sign in here
                </Link>
              </p>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}
