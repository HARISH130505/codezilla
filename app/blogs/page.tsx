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
  const router = useRouter();

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
    <div className="min-h-screen font-sans bg-gray-950">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="banner-bg mx-6 mt-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 text-white shadow-[0_0_32px_rgba(0,0,0,0.6)]"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
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
            transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
            className="text-4xl font-passion mb-2 tracking-wide md:text-5xl"
          >
            ZILLABYTES
          </motion.h1>
          <p className="text-sm tracking-widest mb-4">www.codezilla.club</p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="search-wrapper relative w-full max-w-sm"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input w-full pl-9 pr-10 py-2 rounded-full border-2 border-orange-500 text-sm outline-none bg-transparent text-white transition-all duration-300 ease-in-out placeholder:text-gray-400 cursor-pointer hover:border-orange-400 hover:shadow-[0_0_20px_rgba(251,146,60,0.5)] focus:border-orange-400 focus:shadow-[0_0_24px_rgba(251,146,60,0.7)]"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] pointer-events-none opacity-80"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="w-full md:w-[40%] h-[120px] md:h-[150px] bg-blog-banner bg-no-repeat bg-cover bg-center rounded-xl brightness-90 shadow-[0_0_26px_rgba(0,0,0,0.7)]"
        />
      </motion.div>

      {/* Blog Cards */}
      <div className="flex flex-wrap justify-center md:justify-start gap-6 m-6">
        {filteredBlogs.length ? (
          filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.2 + index * 0.08,
                ease: "easeOut",
              }}
              whileHover={{
                y: -6,
                scale: 1.03,
                boxShadow: "0 0 26px rgba(251,146,60,0.55)",
              }}
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
              <h3 className="card-title font-black text-sm mb-1 text-black">
                {blog.title}
              </h3>
              <p className="card-published text-xs text-gray-600 mb-2">
                Published: {new Date(blog.published).toLocaleDateString()}
              </p>
              <p className="card-desc text-xs text-gray-700 leading-tight overflow-hidden text-ellipsis flex-grow line-clamp-3">
                {blog.description}
              </p>
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
  );
}
