"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  cta: { label: string; href: string };
};

const EVENTS: Event[] = [
  {
    id: "1",
    title: "Event 1",
    date: "Date",
    location: "SRMIST Ramapuram",
    description: "Event Description",
    image: "/placeholder.png",
    cta: { label: "Register Now", href: "#" },
  },
  {
    id: "2",
    title: "Event 2",
    date: "Date",
    location: "Online",
    description: "Event Description",
    image: "/placeholder.png",
    cta: { label: "Join Now", href: "#" },
  },
  {
    id: "3",
    title: "Event 3",
    date: "Date",
    location: "TRP Auditorium Hall",
    description: "Event Description",
    image: "/placeholder.png",
    cta: { label: "Reserve Seat", href: "#" },
  },
];

const codeSnippets = [
  `</>  Building Tech Leaders
function innovate() {
  return creativity + collab;
}`,
  `// Open Source
class Developer {
  buildProject() {
    return awesome();
  }
}`,
  `// Community
const vision = {
  learn: true,
  grow: true
};`,
  `// SRM IST
function joinClub() {
  gainSkills();
  buildNetwork();
}`,
  `</>  Codezilla
const mission = 
  "empower youth";`,
  `// Tech Initiative
var impact = "industry";
var ready = true;`,
];

const getRandomDuration = (index: number) => {
  return 12 + Math.floor(Math.random() * 12) + index;
};

const getRandomDelay = (index: number) => {
  return Math.random() * 3;
};

export default function EventsPage() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-black py-12 px-4 sm:px-8 lg:px-16"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive glow following mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(251,146,60,0.2), rgba(15,23,42,1))`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Code columns with VISIBLE COLORS */}
      <div className="pointer-events-none absolute inset-0 opacity-40 text-xs md:text-sm font-mono select-none">
        <div className="absolute inset-x-8 inset-y-20 grid grid-cols-3 md:grid-cols-6 gap-12 md:gap-20">
          {Array.from({ length: 6 }).map((_, colIndex) => {
            const snippet = codeSnippets[colIndex % codeSnippets.length];
            const lines = snippet.split("\n");
            const randomDuration = getRandomDuration(colIndex);
            const randomDelay = getRandomDelay(colIndex);

            return (
              <motion.div
                key={colIndex}
                className="flex flex-col gap-1 whitespace-pre leading-relaxed"
                initial={{ y: -100 }}
                animate={{ y: [100, -100] }}
                transition={{
                  duration: randomDuration,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                  delay: randomDelay,
                }}
              >
                {lines.map((line, i) => (
                  <span
                    key={i}
                    className={
                      line.trim().startsWith("//")
                        ? "text-[#00FF9F]"
                        : "text-[#FF6B35]"
                    }
                  >
                    {line}
                  </span>
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Dark overlay - LIGHTER */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Floating neon orbs - MORE VISIBLE */}
      <motion.div
        initial={{ opacity: 0.25, x: -260, y: -160 }}
        animate={{ x: 40, y: -40 }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full bg-orange-500/30 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0.2, x: 260, y: 200 }}
        animate={{ x: 20, y: 40 }}
        transition={{
          duration: 28,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-400/25 blur-3xl"
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10">
        {/* Heading and subtitle */}
        <header className="max-w-6xl mx-auto mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center text-white text-4xl sm:text-5xl font-bold p-2 font-passion drop-shadow-[0_0_14px_rgba(251,146,60,0.7)] cursor-pointer"
          >
            Codezilla Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            whileHover={{ scale: 1.03 }}
            className="mt-3 text-lg text-center text-gray-200 cursor-pointer"
            style={{ fontFamily: "TT Hoves, sans-serif" }}
          >
            Stay up-to-date with upcoming workshops, hackathons, and tech talks.
          </motion.p>
        </header>

        {/* Events grid */}
        <section className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {EVENTS.map((event, index) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.2 + index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{
                y: -12,
                scale: 1.08,
                boxShadow: "0 0 40px rgba(251,146,60,0.8)",
              }}
              onHoverStart={() => setHoveredEvent(event.id)}
              onHoverEnd={() => setHoveredEvent(null)}
              className="bg-white/95 border border-orange-200/80 rounded-xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={800}
                height={192}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between">
                <div>
                  <motion.h2
                    animate={{
                      color:
                        hoveredEvent === event.id ? "#ff4500" : "#080808",
                      scale: hoveredEvent === event.id ? 1.05 : 1,
                    }}
                    className="text-xl font-semibold mb-1"
                    style={{
                      fontFamily: "Cy Grotesk Grand, sans-serif",
                    }}
                  >
                    {event.title}
                  </motion.h2>
                  <motion.p
                    animate={{
                      color:
                        hoveredEvent === event.id ? "#ff6b35" : "#020202",
                    }}
                    className="text-sm mb-2"
                    style={{
                      fontFamily: "TT Hoves, sans-serif",
                    }}
                  >
                    {event.date} • {event.location}
                  </motion.p>
                  <motion.p
                    animate={{
                      color:
                        hoveredEvent === event.id ? "#374151" : "#4b5563",
                    }}
                    className="text-gray-700 text-sm"
                  >
                    {event.description}
                  </motion.p>
                </div>
                <motion.a
                  href={event.cta.href}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 inline-block text-center px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor: hoveredEvent === event.id ? "#ff6b35" : "#DE5D26",
                    color: "white",
                    fontFamily: "TT Hoves, sans-serif",
                    transition: "all 0.3s ease",
                  }}
                >
                  {event.cta.label}
                </motion.a>
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    </main>
  );
}
