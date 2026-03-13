"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, type Transition } from "framer-motion";
import { Search, Calendar, ArrowUpRight } from "lucide-react";

const tx = (delay = 0): Transition => ({
  duration: 0.55,
  ease: [0.25, 0.46, 0.45, 0.94],
  delay,
});

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: tx(delay),
});

type Blog = {
  id: string;
  title: string;
  slug: string;
  description: string;
  published: string;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/desc")
      .then((r) => r.json())
      .then((data) => {
        // API returns { blogs: [...] } — unwrap it
        const list = Array.isArray(data) ? data : (data?.blogs ?? []);
        setBlogs(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0 dark:opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-56 bg-orange-400/10 blur-3xl rounded-full" />
        <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
          <motion.div {...fade(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/60 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 px-3 py-1 text-[11px] font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              From the community
            </span>
          </motion.div>
          <motion.h1 {...fade(0.07)} className="font-passion text-5xl md:text-7xl text-zinc-900 dark:text-zinc-100 leading-[1.05] mb-5">
            Zillabytes <span className="text-orange-500">(Blogs)</span>
          </motion.h1>
          <motion.p {...fade(0.14)} className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto mb-8">
            Tutorials, project write-ups, and perspectives from the Codezilla community.
          </motion.p>

          {/* Search */}
          <motion.div {...fade(0.2)} className="relative max-w-md mx-auto">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
            <input
              type="text"
              placeholder="Search posts…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 pl-9 pr-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300 transition"
            />
          </motion.div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 pb-24 md:pb-32">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3 animate-pulse">
                <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full w-2/3" />
                <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full w-full" />
                <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full w-1/2" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-zinc-400 dark:text-zinc-500">
            <p className="text-4xl mb-3">📭</p>
            <p className="text-sm">No posts found{query ? ` for "${query}"` : ""}.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((blog, i) => (
              <motion.article
                key={blog.id}
                {...fade(i * 0.05)}
                className="group relative flex flex-col rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-orange-200 dark:hover:border-orange-500/40 hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="flex-1 p-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500">
                    <Calendar size={11} />
                    {blog.published
                      ? new Date(blog.published).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                      : "—"}
                  </div>
                  <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-orange-500 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed line-clamp-3">
                    {blog.description}
                  </p>
                </div>
                <div className="px-5 pb-5">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors"
                  >
                    Read post <ArrowUpRight size={12} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
