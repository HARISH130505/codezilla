"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";

interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  imgsrc: string;
  published: string;
}

interface BlogApiResponse {
  blogs: Blog[];
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hoveredBlog, setHoveredBlog] = useState<string | null>(null);
  const router = useRouter();

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/desc");
      const data: BlogApiResponse = await res.json();
      setBlogs(data.blogs || []);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (slug: string) => {
    router.push(`/blogs/${slug}`);
  };

  return (
    <div
      className="relative min-h-screen font-sans overflow-hidden bg-gradient-to-b from-[#fff4e6] via-[#fff7ed] to-[#fffbeb]"
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

      {/* Very light overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      {/* MAIN CONTENT */}
      <div className="relative z-10">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 0 40px rgba(249,115,22,0.35)",
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-6 mt-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 bg-white/90 shadow-[0_20px_45px_rgba(15,23,42,0.1)] cursor-pointer border border-orange-200/70"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            whileHover={{ x: 10, scale: 1.02 }}
            className="max-w-full md:max-w-[50%] mb-4 md:mb-0"
          >
            <motion.h1
              initial={{ textShadow: "0 0 0px #fb923c" }}
              animate={{
                textShadow: [
                  "0 0 0px #fb923c",
                  "0 0 14px #fed7aa",
                  "0 0 4px #fed7aa",
                ],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              whileHover={{
                scale: 1.06,
                textShadow: "0 0 18px #fb923c",
              }}
              className="text-4xl font-passion mb-2 tracking-wide md:text-5xl text-slate-900"
            >
              ZILLABYTES
            </motion.h1>
            <motion.p
              whileHover={{ scale: 1.03 }}
              className="text-sm tracking-widest mb-4 text-orange-600"
            >
              www.codezilla.club
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative w-full max-w-sm"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-10 py-2 rounded-full border-2 border-orange-500 text-sm outline-none bg-white/80 text-slate-900 transition-all duration-300 ease-in-out placeholder:text-gray-400 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(251,146,60,0.35)] focus:border-orange-400 focus:shadow-[0_0_24px_rgba(251,146,60,0.45)]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] pointer-events-none opacity-80 text-orange-500" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 35px rgba(248,113,22,0.55)",
            }}
            className="w-full md:w-[40%] h-[120px] md:h-[150px] bg-blog-banner bg-no-repeat bg-cover bg-center rounded-xl shadow-[0_18px_40px_rgba(15,23,42,0.18)]"
          />
        </motion.div>

        {/* Blog Cards */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 m-6">
          {filteredBlogs.length ? (
            filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(249,115,22,0.45)",
                }}
                whileTap={{ scale: 0.97 }}
                onHoverStart={() => setHoveredBlog(blog.id)}
                onHoverEnd={() => setHoveredBlog(null)}
                className="w-full md:w-[30%] bg-white/95 rounded-2xl p-3 shadow-sm border border-orange-100 transition-all duration-200 ease-in-out cursor-pointer"
                onClick={() => handleCardClick(blog.slug)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCardClick(blog.slug);
                }}
              >
                <Image
                  src={blog.imgsrc}
                  alt={blog.title}
                  width={800}
                  height={500}
                  className="w-full h-[130px] rounded-xl object-cover mb-3"
                />
                <motion.h3
                  animate={{
                    color:
                      hoveredBlog === blog.id ? "#f97316" : "#111827",
                    scale: hoveredBlog === blog.id ? 1.05 : 1,
                    textShadow:
                      hoveredBlog === blog.id
                        ? "0 0 12px rgba(249,115,22,0.7)"
                        : "0 0 0px rgba(0,0,0,0)",
                  }}
                  className="font-black text-sm mb-1"
                >
                  {blog.title}
                </motion.h3>
                <motion.p
                  animate={{
                    color:
                      hoveredBlog === blog.id ? "#fb923c" : "#4b5563",
                  }}
                  className="text-xs mb-2"
                >
                  Published: {new Date(blog.published).toLocaleDateString()}
                </motion.p>
                <motion.p
                  animate={{
                    color:
                      hoveredBlog === blog.id ? "#111827" : "#374151",
                  }}
                  className="text-xs text-gray-700 leading-tight overflow-hidden text-ellipsis flex-grow line-clamp-3"
                >
                  {blog.description}
                </motion.p>
              </motion.div>
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-gray-600 m-6 text-sm"
            >
              No blogs found.
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
