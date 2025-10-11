import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  slug: string;
  desc: string;
  content: string;
  imgsrc: string;
  published: string;
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-xl font-semibold text-gray-600 p-6 bg-white rounded-lg shadow-md">
        🔍 Blog not found or an error occurred.
      </div>
    </div>
  );

  const blog = data as Blog;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-xl rounded-lg overflow-hidden">
        
        {/* Blog Image Header */}
        {blog.imgsrc && (
          <div className="mb-8 max-h-[450px] overflow-hidden">
            <Image
              src={blog.imgsrc}
              alt={blog.title}
              width={800}        
              height={500}      
              className="w-full h-full object-cover rounded-b-lg shadow-lg"
            />
          </div>
        )}

        <div className="p-6 sm:p-10">
          
          {/* Title and Metadata */}
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {blog.title}
          </h1>
          <p className="text-md text-gray-500 mb-10 border-b pb-4 border-gray-100">
            Published: <time dateTime={blog.published} className="font-medium text-gray-600">
              {new Date(blog.published).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </p>

          {/* Content Body */}
          <div className="prose prose-lg max-w-none text-gray-800">
            <p className="leading-relaxed whitespace-pre-line font-serif text-xl">
              {blog.content}
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}