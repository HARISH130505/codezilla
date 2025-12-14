"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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

// Random durations for each column (12-24 seconds)
const getRandomDuration = (index: number) => {
  return 12 + Math.floor(Math.random() * 12) + index;
};

// Random delay for each column (0-3 seconds)
const getRandomDelay = (index: number) => {
  return Math.random() * 3;
};

const Page = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden bg-black"
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

      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 40px rgba(251,146,60,0.8)",
        }}
        className="relative bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-950/95 border border-orange-500/60 shadow-[0_0_35px_rgba(251,146,60,0.35)] rounded-2xl p-6 sm:p-8 lg:p-12 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 overflow-hidden transition-all duration-300 cursor-pointer"
      >
        <div className="pointer-events-none absolute inset-0 border border-orange-400/20 rounded-2xl blur-sm" />

        {/* Left text column */}
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          whileHover={{ x: 10, scale: 1.03 }}
          className="flex-1 text-center lg:text-left space-y-4 cursor-pointer"
        >
          <motion.h1
            initial={{ textShadow: "0 0 0px #fb923c" }}
            animate={{
              textShadow: [
                "0 0 0px #fb923c",
                "0 0 12px #fb923c",
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
            className="text-white text-3xl sm:text-4xl lg:text-5xl font-passion tracking-wide transition-all"
          >
            CODEZILLA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            whileHover={{
              scale: 1.05,
              color: "#FF6B35",
            }}
            className="text-orange-400 text-lg sm:text-xl font-semibold transition-all"
          >
            Reintroducing Codezilla
          </motion.p>

          <motion.p
            whileHover={{ scale: 1.03, x: 5 }}
            className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-prose mx-auto lg:mx-0 transition-all"
          >
            Codezilla is a Mozilla Campus Community in SRMIST, Ramapuram, designed
            to provide the youth, in and around the campus, an open-source platform
            where they can develop their technical knowledge and skill set for a
            better career. We organize technical events and hands-on sessions to
            scale up their expertise. It provides a good environment to engage
            students in different activities and develop their projects.
          </motion.p>
        </motion.div>

        {/* Right image column */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 40px rgba(251,146,60,0.8)",
          }}
          className="flex-shrink-0 w-full lg:w-1/2 flex justify-center cursor-pointer transition-all duration-300"
        >
          <motion.div
            whileHover={{
              rotateY: 5,
            }}
            className="relative rounded-2xl p-[3px] bg-gradient-to-tr from-orange-500 via-amber-400 to-orange-600 shadow-[0_0_30px_rgba(251,146,60,0.6)] transition-all"
          >
            <Image
              src="/photo.jpg"
              alt="Codezilla club members"
              height={400}
              width={600}
              className="rounded-2xl object-cover w-full h-auto max-w-md lg:max-w-none"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
