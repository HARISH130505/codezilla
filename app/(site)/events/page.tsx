"use client";

import React from "react";
import Image from "next/image";
import { motion, type Transition } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";

const tx = (delay = 0): Transition => ({
  duration: 0.55,
  ease: [0.25, 0.46, 0.45, 0.94],
  delay,
});

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: tx(delay),
});

const EVENTS = [
  {
    title: "Mozilla Open Source Day",
    date: "March 15, 2025",
    location: "SRM Tech Park, Block V",
    attendees: "120+",
    status: "upcoming",
    tag: "Workshop",
    img: "/logo.jpg",
    desc: "A full-day open-source workshop where contributors from across campus come together to ship PRs, fix bugs, and learn the open web.",
  },
  {
    title: "Hack Night 4.0",
    date: "April 5, 2025",
    location: "CSE Department, Lab 3",
    attendees: "80+",
    status: "upcoming",
    tag: "Hackathon",
    img: "/logo.jpg",
    desc: "12-hour overnight hackathon. Form a team, pick a problem, ship a prototype. Food, caffeine, and mentors provided.",
  },
  {
    title: "Web Dev Bootcamp",
    date: "February 10, 2025",
    location: "Seminar Hall, Block IV",
    attendees: "200+",
    status: "past",
    tag: "Bootcamp",
    img: "/logo.jpg",
    desc: "Three-session deep dive into modern web development — HTML/CSS/JS fundamentals to React and beyond.",
  },
];

const TAG_COLORS: Record<string, string> = {
  Workshop:  "bg-blue-50 text-blue-600 border-blue-200",
  Hackathon: "bg-purple-50 text-purple-600 border-purple-200",
  Bootcamp:  "bg-teal-50 text-teal-600 border-teal-200",
};

export default function EventsPage() {
  const upcoming = EVENTS.filter((e) => e.status === "upcoming");
  const past     = EVENTS.filter((e) => e.status === "past");

  return (
    <div className="bg-[#fafaf9] min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-56 bg-orange-400/10 blur-3xl rounded-full" />
        <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
          <motion.div {...fade(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/60 bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-600 uppercase tracking-widest mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              What&apos;s on
            </span>
          </motion.div>
          <motion.h1 {...fade(0.07)} className="font-passion text-5xl md:text-7xl text-zinc-900 leading-[1.05] mb-5">
            Events &amp; <span className="text-orange-500">workshops.</span>
          </motion.h1>
          <motion.p {...fade(0.14)} className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto">
            From overnight hackathons to expert-led workshops — if it involves learning and
            building, you&apos;ll find it here.
          </motion.p>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 pb-10">
        <motion.div {...fade(0)} className="flex items-center gap-3 mb-8">
          <h2 className="font-passion text-2xl text-zinc-900">Upcoming</h2>
          <span className="rounded-full bg-orange-100 text-orange-600 text-[11px] font-semibold px-2.5 py-0.5 border border-orange-200">
            {upcoming.length} events
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {upcoming.map((ev, i) => (
            <motion.article
              key={ev.title}
              {...fade(i * 0.08)}
              className="group rounded-2xl overflow-hidden border border-zinc-200/70 bg-white hover:border-orange-200 hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-44 bg-zinc-100 overflow-hidden">
                <Image src={ev.img} alt={ev.title} fill sizes="50vw" className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${TAG_COLORS[ev.tag]}`}>
                    {ev.tag}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold px-2.5 py-0.5 uppercase tracking-wide">
                    Upcoming
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-semibold text-zinc-900 text-sm leading-snug">{ev.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{ev.desc}</p>
                <div className="flex flex-wrap gap-3 text-[11px] text-zinc-400 pt-1">
                  <span className="flex items-center gap-1"><Calendar size={11} />{ev.date}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} />{ev.location}</span>
                  <span className="flex items-center gap-1"><Users size={11} />{ev.attendees} attendees</span>
                </div>
                <button className="mt-2 w-full rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-2.5 transition-colors duration-200">
                  Register now
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Past events */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 pb-24 md:pb-32 mt-12">
        <motion.div {...fade(0)} className="flex items-center gap-3 mb-8">
          <h2 className="font-passion text-2xl text-zinc-900">Past events</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {past.map((ev, i) => (
            <motion.article
              key={ev.title}
              {...fade(i * 0.08)}
              className="rounded-2xl overflow-hidden border border-zinc-200/50 bg-white/70 opacity-80 hover:opacity-100 transition-opacity duration-200"
            >
              <div className="relative h-36 bg-zinc-100 overflow-hidden">
                <Image src={ev.img} alt={ev.title} fill sizes="33vw" className="object-contain p-4" />
                <div className="absolute top-3 left-3">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${TAG_COLORS[ev.tag]}`}>
                    {ev.tag}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-zinc-700 text-sm">{ev.title}</h3>
                <div className="flex flex-wrap gap-2 text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1"><Calendar size={11} />{ev.date}</span>
                  <span className="flex items-center gap-1"><Users size={11} />{ev.attendees}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
