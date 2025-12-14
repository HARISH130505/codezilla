"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

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

// Random durations for each column (15-25 seconds)
const getRandomDuration = (index: number) => {
  return 15 + Math.floor(Math.random() * 10) + index;
};

// Random delay for each column (0-3 seconds)
const getRandomDelay = (index: number) => {
  return Math.random() * 3;
};

export default function Page() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }

  const members = [
    {
      name: "Saravana Sabaree",
      role: "Lead",
      img: "/Lead.jpg",
      align: "left",
    },
    {
      name: "Manan Toshniwal",
      role: "Co-Lead",
      img: "/Co-Lead.jpg",
      align: "right",
    },
    {
      name: "Harish",
      role: "Technical Lead",
      img: "/Technical_lead.jpg",
      align: "left",
    },
    {
      name: "Varsha",
      role: "Design Lead",
      img: "/Design_lead.webp",
      align: "right",
    },
    {
      name: "Sneha Das",
      role: "Management Lead",
      img: "/Management_lead.jpg",
      align: "left",
    },
    {
      name: "Tanu Priya",
      role: "Content Lead",
      img: "/Content_lead.jpg",
      align: "right",
    },
    {
      name: "Madhumitha Das",
      role: "PR Lead",
      img: "/PR_lead.jpg",
      align: "left",
    },
  ];

  // 3 code columns with different starting positions
  const codeColumns = [
    { startPos: -300, delay: 0 },      // Top
    { startPos: 200, delay: 1.5 },     // Middle
    { startPos: 700, delay: 3 },       // Bottom
  ];

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-black py-12 px-4 md:px-8 lg:px-16 text-center"
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

      {/* 3 code columns flowing top to bottom with different start positions - SAME FLOW */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute inset-x-0 grid grid-cols-3 md:grid-cols-3 gap-32 md:gap-56 text-xs md:text-sm font-mono select-none w-full">
          {codeColumns.map((config, colIndex) => {
            const randomDuration = getRandomDuration(colIndex);

            return (
              <motion.div
                key={colIndex}
                className="flex flex-col gap-4 whitespace-pre leading-relaxed"
                initial={{ y: config.startPos }}
                animate={{ y: window.innerHeight + 300 }}
                transition={{
                  duration: randomDuration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: config.delay,
                }}
              >
                {/* Loop code snippets 3 times for infinite effect */}
                {Array.from({ length: 3 }).map((_, setIdx) => {
                  const snippet =
                    codeSnippets[(colIndex + setIdx * 2) % codeSnippets.length];
                  const lines = snippet.split("\n");

                  return (
                    <div key={setIdx} className="mb-12">
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
                    </div>
                  );
                })}
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
        <motion.h1
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white text-4xl md:text-5xl font-passion mb-16 tracking-wide drop-shadow-[0_0_14px_rgba(251,146,60,0.7)] cursor-pointer"
        >
          CLUB MEMBERS
        </motion.h1>

        <div className="flex flex-col gap-20">
          {members.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                x: member.align === "left" ? -50 : 50,
                scale: 0.95,
              }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.1 + idx * 0.08,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.05,
                x: member.align === "left" ? 10 : -10,
              }}
              onHoverStart={() => setHoveredMember(idx)}
              onHoverEnd={() => setHoveredMember(null)}
              className={`flex flex-col items-center gap-12 cursor-pointer ${
                member.align === "left"
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              <motion.div
                whileHover={{
                  boxShadow: "0 0 40px rgba(251,146,60,0.8)",
                  y: -8,
                  scale: 1.08,
                }}
                className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden flex-shrink-0"
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                whileHover={{
                  boxShadow: "0 0 40px rgba(251,146,60,0.8)",
                  y: -8,
                  scale: 1.08,
                }}
                animate={{
                  background:
                    hoveredMember === idx
                      ? "linear-gradient(to right, #ff6b35, #FF8C42)"
                      : "linear-gradient(to right, #DE5D26, #FF8C42)",
                }}
                className="bg-gradient-to-r from-[#DE5D26] to-[#FF8C42] text-black rounded-3xl px-6 py-4 md:px-10 md:py-6 w-full md:w-[650px] text-xl md:text-2xl font-medium transition-all duration-300"
              >
                <motion.div
                  animate={{
                    color:
                      hoveredMember === idx ? "#ffffff" : "#000000",
                    scale: hoveredMember === idx ? 1.1 : 1,
                  }}
                  className="font-bold"
                >
                  {member.name}
                </motion.div>
                <motion.span
                  animate={{
                    color:
                      hoveredMember === idx ? "#ffffff" : "#000000",
                    scale: hoveredMember === idx ? 1.05 : 1,
                  }}
                  className="block text-sm md:text-base font-normal mt-2"
                >
                  {member.role}
                </motion.span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
