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
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fff4e6] via-[#fff7ed] to-[#fffbeb] py-12 px-4 sm:px-8 lg:px-16"
      onMouseMove={handleMouseMove}
    >
      {/* Soft interactive orange glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(251,146,60,0.22), rgba(255,250,235,1))`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Brand orange blobs */}
      <motion.div
        initial={{ opacity: 0.55, x: -220, y: -180 }}
        animate={{ x: 15, y: -25, opacity: [0.5, 0.85, 0.6] }}
        transition={{
          duration: 24,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -top-32 -left-28 w-80 h-80 rounded-full bg-orange-300/45 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0.5, x: 260, y: 200 }}
        animate={{ x: -10, y: 35, opacity: [0.45, 0.8, 0.55] }}
        transition={{
          duration: 28,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-300/40 blur-3xl"
      />

      {/* Light overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      {/* MAIN CONTENT */}
      <div className="relative z-10">
        {/* Heading and subtitle */}
        <header className="max-w-6xl mx-auto mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
              scale: 1.04,
              textShadow: "0 0 18px rgba(249,115,22,0.7)",
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center text-slate-900 text-4xl sm:text-5xl font-bold p-2 font-passion cursor-pointer"
          >
            Codezilla Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="mt-3 text-lg text-center text-gray-700 cursor-pointer"
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
                y: -10,
                scale: 1.05,
                boxShadow: "0 0 40px rgba(249,115,22,0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              onHoverStart={() => setHoveredEvent(event.id)}
              onHoverEnd={() => setHoveredEvent(null)}
              className="bg-white/95 border border-orange-100 rounded-xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer"
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
                        hoveredEvent === event.id ? "#f97316" : "#111827",
                      scale: hoveredEvent === event.id ? 1.05 : 1,
                      textShadow:
                        hoveredEvent === event.id
                          ? "0 0 12px rgba(249,115,22,0.7)"
                          : "0 0 0px rgba(0,0,0,0)",
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
                        hoveredEvent === event.id ? "#fb923c" : "#4b5563",
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
                        hoveredEvent === event.id ? "#111827" : "#6b7280",
                    }}
                    className="text-gray-700 text-sm"
                  >
                    {event.description}
                  </motion.p>
                </div>
                <motion.a
                  href={event.cta.href}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 0 30px rgba(249,115,22,0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 inline-block text-center px-4 py-2 rounded-lg"
                  style={{
                    backgroundColor:
                      hoveredEvent === event.id ? "#f97316" : "#DE5D26",
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
