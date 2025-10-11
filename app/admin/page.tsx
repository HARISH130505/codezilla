"use client";

import React, { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const generateSlug = (text: string) =>
    text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = "";

    if (!supabase) {
      alert("Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");
      setLoading(false);
      return;
    }

    const client = supabase; // narrow non-null for TypeScript

    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: imgError } = await client.storage
        .from("blog-images")
        .upload(fileName, file as any);

      if (imgError) {
        alert("Image upload failed: " + imgError.message);
        setLoading(false);
        return;
      }

      const { data } = client.storage.from("blog-images").getPublicUrl(fileName);
      imageUrl = data.publicUrl;
    }

    const { error: insertError } = await (client as any).from("blogs").insert([
      {
        slug,
        title,
        description,
        content,
        imgsrc: imageUrl,
      },
    ]);

    if (insertError) {
      alert("Error saving blog: " + insertError.message);
      setLoading(false);
      return;
    }

    alert("Blog posted successfully!");
    setTitle("");
    setSlug("");
    setDesc("");
    setContent("");
    setFile(null);
    setLoading(false);
    router.push("/blogs");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 flex items-center justify-center">
          <span className="mr-3 text-indigo-600">🛠️</span> Admin Dashboard
        </h1>

        <form onSubmit={handleUpload} className="space-y-6">
          {/* Title and Slug Inputs */}
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Blog Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setSlug(generateSlug(e.target.value));
              }}
              className="w-full border border-gray-300 p-3 rounded-lg  transition duration-150 ease-in-out shadow-sm text-lg"
              required
            />
            <input
              type="text"
              placeholder="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg bg-gray-50  transition duration-150 ease-in-out shadow-sm"
              required
            />
          </div>

          {/* Description Textarea */}
          <textarea
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg h-24 resize-none  transition duration-150 ease-in-out shadow-sm"
            required
          />

          {/* Content Textarea */}
          <textarea
            placeholder="Full Content (Markdown or HTML supported)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg h-60 resize-y  transition duration-150 ease-in-out shadow-sm font-mono text-sm"
            required
          />

          {/* File Input */}
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition duration-150 ease-in-out">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v8"></path></svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop image (Max 1 file)</p>
                    <p className="text-xs text-gray-500">{file ? `Selected: ${file.name}` : "JPG, PNG, GIF, or WEBP"}</p>
                </div>
                <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="hidden"
                />
            </label>
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-gray-900 hover:bg-black focus:outline-none focus:ring-4 focus:ring-gray-700 focus:ring-opacity-50 transition duration-200 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            disabled={loading}
          >
            {loading ? (
             <Loader2/>
            ) : null}
            {loading ? "Uploading & Publishing..." : "Publish Blog Post"}
          </button>
        </form>
      </div>
    </div>
  );
}