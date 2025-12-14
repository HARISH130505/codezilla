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
      className="min-h-screen relative overflow-hidden bg-black"
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
      <div className="relative z-10 container mx-auto px-4 py-12 lg:px-16">
        {/* Top heading - INTERACTIVE POP-OUT */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 cursor-pointer"
        >
          <h2 className="text-4xl sm:text-5xl font-bold p-2 font-passion text-white drop-shadow-[0_0_12px_rgba(251,146,60,0.6)]">
            About Our Club
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
          {/* Left text block - INTERACTIVE POP-OUT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            whileHover={{ x: 10, scale: 1.02 }}
            className="lg:w-1/2 space-y-6 text-center lg:text-left cursor-pointer"
          >
            <motion.h3
              initial={{ textShadow: "0 0 0px #fb923c" }}
              animate={{
                textShadow: [
                  "0 0 0px #fb923c",
                  "0 0 14px #fb923c",
                  "0 0 6px #fb923c",
                ],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              whileHover={{
                scale: 1.08,
                textShadow: "0 0 20px #fb923c",
              }}
              className="text-3xl sm:text-4xl font-bold text-orange-400 transition-all"
            >
              Join Our Building Together Club!
            </motion.h3>
            <motion.p
              whileHover={{ scale: 1.03, x: 5 }}
              className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-xl mx-auto lg:mx-0 transition-all"
            >
              Do you love creating, designing, and building? Whether you're into
              woodworking, DIY projects, coding, or crafting, our club is the perfect
              place for makers and innovators like you!
            </motion.p>
          </motion.div>

          {/* Right cards grid */}
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
              whileHover={{ scale: 1.05 }}
              className="col-span-1 md:col-span-2 text-center text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 rounded-lg p-2 font-['Poppins'] mb-6 cursor-pointer transition-all"
            >
              Why Join Us?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25 + idx * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -12,
                    scale: 1.08,
                    boxShadow: "0 0 40px rgba(251,146,60,0.8)",
                  }}
                  onHoverStart={() => setHoveredCard(idx)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="bg-orange-200/90 p-6 rounded-3xl shadow-lg border border-orange-300/80 transition-all duration-300 cursor-pointer"
                >
                  <motion.h4
                    animate={{
                      color:
                        hoveredCard === idx ? "#ff4500" : "#ff7517",
                      scale: hoveredCard === idx ? 1.1 : 1,
                    }}
                    className="font-bold mb-3 text-xl sm:text-2xl"
                  >
                    {card.title}
                  </motion.h4>
                  <motion.p
                    animate={{
                      color:
                        hoveredCard === idx ? "#1a1a1a" : "#1f2937",
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
