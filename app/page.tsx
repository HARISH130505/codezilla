"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
      className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden bg-gradient-to-b from-[#fff4e6] via-[#fff7ed] to-[#fffbeb]"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive soft orange glow */}
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

      {/* Very light overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      {/* Hero card (same structure as your previous one, recolored) */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 40px rgba(248,113,22,0.35)",
        }}
        className="relative bg-white/95 border border-orange-300/70 shadow-[0_20px_50px_rgba(15,23,42,0.1)] rounded-2xl p-6 sm:p-8 lg:p-12 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 overflow-hidden backdrop-blur-md transition-all duration-300 cursor-pointer"
      >
        <div className="pointer-events-none absolute inset-0 border border-orange-200/60 rounded-2xl" />

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
                "0 0 12px #fed7aa",
                "0 0 4px #fed7aa",
              ],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            whileHover={{
              scale: 1.08,
              textShadow: "0 0 18px #fb923c",
            }}
            className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-passion tracking-wide transition-all"
          >
            CODEZILLA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            whileHover={{
              scale: 1.05,
              color: "#ea580c",
            }}
            className="text-orange-500 text-lg sm:text-xl font-semibold transition-all"
          >
            Reintroducing Codezilla
          </motion.p>

          <motion.p
            whileHover={{ scale: 1.03, x: 5 }}
            className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-prose mx-auto lg:mx-0 transition-all"
          >
            Codezilla is a Mozilla Campus Community in SRMIST, Ramapuram, designed
            to provide the youth, in and around the campus, an open-source
            platform where they can develop their technical knowledge and skill
            set for a better career. We organize technical events and hands-on
            sessions to scale up their expertise. It provides a good environment
            to engage students in different activities and develop their projects.
          </motion.p>
        </motion.div>

        {/* Right image column */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          whileHover={{
            scale: 1.08,
            boxShadow: "0 0 35px rgba(248,113,22,0.6)",
          }}
          className="flex-shrink-0 w-full lg:w-1/2 flex justify-center cursor-pointer transition-all duration-300"
        >
          <motion.div
            whileHover={{
              rotateY: 5,
            }}
            className="relative rounded-2xl p-[3px] bg-gradient-to-tr from-orange-400 via-amber-300 to-orange-200 shadow-[0_0_25px_rgba(248,113,22,0.55)] transition-all"
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
