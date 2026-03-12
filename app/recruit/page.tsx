"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { CheckCircle2, ArrowLeft, Users, Zap, Globe, Code2, Palette, Megaphone, BarChart2, FileText } from "lucide-react";

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

const DOMAINS = [
  { id: "technical",   label: "Technical",   icon: Code2,      desc: "Web dev, open source, tooling, software projects" },
  { id: "design",      label: "Design",       icon: Palette,    desc: "UI/UX, branding, visual communication, motion" },
  { id: "pr",          label: "PR",           icon: Megaphone,  desc: "Outreach, social media, community relations" },
  { id: "management",  label: "Management",   icon: BarChart2,  desc: "Event planning, logistics, team coordination" },
  { id: "content",     label: "Content",      icon: FileText,   desc: "Writing, blogs, documentation, storytelling" },
];

const PERKS = [
  { icon: Code2,   title: "Build real things",       desc: "Ship actual projects — not just assignments. We build tools, websites and apps used by real people on campus." },
  { icon: Globe,   title: "Open source by default",  desc: "Everything we make is open. You'll learn to contribute to open source and get your name on code that lasts." },
  { icon: Zap,     title: "Workshops & hackathons",  desc: "Regular hands-on sessions, internal hackathons, and access to Mozilla's global campus club network." },
  { icon: Users,   title: "A team that knows you",   desc: "40 active members — small enough that everyone has a role, big enough to get serious things done." },
];

const WHAT_WE_LOOK_FOR = [
  "Curiosity — you don't need to be an expert, just keen to learn",
  "Commitment — show up, follow through, contribute consistently",
  "Collaboration — you work well with others and share credit",
  "Any year, any branch — we welcome everyone",
];

type FormState = "idle" | "submitting" | "success";

