"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Page() {
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
    <div className="bg-gray-950 min-h-screen py-12 px-4 md:px-8 lg:px-16 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-white text-4xl md:text-5xl font-passion mb-16 tracking-wide drop-shadow-[0_0_14px_rgba(251,146,60,0.7)]"
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
            }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.1 + idx * 0.08,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.01,
            }}
            className={`flex flex-col items-center gap-12 ${
              member.align === "left"
                ? "md:flex-row"
                : "md:flex-row-reverse"
            }`}
          >
            <motion.div
              whileHover={{
                boxShadow: "0 0 26px rgba(251,146,60,0.55)",
                y: -4,
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
                boxShadow: "0 0 30px rgba(251,146,60,0.75)",
                y: -4,
              }}
              className="bg-gradient-to-r from-[#DE5D26] to-[#FF8C42] text-black rounded-3xl px-6 py-4 md:px-10 md:py-6 w-full md:w-[650px] text-xl md:text-2xl font-medium"
            >
              {member.name}
              <span className="block text-sm md:text-base mt-2 font-normal">
                {member.role}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
