import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase client is not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY." },
      { status: 500 }
    );
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  // ✅ Sanitize filename
  const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("blog-images")
    .upload(fileName, file);

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });


  const { data } = supabase.storage.from("blog-images").getPublicUrl(uploadData.path);

  return NextResponse.json({ url: data.publicUrl });
}
