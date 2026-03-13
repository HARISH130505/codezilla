import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import React from "react";

interface Blog {
  id: string;
  title: string;
  slug: string;
  desc: string;
  content: string;
  imgsrc: string;
  published: string;
}

async function fetchBlogBySlug(slug: string): Promise<Blog | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;

  return data as Blog;
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="text-xl font-semibold text-zinc-600 dark:text-zinc-300 p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800">
          🔍 Blog not found or an error occurred.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-900 shadow-xl rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800">

        {blog.imgsrc && (
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
            <Image
              src={blog.imgsrc}
              alt={blog.title}
              width={1200}
              height={600}
              priority
              className="w-full h-[300px] md:h-[450px] object-cover"
            />
          </div>
        )}

        <div className="p-6 sm:p-10">
          <h1 className="text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight mb-4">
            {blog.title}
          </h1>

          <p className="text-md text-zinc-500 dark:text-zinc-400 mb-10 border-b pb-4 border-zinc-100 dark:border-zinc-800">
            Published:{" "}
            <time
              dateTime={blog.published}
              className="font-medium text-zinc-600 dark:text-zinc-300"
            >
              {new Date(blog.published).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>

          <div className="prose prose-lg dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200">
            <p className="leading-relaxed whitespace-pre-line font-serif text-xl">
              {blog.content}
            </p>
          </div>
        </div>

      </article>
    </div>
  );
}