"use client";

import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-950 text-[#f9fafb] font-sans">
      <section className="px-6 md:px-12 lg:px-24 py-12 text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-passion text-white mb-2 drop-shadow-[0_0_14px_rgba(251,146,60,0.7)]"
        >
          Contact Our Friendly Family
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg md:text-2xl text-gray-300 font-passion mb-8"
        >
          Connect, Collaborate, Create Together.
        </motion.h3>

        <div className="flex flex-col lg:flex-row gap-10 justify-between mt-8">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="flex-1 text-left text-[#DE5D26] text-lg"
          >
            <div className="flex items-center gap-3 mb-4 justify-center lg:justify-start">
              <h4 className="text-xl md:text-2xl font-bold text-white">
                Send Us a Message
              </h4>
              <MessageSquare className="w-7 h-7 text-[#DE5D26]" />
            </div>
            <p className="text-sm md:text-base text-gray-300 text-center lg:text-left mb-6">
              Feel free to reach out through the contact form or find our contact
              information below. Your feedback, questions, and suggestions are
              important to us as we strive to foster a vibrant tech community at
              our university.
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 0 24px rgba(251,146,60,0.6)",
                  borderColor: "#DE5D26",
                }}
                className="relative border-2 border-gray-700 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center gap-2 bg-gray-900/60 backdrop-blur-sm transition-all duration-300"
              >
                <Mail className="w-8 h-8 text-[#DE5D26]" />
                <h4 className="text-lg font-bold text-white">Chat To Support</h4>
                <span className="text-sm text-center break-words text-gray-200">
                  codezillaclub@gmail.com
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 0 24px rgba(251,146,60,0.6)",
                  borderColor: "#DE5D26",
                }}
                className="relative border-2 border-gray-700 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center gap-2 bg-gray-900/60 backdrop-blur-sm transition-all duration-300"
              >
                <Phone className="w-8 h-8 text-[#DE5D26]" />
                <h4 className="text-lg font-bold text-white">Call Us</h4>
                <a
                  href="tel:+917498133608"
                  className="underline text-blue-400 font-medium"
                >
                  +91 74981 33608
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.36 }}
                whileHover={{
                  y: -6,
                  boxShadow: "0 0 24px rgba(251,146,60,0.6)",
                  borderColor: "#DE5D26",
                }}
                className="relative border-2 border-gray-700 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center gap-2 bg-gray-900/60 backdrop-blur-sm transition-all duration-300"
              >
                <MapPin className="w-8 h-8 text-[#DE5D26]" />
                <h4 className="text-lg font-bold text-white">Reach Us</h4>
                <p className="text-xs leading-tight text-center text-gray-200">
                  SRM University,
                  <br />
                  Bharathi Salai, Ramapuram,
                  <br />
                  Chennai, Tamil Nadu 600089
                </p>
                <a
                  href="https://maps.app.goo.gl/bWd8gwjzZpGGHx7y5"
                  className="underline text-blue-400 text-xs mt-2"
                >
                  View On Google Maps
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="flex-1 flex flex-col items-center bg-gradient-to-br from-[#DE5D26] to-[#FF8C42] rounded-3xl p-6 shadow-[0_0_32px_rgba(251,146,60,0.7)] w-full max-w-lg lg:max-w-none mx-auto text-black"
          >
            <h4 className="text-2xl font-bold text-center mb-6 text-black">
              Get In Touch
            </h4>
            <input
              type="text"
              placeholder="Your Name"
              required
              className="w-full h-12 rounded-xl bg-white/15 placeholder-white/80 backdrop-blur-sm px-4 mb-4 text-lg outline-none text-white focus:ring-2 focus:ring-white focus:bg-white/20 transition-all"
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="w-full h-12 rounded-xl bg-white/15 placeholder-white/80 backdrop-blur-sm px-4 mb-4 text-lg outline-none text-white focus:ring-2 focus:ring-white focus:bg.white/20 transition-all"
            />
            <textarea
              placeholder="Write Your Message Here"
              required
              className="w-full h-40 rounded-xl bg-white/15 placeholder-white/80 backdrop-blur-sm px-4 py-3 mb-6 text-lg outline-none resize-none text-white focus:ring-2 focus:ring-white focus:bg-white/20 transition-all"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0 0 26px rgba(0,0,0,0.8)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full bg-black text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-colors duration-300"
            >
              SEND →
            </motion.button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}

