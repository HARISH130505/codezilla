"use client";

import React from "react";
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
  return (
    <main className="bg-gray-950 min-h-screen py-12 px-4 sm:px-8 lg:px-16">
      {/* Heading and subtitle */}
      <header className="max-w-6xl mx-auto mb-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center text-white text-4xl sm:text-5xl font-bold p-2 font-passion drop-shadow-[0_0_14px_rgba(251,146,60,0.7)]"
        >
          Codezilla Events
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-3 text-lg text-center text-gray-200"
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2 + index * 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
              boxShadow: "0 0 30px rgba(251,146,60,0.55)",
            }}
            className="bg-white/95 border border-orange-200/80 rounded-xl overflow-hidden shadow-sm transition-all duration-300"
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
                <h2
                  className="text-xl font-semibold mb-1"
                  style={{
                    color: "#080808",
                    fontFamily: "Cy Grotesk Grand, sans-serif",
                  }}
                >
                  {event.title}
                </h2>
                <p
                  className="text-sm mb-2"
                  style={{
                    color: "#020202",
                    fontFamily: "TT Hoves, sans-serif",
                  }}
                >
                  {event.date} • {event.location}
                </p>
                <p className="text-gray-700 text-sm">
                  {event.description}
                </p>
              </div>
              <a
                href={event.cta.href}
                className="mt-4 inline-block text-center px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: "#DE5D26",
                  color: "white",
                  fontFamily: "TT Hoves, sans-serif",
                }}
              >
                {event.cta.label}
              </a>
            </div>
          </motion.article>
        ))}
      </section>
    </main>
  );
}
