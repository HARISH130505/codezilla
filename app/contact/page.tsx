"use client";

import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
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
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fff4e6] via-[#fff7ed] to-[#fffbeb]"
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
      <div className="relative z-10 min-h-screen text-slate-900 font-sans">
        <section className="px-6 md:px-12 lg:px-24 py-12 text-center">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{
              scale: 1.04,
              textShadow: "0 0 18px rgba(249,115,22,0.7)",
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-passion mb-2 cursor-pointer"
          >
            Contact Our Friendly Family
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            whileHover={{ scale: 1.02 }}
            className="text-lg md:text-2xl text-gray-700 font-passion mb-8 cursor-pointer"
          >
            Connect, Collaborate, Create Together.
          </motion.h3>

          <div className="flex flex-col lg:flex-row gap-10 justify-between mt-8">
            {/* Left Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              whileHover={{ x: 10, scale: 1.02 }}
              className="flex-1 text-left text-[#DE5D26] text-lg cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
                <h4 className="text-xl md:text-2xl font-bold text-slate-900">
                  Send Us a Message
                </h4>
                <motion.div whileHover={{ rotate: 20, scale: 1.2 }}>
                  <MessageSquare className="w-7 h-7 text-[#DE5D26]" />
                </motion.div>
              </div>
              <motion.p
                whileHover={{ scale: 1.02 }}
                className="text-sm md:text-base text-gray-700 text-center lg:text-left mb-6"
              >
                Feel free to reach out through the contact form or find our contact
                information below. Your feedback, questions, and suggestions help us
                build a better tech community at our university.
              </motion.p>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {/* Email Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{
                    y: -10,
                    scale: 1.06,
                    boxShadow: "0 0 40px rgba(249,115,22,0.5)",
                    borderColor: "#DE5D26",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onHoverStart={() => setHoveredCard(0)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative border-2 border-orange-100 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center gap-2 bg-white/90 backdrop-blur-sm transition-all duration-300 cursor-pointer"
                >
                  <motion.div whileHover={{ rotate: 20, scale: 1.2 }}>
                    <Mail className="w-8 h-8 text-[#DE5D26]" />
                  </motion.div>
                  <motion.h4
                    animate={{
                      color: hoveredCard === 0 ? "#f97316" : "#111827",
                      scale: hoveredCard === 0 ? 1.05 : 1,
                    }}
                    className="text-lg font-bold"
                  >
                    Chat To Support
                  </motion.h4>
                  <motion.a
                    href="mailto:codezillaclub@gmail.com"
                    animate={{
                      color: hoveredCard === 0 ? "#ea580c" : "#4b5563",
                    }}
                    className="text-sm text-center break-words hover:text-orange-500 transition-colors"
                  >
                    codezillaclub@gmail.com
                  </motion.a>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.28 }}
                  whileHover={{
                    y: -10,
                    scale: 1.06,
                    boxShadow: "0 0 40px rgba(249,115,22,0.5)",
                    borderColor: "#DE5D26",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onHoverStart={() => setHoveredCard(1)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative border-2 border-orange-100 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center gap-2 bg-white/90 backdrop-blur-sm transition-all duration-300 cursor-pointer"
                >
                  <motion.div whileHover={{ rotate: 20, scale: 1.2 }}>
                    <Phone className="w-8 h-8 text-[#DE5D26]" />
                  </motion.div>
                  <motion.h4
                    animate={{
                      color: hoveredCard === 1 ? "#f97316" : "#111827",
                      scale: hoveredCard === 1 ? 1.05 : 1,
                    }}
                    className="text-lg font-bold"
                  >
                    Call Us
                  </motion.h4>
                  <motion.a
                    href="tel:+917498133608"
                    animate={{
                      color: hoveredCard === 1 ? "#ea580c" : "#2563eb",
                    }}
                    className="underline font-medium hover:text-blue-500 transition-colors"
                  >
                    +91 74981 33608
                  </motion.a>
                </motion.div>

                {/* Location Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.36 }}
                  whileHover={{
                    y: -10,
                    scale: 1.06,
                    boxShadow: "0 0 40px rgba(249,115,22,0.5)",
                    borderColor: "#DE5D26",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onHoverStart={() => setHoveredCard(2)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="relative border-2 border-orange-100 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center gap-2 bg-white/90 backdrop-blur-sm transition-all duration-300 cursor-pointer"
                >
                  <motion.div whileHover={{ rotate: 20, scale: 1.2 }}>
                    <MapPin className="w-8 h-8 text-[#DE5D26]" />
                  </motion.div>
                  <motion.h4
                    animate={{
                      color: hoveredCard === 2 ? "#f97316" : "#111827",
                      scale: hoveredCard === 2 ? 1.05 : 1,
                    }}
                    className="text-lg font-bold"
                  >
                    Reach Us
                  </motion.h4>
                  <motion.p
                    animate={{
                      color: hoveredCard === 2 ? "#ea580c" : "#4b5563",
                    }}
                    className="text-xs leading-tight text-center"
                  >
                    SRM University,
                    <br />
                    Bharathi Salai, Ramapuram,
                    <br />
                    Chennai, Tamil Nadu 600089
                  </motion.p>
                  <motion.a
                    href="https://maps.app.goo.gl/bWd8gwjzZpGGHx7y5"
                    animate={{
                      color: hoveredCard === 2 ? "#ea580c" : "#2563eb",
                    }}
                    className="underline text-xs mt-2 hover:text-blue-500 transition-colors"
                  >
                    View On Google Maps
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.form
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 40px rgba(249,115,22,0.45)",
              }}
              className="flex-1 flex flex-col items-center bg-gradient-to-br from-[#DE5D26] to-[#FF8C42] rounded-3xl p-6 shadow-[0_20px_45px_rgba(248,113,22,0.45)] w-full max-w-lg lg:max-w-none mx-auto text-black transition-all duration-300"
            >
              <motion.h4
                initial={{ textShadow: "0 0 0px #000" }}
                animate={{
                  textShadow: [
                    "0 0 0px #000",
                    "0 0 10px rgba(0,0,0,0.5)",
                    "0 0 4px rgba(0,0,0,0.5)",
                  ],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="text-2xl font-bold text-center mb-6 text-black"
              >
                Get In Touch
              </motion.h4>
              <motion.input
                type="text"
                placeholder="Your Name"
                required
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                }}
                className="w-full h-12 rounded-xl bg-white/20 placeholder-black/60 backdrop-blur-sm px-4 mb-4 text-lg outline-none text-black focus:ring-2 focus:ring-black focus:bg-white/30 transition-all"
              />
              <motion.input
                type="email"
                placeholder="Your Email"
                required
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                }}
                className="w-full h-12 rounded-xl bg-white/20 placeholder-black/60 backdrop-blur-sm px-4 mb-4 text-lg outline-none text-black focus:ring-2 focus:ring-black focus:bg-white/30 transition-all"
              />
              <motion.textarea
                placeholder="Write Your Message Here"
                required
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                }}
                className="w-full h-40 rounded-xl bg.white/20 bg-white/20 placeholder-black/60 backdrop-blur-sm px-4 py-3 mb-6 text-lg outline-none resize-none text-black focus:ring-2 focus:ring-black focus:bg-white/30 transition-all"
              />
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.08,
                  boxShadow: "0 0 30px rgba(0,0,0,0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-black text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-colors duration-300"
              >
                SEND →
              </motion.button>
            </motion.form>
          </div>
        </section>
      </div>
    </div>
  );
}