export default function RecruitPage() {
  const [form, setForm] = useState({
    name: "", email: "", branch: "", year: "", domain: "", why: "",
  });
  const [state, setState] = useState<FormState>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
  };

  const inputCls =
    "w-full rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400 transition shadow-sm";

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">

      {/* ── Top bar ── */}
      <div className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-5 md:px-8 h-12 flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <ArrowLeft size={14} /> Back to home
          </Link>
          <span className="text-zinc-200">|</span>
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5 rounded overflow-hidden">
              <Image src="/branding/codezilla with fox 2.png" alt="Codezilla" fill sizes="20px" className="object-contain" />
            </div>
            <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">Open Recruitment</span>
          </div>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 pt-12 pb-10 md:pt-16 md:pb-12">
        <motion.h1 {...fade(0)} className="font-passion text-5xl md:text-6xl lg:text-7xl text-zinc-900 leading-tight mb-4">
          Join the core team.
        </motion.h1>
        <motion.p {...fade(0.08)} className="text-base text-zinc-500 max-w-2xl leading-relaxed">
          We're the Mozilla Campus Club at SRMIST Ramapuram. Looking for students who want to do more
          than attend events — people who want to{" "}
          <span className="text-zinc-800 font-medium">build, lead and ship</span>.
        </motion.p>
      </section>

      {/* ── Two-col ── */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 pb-24 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* Left */}
        <div className="space-y-10">

          {/* Domains */}
          <motion.div {...fade(0.1)} className="space-y-4">
            <h2 className="font-passion text-2xl text-zinc-800">Pick your domain</h2>
            <div className="grid grid-cols-1 gap-2">
              {DOMAINS.map(({ id, label, icon: Icon, desc }, i) => (
                <motion.button
                  key={id}
                  type="button"
                  {...fade(0.1 + i * 0.05)}
                  onClick={() => setForm((p) => ({ ...p, domain: id }))}
                  className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-150 ${
                    form.domain === id
                      ? "border-orange-400 bg-orange-50 shadow-[0_0_0_3px_rgba(249,115,22,0.12)]"
                      : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border ${
                    form.domain === id
                      ? "bg-orange-500/10 border-orange-300"
                      : "bg-zinc-100 border-zinc-200"
                  }`}>
                    <Icon size={16} className={form.domain === id ? "text-orange-500" : "text-zinc-400"} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${form.domain === id ? "text-orange-700" : "text-zinc-700"}`}>{label}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
                  </div>
                  {form.domain === id && (
                    <CheckCircle2 size={16} className="text-orange-500 ml-auto flex-shrink-0" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Perks */}
          <motion.div {...fade(0.35)} className="space-y-3">
            <h2 className="font-passion text-2xl text-zinc-800">What you get</h2>
            <div className="space-y-3">
              {PERKS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3 rounded-xl border border-zinc-100 bg-white p-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center">
                    <Icon size={14} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-700 mb-0.5">{title}</p>
                    <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* What we look for */}
          <motion.div {...fade(0.45)} className="space-y-3">
            <h2 className="font-passion text-2xl text-zinc-800">What we look for</h2>
            <ul className="space-y-2">
              {WHAT_WE_LOOK_FOR.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-500">
                  <CheckCircle2 size={15} className="text-orange-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Right — form */}
        <motion.div {...fade(0.16)} className="lg:sticky lg:top-20">
          {state === "success" ? (
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center space-y-4 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto">
                <CheckCircle2 size={28} className="text-orange-500" />
              </div>
              <h3 className="font-passion text-3xl text-zinc-900">Application received!</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Thanks for applying to the{" "}
                <span className="font-medium text-zinc-700 capitalize">{form.domain}</span> team.
                We review applications every semester and will reach out to you at the email you provided.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center mt-2 px-6 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-sm text-zinc-600 hover:bg-zinc-100 transition-colors"
              >
                Back to home
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-zinc-200 bg-white p-6 md:p-8 space-y-5 shadow-sm"
            >
              <div>
                <h2 className="font-passion text-2xl text-zinc-900 mb-1">Apply now</h2>
                <p className="text-xs text-zinc-400">Takes about 2 minutes.</p>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5 font-medium">Full name</label>
                <input name="name" required value={form.name} onChange={handleChange} placeholder="Your full name" className={inputCls} />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5 font-medium">SRM email</label>
                <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="yourname@srmist.edu.in" className={inputCls} />
              </div>

              {/* Branch + Year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5 font-medium">Branch</label>
                  <input name="branch" required value={form.branch} onChange={handleChange} placeholder="e.g. CSE, ECE" className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1.5 font-medium">Year</label>
                  <select name="year" required value={form.year} onChange={handleChange} className={inputCls}>
                    <option value="" disabled>Select</option>
                    <option value="1">1st year</option>
                    <option value="2">2nd year</option>
                    <option value="3">3rd year</option>
                    <option value="4">4th year</option>
                  </select>
                </div>
              </div>

              {/* Domain — shown as a read-only summary if selected on left, else a select */}
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5 font-medium">Domain applying for</label>
                {form.domain ? (
                  <div className="flex items-center justify-between rounded-xl border border-orange-300 bg-orange-50 px-4 py-2.5">
                    <span className="text-sm font-semibold text-orange-700 capitalize">{form.domain}</span>
                    <button
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, domain: "" }))}
                      className="text-xs text-orange-400 hover:text-orange-600 underline"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <select name="domain" required value={form.domain} onChange={handleChange} className={inputCls}>
                    <option value="" disabled>Select a domain</option>
                    {DOMAINS.map((d) => (
                      <option key={d.id} value={d.id}>{d.label}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Why */}
              <div>
                <label className="block text-xs text-zinc-500 mb-1.5 font-medium">
                  Why do you want to join? <span className="text-zinc-300">(2–3 sentences)</span>
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
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all duration-200 active:scale-[0.98] shadow-[0_4px_16px_rgba(249,115,22,0.3)]"
              >
                {state === "submitting" ? "Submitting…" : "Submit application →"}
              </button>

              <p className="text-[11px] text-zinc-400 text-center">
                Already a member?{" "}
                <Link href="/login" className="text-orange-500 hover:text-orange-600 underline underline-offset-2">
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
