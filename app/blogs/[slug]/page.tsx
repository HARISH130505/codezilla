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

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string | any }>;
}) {
  const { slug } = await params;

  const { data: blog, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single<Blog>();

  if (error || !blog) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl font-semibold text-gray-600 p-6 bg-white rounded-lg shadow-md">
          🔍 Blog not found or an error occurred.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white shadow-xl rounded-lg overflow-hidden">
        {blog.imgsrc && (
          <div className="relative mb-8 h-[450px] overflow-hidden">
            <Image
              src={blog.imgsrc}
              alt={blog.title}
              fill
              priority
              className="object-cover rounded-b-lg"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}
        <div className="p-6 sm:p-10">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            {blog.title}
          </h1>
          
          {blog.desc && (
            <p className="text-lg text-gray-600 mb-6 italic">
              {blog.desc}
            </p>
          )}

          <p className="text-md text-gray-500 mb-10 border-b pb-4 border-gray-200">
            Published:{" "}
            <time dateTime={blog.published} className="font-medium text-gray-600">
              {new Date(blog.published).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>

          <div className="prose prose-lg max-w-none text-gray-800">
            <div className="leading-relaxed whitespace-pre-line text-lg">
              {blog.content}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}