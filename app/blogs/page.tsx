"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  imgsrc: string;
  published: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/desc");
      const data = await res.json();
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
    <div className="min-h-screen font-sans">
      {/* Banner */}
      <div className="banner-bg mx-6 mt-4 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center p-6 md:p-8 text-white">
        <div className="max-w-full md:max-w-[50%] mb-4 md:mb-0">
          <h1 className="text-4xl font-passion mb-2 tracking-wide md:text-5xl">ZILLABYTES</h1>
          <p className="text-sm tracking-widest mb-4">www.codezilla.club</p>

          {/* Search Bar */}
          <div className="search-wrapper relative w-full max-w-sm">
            <input
              type="text"
              className="search-input w-full pl-9 pr-10 py-2 rounded-full border-2 border-orange-500 text-sm outline-none bg-transparent text-white transition-all duration-300 ease-in-out placeholder:text-gray-400 placeholder:transition-colors placeholder:duration-300 placeholder:ease-in-out cursor-pointer hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/50 focus:border-orange-500 focus:shadow-lg focus:shadow-orange-500/50 hover:cursor-text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-[18px] h-[18px] pointer-events-none opacity-80" 
              size={18}
            />
          </div>
        </div>

        <div 
          className="w-full md:w-[40%] h-[120px] md:h-[150px] bg-blog-banner bg-no-repeat bg-cover bg-center rounded-xl brightness-90"
        />
      </div>

      {/* Blog Cards */}
      <div className="flex flex-wrap justify-center md:justify-start gap-6 m-6">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="card w-full md:w-[30%] bg-white rounded-2xl p-3 shadow-md hover:shadow-xl transition-all duration-200 ease-in-out transform hover:-translate-y-2 cursor-pointer"
              onClick={() => handleCardClick(blog.slug)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCardClick(blog.slug);
              }}
            >
              <img
                src={blog.imgsrc}
                alt={blog.title}
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
            </div>
          ))
        ) : (
          <p className="text-white m-6">No blogs found.</p>
        )}
      </div>
    </div>
  );
}
