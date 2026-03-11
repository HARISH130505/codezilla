"use client";

import React from "react";
import { motion, type Transition } from "framer-motion";
import { Zap, Users, Wrench, Heart } from "lucide-react";

const tx = (delay = 0): Transition => ({
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
  delay,
});

const PILLARS = [
  {
    icon: Zap,
    title: "Collaborative Projects",
    desc: "Ship real things together — from OSS contributions to campus tooling. Pair up, scope it, build it, demo it.",
  },
  {
    icon: Users,
    title: "Skill Sharing",
    desc: "Workshops, lightning talks, and peer reviews. Every member teaches something. Every member learns something.",
  },
  {
    icon: Wrench,
    title: "Tools & Resources",
    desc: "Access to labs, licenses, credits, and mentors so the only thing between your idea and reality is execution.",
  },
  {
    icon: Heart,
    title: "Community First",
    desc: "A tight-knit crew that shows up — to hackathons, late-night jams, and launches. We build better together.",
  },
];

const STATS = [
  { value: "80+",  label: "Active Members" },
  { value: "20+",  label: "Events Hosted" },
  { value: "10+",  label: "Projects Shipped" },
  { value: "2020", label: "Founded" },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: tx(delay),
});

export default function AboutPage() {
  return (
    <div className="bg-[#fafaf9] min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.035) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-64 bg-orange-400/10 blur-3xl rounded-full" />

        <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
          <motion.div {...fade(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/60 bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-600 uppercase tracking-widest mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              Mozilla Campus Club · SRMIST Ramapuram
            </span>
          </motion.div>

          <motion.h1 {...fade(0.08)} className="font-passion text-5xl md:text-7xl text-zinc-900 leading-[1.05] mb-6">
            We build.{" "}
            <span className="text-orange-500">Together.</span>
          </motion.h1>

          <motion.p {...fade(0.16)} className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            Codezilla is SRMIST Ramapuram&apos;s official Mozilla Campus Club — a hands-on community
            of students who ship real projects, run open-source workshops, and grow into engineers
            the industry actually wants.
          </motion.p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-zinc-200/70 bg-white">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }, i) => (
            <motion.div key={label} {...fade(i * 0.06)}>
              <p className="font-passion text-4xl text-orange-500 mb-1">{value}</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-5 md:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <motion.div {...fade(0)} className="space-y-5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-500">Our mission</span>
          <h2 className="font-passion text-4xl md:text-5xl text-zinc-900 leading-tight">
            Open tech,<br />open doors.
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            We believe every student should have the opportunity to build real things — not just
            read about them. That&apos;s why Codezilla runs events, publishes resources, and keeps
            its community permanently free to join.
          </p>
          <p className="text-sm text-zinc-500 leading-relaxed">
            As a Mozilla Campus Club we&apos;re anchored to the principle that the internet should
            remain open, safe, and accessible to everyone. Our projects and workshops reflect that
            ethos in every line of code.
          </p>
        </motion.div>

        <motion.div {...fade(0.1)} className="rounded-2xl overflow-hidden border border-zinc-200/80 bg-zinc-50 p-6 space-y-4">
          {[
            { label: "Open source by default", pct: 100 },
            { label: "Student-led initiatives", pct: 92 },
            { label: "Hands-on workshops", pct: 85 },
            { label: "Industry mentors", pct: 70 },
          ].map(({ label, pct }) => (
            <div key={label}>
              <div className="flex justify-between mb-1.5 text-xs text-zinc-500">
                <span>{label}</span>
                <span className="text-orange-500 font-semibold">{pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-200 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-orange-400 to-amber-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Why join — dark section */}
      <section className="bg-zinc-950 py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <motion.div {...fade(0)} className="text-center mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-orange-400">Why Codezilla</span>
            <h2 className="font-passion text-4xl md:text-5xl text-white mt-2">
              Four things we stand for
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {PILLARS.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...fade(i * 0.08)}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.07] hover:border-orange-400/30 p-6 transition-all duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                  <Icon size={18} className="text-orange-400" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 text-center">
        <div className="max-w-xl mx-auto px-5 md:px-8 space-y-6">
          <motion.h2 {...fade(0)} className="font-passion text-4xl md:text-5xl text-zinc-900">
            Ready to build?
          </motion.h2>
          <motion.p {...fade(0.08)} className="text-sm text-zinc-500">
            Membership is free and open to all SRMIST students. Sign up, build your profile, and
            show up to the next event.
          </motion.p>
          <motion.div {...fade(0.16)} className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(249,115,22,0.35)] transition-all duration-200 active:scale-95"
            >
              Join the club
            </a>
            <a
              href="/events"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white hover:border-orange-300 px-7 py-3 text-sm font-medium text-zinc-700 transition-all duration-200"
            >
              See upcoming events
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
