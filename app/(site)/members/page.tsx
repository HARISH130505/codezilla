"use client";

import React from "react";
import Image from "next/image";
import { motion, type Transition } from "framer-motion";

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

const MEMBERS = [
  {
    name: "Saravana Sabaree",
    role: "Club Lead",
    img: "/Lead.jpg",
    bio: "Sets the vision, drives the community forward.",
  },
  {
    name: "Manan Toshniwal",
    role: "Co-Lead",
    img: "/Co-Lead.jpg",
    bio: "Keeps operations smooth and members energised.",
  },
  {
    name: "Harish",
    role: "Technical Lead",
    img: "/Technical_lead.jpg",
    bio: "Architects the tech stack behind every project.",
  },
  {
    name: "Varsha",
    role: "Design Lead",
    img: "/Design_lead.webp",
    bio: "Crafts the visual identity of Codezilla.",
  },
  {
    name: "Arjun",
    role: "Management & PR Lead",
    img: "/Management_lead.jpeg",
    bio: "Expands reach, builds partnerships, and manages events and logistics.",
  },
  {
    name: "Tanu Priya",
    role: "Content Lead",
    img: "/Content_lead.jpg",
    bio: "Shapes the stories we tell, inside and outside campus.",
  }
];

export default function MembersPage() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 dark:opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-56 bg-orange-400/10 blur-3xl rounded-full" />
        <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
          <motion.div {...fade(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/60 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 text-[11px] font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              The team
            </span>
          </motion.div>
          <motion.h1 {...fade(0.07)} className="font-passion text-5xl md:text-7xl text-zinc-900 dark:text-zinc-100 leading-[1.05] mb-5">
            Meet the <span className="text-orange-500">leads.</span>
          </motion.h1>
          <motion.p {...fade(0.14)} className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
            Seven driven students who keep Codezilla running — from the big ideas all the way down
            to making sure the room is booked.
          </motion.p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pb-24 md:pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {MEMBERS.map(({ name, role, img, bio }, i) => (
            <motion.div
              key={name}
              {...fade(i * 0.06)}
              className="group relative rounded-2xl overflow-hidden border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md hover:border-orange-200 dark:hover:border-orange-500/40 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="relative h-56 w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <Image
                  src={img}
                  alt={name}
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="p-4 space-y-1">
                <span className="inline-block rounded-full bg-orange-50 dark:bg-orange-500/10 border border-orange-200/80 dark:border-orange-500/30 px-2.5 py-0.5 text-[10px] font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                  {role}
                </span>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mt-2">{name}</h3>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">{bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-950 py-20 text-center">
        <div className="max-w-lg mx-auto px-5 space-y-5">
          <motion.h2 {...fade(0)} className="font-passion text-4xl text-white">
            Want to join the team?
          </motion.h2>
          <motion.p {...fade(0.08)} className="text-sm text-zinc-400">
            We accept new members every semester. Create your profile and stay tuned for the next
            open application window.
          </motion.p>
          <motion.div {...fade(0.14)}>
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-600 px-7 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(249,115,22,0.35)] transition-all duration-200 active:scale-95"
            >
              Create your profile
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
