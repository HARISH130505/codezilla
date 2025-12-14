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

const getRandomDuration = (index: number) => {
  return 12 + Math.floor(Math.random() * 12) + index;
};

const getRandomDelay = (index: number) => {
  return Math.random() * 3;
};

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
      className="relative min-h-screen font-sans overflow-hidden bg-black"
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

      {/* MAIN CONTENT */}
      <div className="relative z-10">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="banner-bg mx-6 mt-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 text-white shadow-[0_0_32px_rgba(0,0,0,0.6)] cursor-pointer"
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
                  "0 0 14px #fb923c",
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
              className="text-4xl font-passion mb-2 tracking-wide md:text-5xl cursor-pointer"
            >
              ZILLABYTES
            </motion.h1>
            <motion.p
              whileHover={{ scale: 1.03 }}
              className="text-sm tracking-widest mb-4 cursor-pointer"
            >
              www.codezilla.club
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="search-wrapper relative w-full max-w-sm cursor-pointer"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input w-full pl-9 pr-10 py-2 rounded-full border-2 border-orange-500 text-sm outline-none bg-transparent text-white transition-all duration-300 ease-in-out placeholder:text-gray-400 hover:border-orange-400 hover:shadow-[0_0_20px_rgba(251,146,60,0.5)] focus:border-orange-400 focus:shadow-[0_0_24px_rgba(251,146,60,0.7)]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] pointer-events-none opacity-80" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            className="w-full md:w-[40%] h-[120px] md:h-[150px] bg-blog-banner bg-no-repeat bg-cover bg-center rounded-xl brightness-90 shadow-[0_0_26px_rgba(0,0,0,0.7)] cursor-pointer"
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
                  y: -12,
                  scale: 1.08,
                  boxShadow: "0 0 40px rgba(251,146,60,0.8)",
                }}
                onHoverStart={() => setHoveredBlog(blog.id)}
                onHoverEnd={() => setHoveredBlog(null)}
                className="card w-full md:w-[30%] bg-white rounded-2xl p-3 shadow-md transition-all duration-200 ease-in-out cursor-pointer"
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
                      hoveredBlog === blog.id ? "#ff4500" : "#000000",
                    scale: hoveredBlog === blog.id ? 1.05 : 1,
                  }}
                  className="card-title font-black text-sm mb-1"
                >
                  {blog.title}
                </motion.h3>
                <motion.p
                  animate={{
                    color:
                      hoveredBlog === blog.id ? "#ff6b35" : "#4b5563",
                  }}
                  className="card-published text-xs mb-2"
                >
                  Published: {new Date(blog.published).toLocaleDateString()}
                </motion.p>
                <motion.p
                  animate={{
                    color:
                      hoveredBlog === blog.id ? "#1f2937" : "#374151",
                  }}
                  className="card-desc text-xs text-gray-700 leading-tight overflow-hidden text-ellipsis flex-grow line-clamp-3"
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
              className="text-gray-200 m-6 text-sm"
            >
              No blogs found.
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}
