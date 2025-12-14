"use client";

import React from "react";
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
  return (
    <div className="min-h-screen text-black font-sans bg-gray-950">
      <div className="container mx-auto px-4 py-12 lg:px-16">
        {/* Top heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl sm:text-5xl font-bold p-2 font-passion text-white drop-shadow-[0_0_12px_rgba(251,146,60,0.6)]">
            About Our Club
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
          {/* Left text block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="lg:w-1/2 space-y-6 text-center lg:text-left"
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
              transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
              className="text-3xl sm:text-4xl font-bold text-orange-400"
            >
              Join Our Building Together Club!
            </motion.h3>
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Do you love creating, designing, and building? Whether you're into
              woodworking, DIY projects, coding, or crafting, our club is the perfect
              place for makers and innovators like you!
            </p>
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
              className="col-span-1 md:col-span-2 text-center text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 rounded-lg p-2 font-['Poppins'] mb-6"
            >
              Why Join Us?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.25 + idx * 0.08,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    boxShadow: "0 0 24px rgba(251,146,60,0.55)",
                  }}
                  className="bg-orange-200/90 p-6 rounded-3xl shadow-lg border border-orange-300/80 transition-all duration-300"
                >
                  <h4 className="font-bold mb-3 text-xl sm:text-2xl text-[#ff7517]">
                    {card.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-900">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

  