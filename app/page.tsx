"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { LogIn } from "lucide-react";
import Navbar from "@/components/Navbar";

const tx = (delay = 0): Transition => ({
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
  delay,
});

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-zinc-950 overflow-hidden flex flex-col">

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 dark:opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-orange-400/10 blur-[100px] rounded-full" />

      {/* Shared Navbar (has dark mode + toggle built in) */}
      <Navbar />

      {/* ── Content ── */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-5 md:px-8 lg:px-10 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Left column */}
        <div className="flex-1 space-y-7 text-center lg:text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tx(0)}
            className="inline-flex items-center gap-2 rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30 px-3.5 py-1.5 text-[11px] font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>
            Mozilla Campus Club · SRMIST Ramapuram
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tx(0.08)}
            className="space-y-2"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
              <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-orange-400/30">
                <Image src="/branding/Copy of codezilla with fox black.png" alt="Codezilla" fill sizes="40px" className="object-contain dark:invert" />
              </div>
              <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-[0.2em]">Official club portal</span>
            </div>
            <h1 className="font-passion text-5xl md:text-6xl lg:text-7xl text-zinc-900 dark:text-zinc-100 leading-[1.05]">
              Codezilla
            </h1>
            <h1 className="font-passion text-4xl md:text-5xl lg:text-6xl text-orange-500 leading-[1.1]">
              The premiere open source club of SRM Ramapuram.
            </h1>
          </motion.div>

          {/* Body */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tx(0.16)}
            className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            40 active members. 3,000-strong community. We build, ship and learn in the open —
            workshops, hackathons, and real projects that matter on campus and beyond.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tx(0.24)}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
          >
            <Link
              href="/recruit"
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(249,115,22,0.35)] transition-all duration-200 active:scale-95"
            >
              Apply to join →
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 px-7 py-3 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-200 shadow-sm"
            >
              <LogIn size={14} /> Member login
            </Link>
          </motion.div>

          {/* Trust chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={tx(0.32)}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1.5 text-[11px] text-zinc-400 dark:text-zinc-500"
          >
            <span>✅ Digital Codezilla ID</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <span>✅ Fast check-in at events</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            <span>✅ Track your journey</span>
          </motion.div>
        </div>

        {/* Right column — snapshot card */}
        <motion.div
          initial={{ opacity: 0, x: 32, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={tx(0.12)}
          className="w-full lg:w-[44%] max-w-md"
        >
          <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4 shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-orange-500/70 mb-0.5">Live on campus</p>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">Codezilla community snapshot</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-2.5 py-1 text-[10px] text-zinc-500 dark:text-zinc-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                open source first
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
              <Image src="/photo.jpg" alt="Codezilla club" width={640} height={380} className="w-full h-48 md:h-52 object-cover" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Members",   value: "40+", sub: "active core" },
                { label: "Community", value: "3K+", sub: "audience" },
                { label: "Events",    value: "20+", sub: "workshops" },
              ].map(({ label, value, sub }) => (
                <div key={label} className="rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 p-3 text-center">
                  <p className="text-[9px] uppercase tracking-widest text-orange-500/60 mb-0.5">{label}</p>
                  <p className="text-lg font-passion text-zinc-800 dark:text-zinc-200">{value}</p>
                  <p className="text-[9px] text-zinc-400 dark:text-zinc-500 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-orange-100 dark:border-orange-500/20 bg-orange-50 dark:bg-orange-500/10 px-4 py-3 flex items-start gap-3">
              <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-black text-white">CZ</div>
              <div>
                <p className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  &ldquo;This portal is how we recognise you as Codezilla.&rdquo;
                </p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-relaxed">
                  Create your profile once, bring it to every event.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
