"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Menu, X, LogIn } from "lucide-react";

const tx = (delay = 0): Transition => ({
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
  delay,
});

const NAV_LINKS = [
  { label: "About",   href: "/about" },
  { label: "Events",  href: "/events" },
  { label: "Blogs",   href: "/blogs" },
  { label: "Members", href: "/members" },
  { label: "Contact", href: "/contact" },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-zinc-50 overflow-hidden flex flex-col">

      {/* ── Subtle grid background ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Top-center orange glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-orange-400/10 blur-[100px] rounded-full" />

      {/* ── Navbar ── */}
      <nav className="relative z-20 w-full border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-orange-400/40 group-hover:border-orange-500 transition-colors duration-200">
              <Image src="/branding/Copy of codezilla with fox black.png" alt="Codezilla" fill sizes="32px" className="object-contain" priority />
            </div>
            <span className="font-passion text-lg text-zinc-900 tracking-wide group-hover:text-orange-500 transition-colors duration-200">
              CODEZILLA
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 rounded-md text-sm font-medium text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-zinc-200 bg-white text-zinc-600 text-xs font-medium hover:text-zinc-900 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-150 shadow-sm"
            >
              <LogIn size={12} />
              Member login
            </Link>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden absolute top-14 inset-x-0 bg-white border-b border-zinc-200 px-5 py-4 space-y-1 shadow-md"
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-zinc-100 mt-2 space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 text-sm font-medium"
                >
                  <LogIn size={14} /> Member login
                </Link>
                <Link
                  href="/recruit"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-orange-500 text-white text-sm font-semibold"
                >
                  Apply to join
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Content ── */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-5 md:px-8 lg:px-10 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Left column */}
        <div className="flex-1 space-y-7 text-center lg:text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tx(0)}
            className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200 px-3.5 py-1.5 text-[11px] font-semibold text-orange-600 uppercase tracking-widest"
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
                <Image src="/branding/Copy of codezilla with fox black.png" alt="Codezilla" fill sizes="40px" className="object-contain" />
              </div>
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-[0.2em]">Official club portal</span>
            </div>
            <h1 className="font-passion text-5xl md:text-6xl lg:text-7xl text-zinc-900 leading-[1.05]">
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
            className="text-sm md:text-base text-zinc-500 leading-relaxed max-w-lg mx-auto lg:mx-0"
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
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 px-7 py-3 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-all duration-200 shadow-sm"
            >
              <LogIn size={14} /> Member login
            </Link>
          </motion.div>

          {/* Trust chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={tx(0.32)}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1.5 text-[11px] text-zinc-400"
          >
            <span>✅ Digital Codezilla ID</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
            <span>✅ Fast check-in at events</span>
            <span className="h-1 w-1 rounded-full bg-zinc-300" />
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
          <div className="relative rounded-2xl border border-zinc-200 bg-white p-5 space-y-4 shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-orange-500/70 mb-0.5">Live on campus</p>
                <p className="text-sm font-semibold text-zinc-800">Codezilla community snapshot</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[10px] text-zinc-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                open source first
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-zinc-100">
              <Image src="/photo.jpg" alt="Codezilla club" width={640} height={380} className="w-full h-48 md:h-52 object-cover" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Members",   value: "40+", sub: "active core" },
                { label: "Community", value: "3K+", sub: "audience" },
                { label: "Events",    value: "20+", sub: "workshops" },
              ].map(({ label, value, sub }) => (
                <div key={label} className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-center">
                  <p className="text-[9px] uppercase tracking-widest text-orange-500/60 mb-0.5">{label}</p>
                  <p className="text-lg font-passion text-zinc-800">{value}</p>
                  <p className="text-[9px] text-zinc-400 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 flex items-start gap-3">
              <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-black text-white">CZ</div>
              <div>
                <p className="text-[11px] font-medium text-zinc-700 mb-1">
                  &ldquo;This portal is how we recognise you as Codezilla.&rdquo;
                </p>
                <p className="text-[10px] text-zinc-400 leading-relaxed">
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
