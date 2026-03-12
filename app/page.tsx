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
  const [mode, setMode] = useState<"member" | "participant">("member");
  const [menuOpen, setMenuOpen] = useState(false);
  const isMember = mode === "member";

  return (
    <div className="relative min-h-screen bg-zinc-950 overflow-hidden flex flex-col">

      {/* ── Navbar ─────────────────────────────── */}
      <nav className="relative z-20 w-full">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-10 h-14 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-orange-400/30 group-hover:border-orange-400/60 transition-colors duration-200">
              <Image src="/branding/codezilla with fox 2.png" alt="Codezilla" fill sizes="32px" className="object-contain" priority />
            </div>
            <span className="font-passion text-lg text-white tracking-wide group-hover:text-orange-300 transition-colors duration-200">
              CODEZILLA
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 rounded-md text-sm font-medium text-white/55 hover:text-white/90 transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Member login CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/[0.12] bg-white/[0.05] text-white/70 text-xs font-medium hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-150"
            >
              <LogIn size={12} />
              Member login
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
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
              className="md:hidden absolute top-14 inset-x-0 bg-zinc-950/95 backdrop-blur-xl border-b border-white/[0.06] px-5 py-4 space-y-1"
            >
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/[0.06] mt-2">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.05] text-white/80 text-sm font-medium"
                >
                  <LogIn size={14} /> Member login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Static background ──────────────────── */}
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Top-center glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-72 bg-orange-500/20 blur-[120px] rounded-full" />
      {/* Bottom-right accent */}
      <div className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 bg-amber-400/10 blur-[100px] rounded-full" />
      {/* Bottom-left accent */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 bg-orange-600/08 blur-[80px] rounded-full" />

      {/* ── Content ────────────────────────────── */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-5 md:px-8 lg:px-10 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Left column */}
        <div className="flex-1 space-y-7 text-center lg:text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tx(0)}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.05] border border-orange-500/30 px-3.5 py-1.5 text-[11px] font-semibold text-orange-300 uppercase tracking-widest backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-300" />
            </span>
            Mozilla Campus Club · SRMIST Ramapuram
          </motion.div>

          {/* Logo + Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tx(0.08)}
            className="space-y-2"
          >
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
              <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-orange-400/40">
                <Image
                  src="/branding/codezilla with fox 2.png"
                  alt="Codezilla"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="text-[11px] font-semibold text-orange-300/70 uppercase tracking-[0.2em]">Official club portal</span>
            </div>

            <h1 className="font-passion text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05]">
              Codezilla
            </h1>
            <h1 className="font-passion text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent leading-[1.1]">
              The premiere Open source club of SRM Ramapuram.
            </h1>
          </motion.div>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tx(0.16)}
            className="text-sm md:text-base text-white/50 leading-relaxed max-w-lg mx-auto lg:mx-0"
          >
            Pick your lane. Join as an{" "}
            <span className="text-orange-300 font-medium">active member</span> — one of 40 who
            build, lead and ship — or follow along as part of our{" "}
            <span className="text-orange-300 font-medium">3,000-strong community</span> audience
            for events, workshops and releases.
          </motion.p>

          {/* Mode toggle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tx(0.22)}
            className="inline-flex rounded-full bg-white/[0.05] border border-white/[0.08] p-1 text-[12px]"
          >
            {(["member", "participant"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`px-5 py-1.5 rounded-full transition-all duration-200 font-medium capitalize ${
                  mode === m
                    ? "bg-gradient-to-r from-orange-500 to-amber-400 text-black shadow"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {m === "member" ? "Club member" : "Event participant"}
              </button>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tx(0.28)}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
          >
            {isMember ? (
              <>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_32px_rgba(249,115,22,0.45)] transition-all duration-200 active:scale-95"
                >
                  Join as member
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] px-7 py-3 text-sm font-medium text-white/80 transition-all duration-200"
                >
                  Member login
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center rounded-xl bg-amber-400 hover:bg-amber-300 px-7 py-3 text-sm font-semibold text-black shadow-[0_8px_32px_rgba(251,191,36,0.4)] transition-all duration-200 active:scale-95"
                >
                  See upcoming events
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] px-7 py-3 text-sm font-medium text-white/80 transition-all duration-200"
                >
                  Talk to the team
                </Link>
              </>
            )}
          </motion.div>

          {/* Trust chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={tx(0.36)}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-1.5 text-[11px] text-white/30"
          >
            <span>✅ Digital Codezilla ID</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>✅ Fast check-in at events</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
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
          <div className="relative rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl p-5 space-y-4 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">

            {/* Card header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-orange-300/60 mb-0.5">Live on campus</p>
                <p className="text-sm font-semibold text-white/90">Codezilla community snapshot</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                open source first
              </div>
            </div>

            {/* Photo */}
            <div className="rounded-xl overflow-hidden border border-white/[0.06]">
              <Image
                src="/photo.jpg"
                alt="Codezilla club"
                width={640}
                height={380}
                className="w-full h-48 md:h-52 object-cover"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Members",   value: "40+",  sub: "active core" },
                { label: "Community", value: "3K+",  sub: "audience" },
                { label: "Events",    value: "20+",  sub: "workshops" },
              ].map(({ label, value, sub }) => (
                <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center">
                  <p className="text-[9px] uppercase tracking-widest text-orange-300/50 mb-0.5">{label}</p>
                  <p className="text-lg font-passion text-white/90">{value}</p>
                  <p className="text-[9px] text-white/25 mt-0.5">{sub}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="rounded-xl border border-orange-400/15 bg-orange-500/[0.06] px-4 py-3 flex items-start gap-3">
              <div className="mt-0.5 h-6 w-6 flex-shrink-0 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-black text-white">CZ</div>
              <div>
                <p className="text-[11px] font-medium text-white/80 mb-1">
                  &ldquo;This portal is how we recognise you as Codezilla.&rdquo;
                </p>
                <p className="text-[10px] text-white/35 leading-relaxed">
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
