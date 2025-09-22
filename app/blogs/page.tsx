"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";

interface Blog {
  id: number;
  title: string;
  published: string;
  desc: string;
  imgSrc: string;
  url: string; // URL to open on click
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "The Rise of Quantum Computing",
    published: "June 12, 2025",
    desc: `Quantum computing is no longer a far-off dream. With companies like IBM, Google, and startups pushing boundaries, we're closer to solving problems that classical computers can't handle. From cryptography to drug discovery, this new era of computing could reshape entire ...`,
    imgSrc: "/placeholder1.png",
    url: "/blogs/quantum-computing",
  },
  {
    id: 2,
    title: "The Future of Cybersecurity",
    published: "May 28, 2025",
    desc: `As the Internet of Things grows, so do vulnerabilities. Learn how modern cybersecurity measures like AI-based threat detection and zero-trust architecture are becoming essential to protect data and devices in our connected world ...`,
    imgSrc: "/placeholder2.png",
    url: "/blogs/cybersecurity-future",
  },
  {
    id: 3,
    title: "Top 5 AI Tools for Productivity",
    published: "May 4, 2025",
    desc: `AI is revolutionizing daily work. This blog covers tools that boost productivity—from automated writing assistants to smart scheduling bots. Whether you're a student, developer, or CEO, these tools can save hours of work like typing, research ...`,
    imgSrc: "/placeholder3.png",
    url: "/blogs/ai-tools-productivity",
  },
];

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (url: string) => {
    window.open(url, "_blank"); // open in new tab
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
              onClick={() => handleCardClick(blog.url)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCardClick(blog.url);
              }}
            >
              <img
                src={blog.imgSrc}
                alt={blog.title}
                className="w-full h-[130px] rounded-xl object-cover mb-3"
              />
              <h3 className="card-title font-black text-sm mb-1 text-black">{blog.title}</h3>
              <p className="card-published text-xs text-gray-600 mb-2">Published: {blog.published}</p>
              <p className="card-desc text-xs text-gray-700 leading-tight overflow-hidden text-ellipsis flex-grow">{blog.desc}</p>
            </div>
          ))
        ) : (
          <p className="text-white m-6">No blogs found.</p>
        )}
      </div>
    </div>
  );
}