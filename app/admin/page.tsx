"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
  Loader2, Plus, Trash2, UserCheck, CalendarCheck,
  FileText, X, CheckSquare, Square, Save, ShieldAlert
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

type AllowedEmail = {
  id: string;
  email: string;
  added_at: string;
};

type MemberProfile = {
  id: string;
  full_name: string | null;
  email?: string | null;
  domain: string | null;
  department: string | null;
};

type Tab = "blog" | "members" | "attendance";

// ─── Helpers ────────────────────────────────────────────────────────────────

function generateSlug(text: string) {
  return text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab]         = useState<Tab>("members");
  const [adminCheck, setAdminCheck] = useState<"loading" | "ok" | "denied">("loading");

  // Check admin role on mount
  useEffect(() => {
    const check = async () => {
      if (!supabase) { setAdminCheck("denied"); return; }
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/admin/login"); return; }
      
      const { data } = await supabase
        .from("profiles")
        .select("role, onboarding_complete")
        .eq("id", user.id)
        .maybeSingle();
        
      const profile = data as { role?: string; onboarding_complete?: boolean } | null;
      
      if (profile?.role === "admin") {
        if (!profile.onboarding_complete) { router.replace("/admin/onboarding"); } 
        else { setAdminCheck("ok"); }
      } else {
        // Fallback: check if they are in the allowed_admins list but just haven't been upgraded yet
        const { data: whitelistData } = await supabase
          .from("allowed_admins")
          .select("id")
          .eq("email", user.email?.toLowerCase().trim() || "")
          .maybeSingle();

        if (whitelistData) {
          // Upgrade their role
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await (supabase.from("profiles") as any).update({ role: "admin" }).eq("id", user.id);
          
          if (!profile?.onboarding_complete) {
            router.replace("/admin/onboarding");
          } else {
            setAdminCheck("ok");
          }
        } else {
          setAdminCheck("denied");
        }
      }
    };
    check();
  }, [router]);

  if (adminCheck === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="w-6 h-6 animate-spin text-orange-500 dark:text-orange-400" />
      </div>
    );
  }

  if (adminCheck === "denied") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 gap-4 px-4">
        <ShieldAlert className="w-12 h-12 text-red-500 dark:text-red-400" />
        <h1 className="font-passion text-2xl text-zinc-900 dark:text-white">Access Denied</h1>
        <p className="text-sm text-zinc-500 dark:text-white/40 text-center">You need admin privileges to view this page.</p>
        <button onClick={() => router.push("/portal")}
          className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-zinc-900 dark:text-white text-sm font-semibold transition-colors">
          Go to My Portal
        </button>
      </div>
    );
  }

  const tabCls = (t: Tab) =>
    `flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-150 ${
      tab === t
        ? "bg-orange-500 text-white shadow-[0_4px_16px_rgba(249,115,22,0.3)]"
        : "text-zinc-500 dark:text-white/40 hover:text-zinc-700 dark:text-white/70 hover:bg-white/[0.05]"
    }`;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-orange-500/8 blur-3xl rounded-full" />

      <div className="relative max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-passion text-3xl text-zinc-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-xs text-zinc-500 dark:text-white/30 mt-0.5">Codezilla · SRMIST Ramapuram</p>
          </div>
          <button onClick={() => router.push("/portal")}
            className="px-4 py-1.5 rounded-xl border border-white/[0.08] text-xs text-zinc-500 dark:text-white/40 hover:text-zinc-700 dark:text-white/70 transition-colors">
            My Portal
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.06] w-fit">
          <button className={tabCls("members")}   onClick={() => setTab("members")}>
            <UserCheck size={14} /> Members
          </button>
          <button className={tabCls("attendance")} onClick={() => setTab("attendance")}>
            <CalendarCheck size={14} /> Attendance
          </button>
          <button className={tabCls("blog")}       onClick={() => setTab("blog")}>
            <FileText size={14} /> Blog
          </button>
        </div>

        {/* Tab content */}
        {tab === "members"    && <MembersTab />}
        {tab === "attendance" && <AttendanceTab />}
        {tab === "blog"       && <BlogTab />}
      </div>
    </div>
  );
}

