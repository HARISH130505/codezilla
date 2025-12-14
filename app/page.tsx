"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <div className="bg-gray-950 flex items-center justify-center my-8 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        whileHover={{ scale: 1.01, boxShadow: "0 0 40px rgba(251,146,60,0.45)" }}
        className="relative bg-gradient-to-br from-gray-900 via-black to-gray-950 border border-orange-500/60 shadow-[0_0_35px_rgba(251,146,60,0.35)] rounded-2xl p-6 sm:p-8 lg:p-12 max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 border border-orange-400/20 rounded-2xl blur-sm" />

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="flex-1 text-center lg:text-left space-y-4"
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
            transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
            className="text-white text-3xl sm:text-4xl lg:text-5xl font-passion tracking-wide"
          >
            CODEZILLA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-orange-400 text-lg sm:text-xl font-semibold"
          >
            Reintroducing Codezilla
          </motion.p>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-prose mx-auto lg:mx-0">
            Codezilla is a Mozilla Campus Community in SRMIST, Ramapuram, designed
            to provide the youth, in and around the campus, an open-source platform
            where they can develop their technical knowledge and skill set for a
            better career. We organize technical events and hands-on sessions to
            scale up their expertise. It provides a good environment to engage
            students in different activities and develop their projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          whileHover={{ scale: 1.03, boxShadow: "0 0 35px rgba(251,146,60,0.55)" }}
          className="flex-shrink-0 w-full lg:w-1/2 flex justify-center"
        >
          <div className="relative rounded-2xl p-[3px] bg-gradient-to-tr from-orange-500 via-amber-400 to-orange-600 shadow-[0_0_30px_rgba(251,146,60,0.6)]">
            <Image
              src="/photo.jpg"
              alt="Codezilla club members"
              height={400}
              width={600}
              className="rounded-2xl object-cover w-full h-auto max-w-md lg:max-w-none"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
