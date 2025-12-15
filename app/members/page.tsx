"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Page() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fff4e6] via-[#fff7ed] to-[#fffbeb] py-12 px-4 md:px-8 lg:px-16 text-center">
      {/* Brand orange blobs */}
      <motion.div
        className="pointer-events-none absolute -z-10 w-80 h-80 rounded-full bg-orange-300/45 blur-3xl -top-24 -left-10"
        initial={{ opacity: 0.5, x: -40, y: -40 }}
        animate={{ x: 20, y: 10, opacity: [0.45, 0.85, 0.55] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -z-10 w-96 h-96 rounded-full bg-amber-300/40 blur-3xl -bottom-32 right-0"
        initial={{ opacity: 0.45, x: 40, y: 40 }}
        animate={{ x: -10, y: -20, opacity: [0.4, 0.8, 0.5] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Soft overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      {/* MAIN CONTENT */}
      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{
            scale: 1.04,
            textShadow: "0 0 18px rgba(249,115,22,0.7)",
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-slate-900 text-4xl md:text-5xl font-passion mb-16 tracking-wide cursor-pointer"
        >
          CLUB MEMBERS
        </motion.h1>

        <div className="flex flex-col gap-16">
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
                scale: 1.03,
                x: member.align === "left" ? 8 : -8,
              }}
              onHoverStart={() => setHoveredMember(idx)}
              onHoverEnd={() => setHoveredMember(null)}
              className={`flex flex-col items-center gap-10 cursor-pointer ${
                member.align === "left"
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              }`}
            >
              {/* Avatar with neon hover */}
              <motion.div
                whileHover={{
                  boxShadow: "0 0 40px rgba(249,115,22,0.55)",
                  y: -6,
                  scale: 1.08,
                }}
                whileTap={{ scale: 0.97 }}
                className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden flex-shrink-0 bg-orange-100 transition-all duration-300"
              >
                <Image
                  src={member.img}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Info card with glow */}
              <motion.div
                whileHover={{
                  boxShadow: "0 0 50px rgba(249,115,22,0.6)",
                  y: -6,
                  scale: 1.06,
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  background:
                    hoveredMember === idx
                      ? "linear-gradient(to right, #ffedd5, #fed7aa)"
                      : "linear-gradient(to right, #fff7ed, #fffbeb)",
                  borderColor:
                    hoveredMember === idx ? "#f97316" : "rgba(251,146,60,0.35)",
                }}
                className="rounded-3xl px-6 py-4 md:px-10 md:py-6 w-full md:w-[650px] text-xl md:text-2xl font-medium transition-all duration-300 text-left border"
              >
                <motion.div
                  animate={{
                    color: "#111827",
                    scale: hoveredMember === idx ? 1.05 : 1,
                    textShadow:
                      hoveredMember === idx
                        ? "0 0 14px rgba(249,115,22,0.7)"
                        : "0 0 0px rgba(0,0,0,0)",
                  }}
                  className="font-bold"
                >
                  {member.name}
                </motion.div>
                <motion.span
                  animate={{
                    color:
                      hoveredMember === idx ? "#ea580c" : "#6b7280",
                    scale: hoveredMember === idx ? 1.03 : 1,
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