// ─── Members / Whitelist Tab ──────────────────────────────────────────────────

function MembersTab() {
  const [emails,     setEmails]     = useState<AllowedEmail[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [newEmail,   setNewEmail]   = useState("");
  const [adding,     setAdding]     = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [error,      setError]      = useState<string | null>(null);
  const [success,    setSuccess]    = useState<string | null>(null);

  const fetchEmails = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("allowed_emails")
      .select("id, email, added_at")
      .order("added_at", { ascending: false });
    if (!error) setEmails((data as AllowedEmail[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchEmails(); }, [fetchEmails]);

  const addEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setSuccess(null);
    if (!supabase || !newEmail.trim()) return;
    setAdding(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("allowed_emails") as any)
      .insert([{ email: newEmail.trim().toLowerCase() }]);
    setAdding(false);
    if (error) { setError(error.message); return; }
    setSuccess(`${newEmail.trim()} added to whitelist.`);
    setNewEmail("");
    fetchEmails();
  };

  const removeEmail = async (id: string, email: string) => {
    if (!supabase) return;
    setRemovingId(id); setError(null); setSuccess(null);
    const { error } = await supabase.from("allowed_emails").delete().eq("id", id);
    setRemovingId(null);
    if (error) { setError(error.message); return; }
    setSuccess(`${email} removed.`);
    setEmails((prev) => prev.filter((e) => e.id !== id));
  };

  const fieldCls = "flex-1 rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:focus:ring-orange-400/40 transition";

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl p-6 space-y-5">
        <div>
          <h2 className="font-passion text-xl text-zinc-900 dark:text-white mb-0.5">Member Whitelist</h2>
          <p className="text-xs text-zinc-500 dark:text-white/30">Only emails in this list can log in to Codezilla.</p>
        </div>

        {error   && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-300">{error}</div>}
        {success && <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-600 dark:text-emerald-300">{success}</div>}

        {/* Add email form */}
        <form onSubmit={addEmail} className="flex gap-2">
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="member@example.com"
            className={fieldCls}
          />
          <button
            type="submit"
            disabled={adding}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-sm font-semibold text-white transition-all duration-150"
          >
            {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            Add
          </button>
        </form>

        {/* Email list */}
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-orange-500 dark:text-orange-400" /></div>
        ) : emails.length === 0 ? (
          <p className="text-sm text-zinc-400 dark:text-white/20 text-center py-8">No emails added yet.</p>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 pb-2">
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-white/25">Email</span>
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-white/25">Added</span>
              <span />
            </div>
            {emails.map((e) => (
              <div key={e.id} className="grid grid-cols-[1fr_auto_auto] gap-4 py-3 items-center">
                <span className="text-sm text-zinc-700 dark:text-white/70 truncate">{e.email}</span>
                <span className="text-[11px] text-zinc-400 dark:text-white/25 whitespace-nowrap">
                  {new Date(e.added_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
                <button
                  onClick={() => removeEmail(e.id, e.email)}
                  disabled={removingId === e.id}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-red-200 dark:border-red-500/20 text-red-500 dark:text-red-500/70 dark:text-red-400/60 hover:text-red-500 dark:text-red-400 hover:border-red-300 dark:hover:border-red-500/40 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-150 disabled:opacity-50"
                >
                  {removingId === e.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="text-[11px] text-zinc-400 dark:text-white/20">{emails.length} email{emails.length !== 1 ? "s" : ""} on whitelist</p>
      </div>
    </div>
  );
}

// ─── Attendance Tab ───────────────────────────────────────────────────────────

function AttendanceTab() {
  const [members,    setMembers]    = useState<MemberProfile[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [eventName,  setEventName]  = useState("");
  const [eventDate,  setEventDate]  = useState(new Date().toISOString().slice(0, 10));
  const [present,    setPresent]    = useState<Record<string, boolean>>({});
  const [error,      setError]      = useState<string | null>(null);
  const [success,    setSuccess]    = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      if (!supabase) return;
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, domain, department")
        .order("full_name");
      const profiles = (data as MemberProfile[]) ?? [];
      setMembers(profiles);
      const init: Record<string, boolean> = {};
      profiles.forEach((m) => { init[m.id] = false; });
      setPresent(init);
      setLoading(false);
    };
    fetch();
  }, []);

  const toggleAll = (val: boolean) => {
    setPresent(Object.fromEntries(members.map((m) => [m.id, val])));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); setSuccess(null);
    if (!supabase) return;
    if (!eventName.trim()) { setError("Event name is required."); return; }
    setSaving(true);

    const rows = members.map((m) => ({
      member_id:  m.id,
      event_name: eventName.trim(),
      event_date: eventDate,
      present:    present[m.id] ?? false,
      marked_by:  "admin",
    }));

    // Delete existing records for this event first, then insert fresh ones
    // (avoids needing a UNIQUE constraint for upsert)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: delError } = await (supabase.from("attendance") as any)
      .delete()
      .eq("event_name", eventName.trim())
      .eq("event_date", eventDate);

    if (delError) { setError(delError.message); setSaving(false); return; }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("attendance") as any).insert(rows);

    setSaving(false);
    if (error) { setError(error.message); return; }
    setSuccess(`Attendance saved for "${eventName}" on ${new Date(eventDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}.`);
  };

  const fieldCls = "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:focus:ring-orange-400/40 transition";
  const presentCount = Object.values(present).filter(Boolean).length;

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl p-6 space-y-5">
        <div>
          <h2 className="font-passion text-xl text-zinc-900 dark:text-white mb-0.5">Mark Attendance</h2>
          <p className="text-xs text-zinc-500 dark:text-white/30">Select an event, date, and mark each member present or absent.</p>
        </div>

        {error   && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-300">{error}</div>}
        {success && <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-600 dark:text-emerald-300">{success}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-500 dark:text-white/35 uppercase tracking-wider">Event Name *</label>
            <input
              type="text"
              required
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g. Monthly Workshop"
              className={fieldCls}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-500 dark:text-white/35 uppercase tracking-wider">Event Date *</label>
            <input
              type="date"
              required
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className={fieldCls}
            />
          </div>
        </div>

        {/* Member list */}
        {loading ? (
          <div className="flex justify-center py-8"><Loader2 className="w-5 h-5 animate-spin text-orange-500 dark:text-orange-400" /></div>
        ) : members.length === 0 ? (
          <p className="text-sm text-zinc-400 dark:text-white/20 text-center py-8">No members found in profiles.</p>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-500 dark:text-white/30">{presentCount} / {members.length} marked present</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => toggleAll(true)}
                  className="text-[11px] text-emerald-500 dark:text-emerald-400 hover:text-emerald-600 dark:text-emerald-300 transition-colors px-2 py-1 rounded-lg hover:bg-emerald-500/10">
                  All present
                </button>
                <button type="button" onClick={() => toggleAll(false)}
                  className="text-[11px] text-red-500 dark:text-red-400 hover:text-red-600 dark:text-red-300 transition-colors px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10">
                  All absent
                </button>
              </div>
            </div>

            <div className="divide-y divide-white/[0.04] rounded-xl border border-white/[0.06] overflow-hidden">
              {members.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setPresent((p) => ({ ...p, [m.id]: !p[m.id] }))}
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
                    present[m.id] ? "bg-emerald-500/8 hover:bg-emerald-500/12" : "bg-white/[0.01] hover:bg-white/[0.04]"
                  }`}
                >
                  <div>
                    <p className="text-sm text-zinc-800 dark:text-white/80 font-medium">{m.full_name ?? "Unnamed"}</p>
                    <p className="text-[11px] text-zinc-500 dark:text-white/30">{[m.domain, m.department].filter(Boolean).join(" · ") || "—"}</p>
                  </div>
                  {present[m.id]
                    ? <CheckSquare size={18} className="text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
                    : <Square size={18} className="text-zinc-400 dark:text-white/20 flex-shrink-0" />
                  }
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving || !eventName.trim()}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(249,115,22,0.3)] transition-all duration-200"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          {saving ? "Saving…" : "Save Attendance"}
        </button>
      </div>
    </form>
  );
}

// ─── Blog Tab (existing functionality) ────────────────────────────────────────

function BlogTab() {
  const router = useRouter();
  const [title,       setTitle]   = useState("");
  const [slug,        setSlug]    = useState("");
  const [description, setDesc]    = useState("");
  const [content,     setContent] = useState("");
  const [file,        setFile]    = useState<File | null>(null);
  const [loading,     setLoading] = useState(false);
  const [error,       setError]   = useState<string | null>(null);

  const fieldCls = "w-full border border-white/[0.08] rounded-xl bg-white/[0.04] px-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:focus:ring-orange-400/40 transition";

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    if (!supabase) { setError("Supabase is not configured."); setLoading(false); return; }

    let imageUrl = "";
    if (file) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error: imgError } = await supabase.storage.from("blog-images").upload(fileName, file, { upsert: true });
      if (imgError) { setError("Image upload failed: " + imgError.message); setLoading(false); return; }
      const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);
      imageUrl = data?.publicUrl ?? "";
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: insertError } = await (supabase.from("blogs") as any).insert([
      { slug, title, description, content, imgsrc: imageUrl },
    ]);

    if (insertError) { setError("Error saving blog: " + insertError.message); setLoading(false); return; }
    setTitle(""); setSlug(""); setDesc(""); setContent(""); setFile(null);
    setLoading(false);
    router.push("/blogs");
  };

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl p-6 space-y-4">
      <div>
        <h2 className="font-passion text-xl text-zinc-900 dark:text-white mb-0.5">Publish Blog Post</h2>
        <p className="text-xs text-zinc-500 dark:text-white/30">Write and publish a new blog article.</p>
      </div>

      {error && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-300">{error}</div>}

      <form onSubmit={handleUpload} className="space-y-4">
        <input type="text" placeholder="Blog Title" value={title} required
          onChange={(e) => { setTitle(e.target.value); setSlug(generateSlug(e.target.value)); }}
          className={fieldCls} />
        <input type="text" placeholder="Slug" value={slug} required
          onChange={(e) => setSlug(e.target.value)}
          className={fieldCls} />
        <textarea placeholder="Short Description" value={description} required
          onChange={(e) => setDesc(e.target.value)}
          className={`${fieldCls} h-20 resize-none`} />
        <textarea placeholder="Full Content (Markdown or HTML)" value={content} required
          onChange={(e) => setContent(e.target.value)}
          className={`${fieldCls} h-52 resize-y font-mono text-xs`} />

        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-white/[0.06] border-dashed rounded-xl cursor-pointer hover:border-orange-400/30 hover:bg-orange-500/5 transition-all duration-150">
          <X size={20} className={`mb-1 ${file ? "text-orange-500 dark:text-orange-400" : "text-zinc-400 dark:text-white/20"}`} style={{ transform: file ? "rotate(0deg)" : "rotate(45deg)" }} />
          <p className="text-xs text-zinc-500 dark:text-white/30">{file ? `Selected: ${file.name}` : "Click to upload image"}</p>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="hidden" />
        </label>

        <button type="submit" disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-5 py-3 text-sm font-semibold text-white transition-all duration-200">
          {loading && <Loader2 size={14} className="animate-spin" />}
          {loading ? "Publishing…" : "Publish Blog Post"}
        </button>
      </form>
    </div>
  );
}