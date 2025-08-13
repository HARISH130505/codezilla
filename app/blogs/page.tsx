"use client";

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
    // Navigate to the blog page
    window.open(url, "_blank"); // open in new tab
  };

  return (
    <>
      <style jsx>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .banner {
          margin: 16px 24px;
          background: linear-gradient(
            90deg,
            #000000 0%,
            #0c101a 40%,
            #d9b68e 100%
          );
          border-radius: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 32px;
          color: white;
        }
        .banner-text {
          max-width: 50%;
        }
        .banner-text h1 {
          font-size: 36px;
          font-weight: 900;
          margin: 0 0 8px 0;
          letter-spacing: 1.5px;
        }
        .banner-text p {
          margin: 0 0 16px 0;
          font-size: 13px;
          letter-spacing: 0.8px;
        }

        .search-wrapper {
          position: relative;
          max-width: 320px;
          width: 100%;
        }
        .search-input {
          width: 100%;
          padding: 8px 40px 8px 36px;
          border-radius: 20px;
          border: 2px solid #ff5f00;
          font-size: 13px;
          outline: none;
          color: black;
          background: transparent;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .search-input::placeholder {
          color: #888;
          font-size: 13px;
          transition: color 0.3s ease;
        }
        .search-input:hover,
        .search-input:focus {
          background: white;
          border-color: #ff5f00;
          box-shadow: 0 0 8px #ff5f00aa;
          cursor: text;
        }
        .search-input:hover::placeholder,
        .search-input:focus::placeholder {
          color: #555;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          pointer-events: none;
          opacity: 0.8;
        }

        .banner-image {
          max-width: 40%;
          height: 120px;
          background: url("/banner-blog-image.png") no-repeat center;
          background-size: cover;
          border-radius: 12px;
          filter: brightness(0.9);
        }

        .cards-container {
          display: flex;
          justify-content: space-between;
          margin: 24px;
          gap: 24px;
          flex-wrap: wrap;
        }
        .card {
          background: white;
          border-radius: 16px;
          padding: 12px;
          width: 30%;
          box-shadow: 0 3px 10px rgb(0 0 0 / 0.1);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
        }
        .card:hover {
          box-shadow: 0 6px 20px rgb(0 0 0 / 0.15);
          transform: translateY(-6px);
        }
        .card-image {
          width: 100%;
          height: 130px;
          background: #eee;
          border-radius: 12px;
          margin-bottom: 12px;
          object-fit: cover;
        }
        .card-title {
          font-weight: 900;
          font-size: 14px;
          margin: 0 0 6px 0;
          color: black;
        }
        .card-published {
          font-size: 12px;
          color: #444;
          margin-bottom: 10px;
        }
        .card-desc {
          font-size: 12px;
          color: #333;
          line-height: 1.3;
          flex-grow: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 900px) {
          .cards-container {
            flex-direction: column;
            margin: 16px;
          }
          .card {
            width: 100%;
          }
          .banner {
            flex-direction: column;
            align-items: flex-start;
          }
          .banner-text {
            max-width: 100%;
            margin-bottom: 16px;
          }
          .banner-image {
            max-width: 100%;
            height: 150px;
          }
        }
      `}</style>

      {/* Banner */}
      <div className="banner">
        <div className="banner-text">
          <h1>ZILLABYTES</h1>
          <p>www.codezilla.club</p>

          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="search-icon"
              fill="#4a1d7e"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M10 2a8 8 0 105.29 14.29l4.71 4.71 1.42-1.42-4.71-4.71A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
            </svg>
          </div>
        </div>

        <img
          src="/banner-blog-image.png"
          alt="Blog Visual"
          className="banner-image"
        />
      </div>

      {/* Blog Cards */}
      <div className="cards-container">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="card"
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
                className="card-image"
                loading="lazy"
              />
              <h3 className="card-title">{blog.title}</h3>
              <p className="card-published">Published: {blog.published}</p>
              <p className="card-desc">{blog.desc}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "white", margin: "24px" }}>No blogs found.</p>
        )}
      </div>
    </>
  );
}
