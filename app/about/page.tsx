"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const cards = [
  {
    title: "Collaborative Projects",
    desc: "Work on exciting projects with others who share your passion for building. From small DIY tasks to large-scale creations, there's always something to get your hands on!",
  },
  {
    title: "Skill Sharing",
    desc: "Learn new techniques and share your knowledge with fellow builders. Whether you're a beginner or an expert, everyone has something valuable to contribute.",
  },
  {
    title: "Tools & Resources",
    desc: "Gain access to tools, materials, and resources that can help bring your ideas to life.",
  },
  {
    title: "Community Support",
    desc: "Be part of a community that supports and inspires each other. Together, we turn ideas into reality!",
  },
];

export default function AboutPage() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#fff4e6] via-[#fff7ed] to-[#fffbeb]"
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

      {/* Soft overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      {/* MAIN CONTENT */}
      <div className="relative z-10 container mx-auto px-4 py-12 lg:px-16">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{
            scale: 1.04,
            textShadow: "0 0 18px rgba(249,115,22,0.7)",
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 cursor-pointer"
        >
          <h2 className="text-4xl sm:text-5xl font-bold p-2 font-passion text-slate-900">
            About Our Club
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            whileHover={{ x: 8, scale: 1.02 }}
            className="lg:w-1/2 space-y-6 text-center lg:text-left cursor-pointer"
          >
            <motion.h3
              initial={{ textShadow: "0 0 0px #fb923c" }}
              animate={{
                textShadow: [
                  "0 0 0px #fb923c",
                  "0 0 14px #fed7aa",
                  "0 0 4px #fed7aa",
                ],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              whileHover={{
                scale: 1.06,
                textShadow: "0 0 18px #fb923c",
              }}
              className="text-3xl sm:text-4xl font-bold text-orange-500 transition-all"
            >
              Join Our Building Together Club!
            </motion.h3>
            <motion.p
              whileHover={{ scale: 1.03, x: 5 }}
              className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0 transition-all"
            >
              Do you love creating, designing, and building? Whether you're into
              woodworking, DIY projects, coding, or crafting, our club is the perfect
              place for makers and innovators like you!
            </motion.p>
          </motion.div>

          {/* Right cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="lg:w-1/2 w-full"
          >
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{
                scale: 1.04,
                textShadow: "0 0 18px rgba(249,115,22,0.7)",
              }}
              className="col-span-1 md:col-span-2 text-center text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 rounded-lg p-2 font-['Poppins'] mb-6 cursor-pointer transition-all"
            >
              Why Join Us?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25 + idx * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(249,115,22,0.45)",
                    borderColor: "#fed7aa",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onHoverStart={() => setHoveredCard(idx)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="bg-white/95 p-6 rounded-3xl shadow-sm border border-orange-100 transition-all duration-300 cursor-pointer"
                >
                  <motion.h4
                    animate={{
                      color: hoveredCard === idx ? "#f97316" : "#ea580c",
                      scale: hoveredCard === idx ? 1.06 : 1,
                      textShadow:
                        hoveredCard === idx
                          ? "0 0 12px rgba(249,115,22,0.7)"
                          : "0 0 0px rgba(0,0,0,0)",
                    }}
                    className="font-bold mb-3 text-xl sm:text-2xl"
                  >
                    {card.title}
                  </motion.h4>
                  <motion.p
                    animate={{
                      color: hoveredCard === idx ? "#111827" : "#4b5563",
                    }}
                    className="text-sm sm:text-base"
                  >
                    {card.desc}
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
