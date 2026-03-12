"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { Loader2, LogOut, IdCard, Calendar, Camera, User, Hash } from "lucide-react";
import { motion, type Transition } from "framer-motion";

const tx: Transition = { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] };

type ProfileRole = "admin" | "moderator" | "member";

type Profile = {
  id: string;
  full_name: string | null;
  roll_number: string | null;
  year: string | null;
  joined_at: string | null;
  avatar_url: string | null;
  role: ProfileRole | null;
};

export default function PortalPage() {
  const router = useRouter();
  const [loading,       setLoading]       = useState(true);
  const [saving,        setSaving]        = useState(false);
  const [profile,       setProfile]       = useState<Profile | null>(null);
  const [avatarFile,    setAvatarFile]    = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error,         setError]         = useState<string | null>(null);
  const [success,       setSuccess]       = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!supabase) {
        setError("Supabase is not configured.");
        setLoading(false);
        return;
      }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) { router.replace("/login"); return; }

      const { data: rawData, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, roll_number, year, joined_at, avatar_url, role")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) { setError(profileError.message); setLoading(false); return; }

      const data = rawData as Profile | null;

      if (data) {
        setProfile({ ...data, role: (data.role as ProfileRole | null) ?? "member" });
      } else {
        setProfile({
          id: user.id,
          full_name: user.user_metadata?.full_name ?? null,
          roll_number: null,
          year: null,
          joined_at: new Date().toISOString(),
          avatar_url: null,
          role: "member",
        });
      }

      setLoading(false);
    };
    init();
  }, [router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabase || !profile) return;
    setSaving(true);
    setError(null);
    setSuccess(null);

    let avatarUrl = profile.avatar_url;

    if (avatarFile) {
      const fileName = `${profile.id}-${Date.now()}.${avatarFile.name.split(".").pop()}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatarFile, { upsert: true });

      if (uploadError) { setError(uploadError.message); setSaving(false); return; }

      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
      avatarUrl = urlData?.publicUrl ?? null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error: upsertError } = await (supabase.from("profiles") as any).upsert({
      id:          profile.id,
      full_name:   profile.full_name,
      roll_number: profile.roll_number,
      year:        profile.year,
      joined_at:   profile.joined_at,
      avatar_url:  avatarUrl,
      role:        profile.role ?? "member",
    });

    setSaving(false);
    if (upsertError) { setError(upsertError.message); return; }
    setProfile((prev) => prev ? { ...prev, avatar_url: avatarUrl } : prev);
    setAvatarFile(null);
    setSuccess("Profile saved!");
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <Loader2 className="w-7 h-7 animate-spin text-orange-400" />
      </div>
    );
  }

  const displayAvatar = avatarPreview ?? profile?.avatar_url;
  const roleLabel = profile?.role
    ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1)
    : "Member";
  const roleColor =
    profile?.role === "admin"
      ? "bg-red-500/10 text-red-400 border-red-500/20"
      : profile?.role === "moderator"
      ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
      : "bg-orange-500/10 text-orange-400 border-orange-500/20";

  const fieldCls =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-400/50 transition";

  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-4 relative overflow-hidden">
      {/* bg glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-orange-500/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-amber-400/08 blur-3xl rounded-full" />

      <div className="relative max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-orange-400/30">
              <Image src="/branding/Copy of codezilla with fox black.png" alt="Codezilla" fill sizes="28px" className="object-contain" />
            </div>
            <span className="font-passion text-base text-white/80 tracking-wide">My Portal</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-white/[0.08] text-white/40 hover:text-white/80 hover:border-white/20 text-xs font-medium transition-all duration-150"
          >
            <LogOut size={12} /> Sign out
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">{error}</div>
        )}
        {success && (
          <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-300">{success}</div>
        )}

        {/* Card */}
        <motion.form
          onSubmit={handleSave}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tx}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl p-6 space-y-6"
        >
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white/[0.06] border border-white/[0.1]">
              {displayAvatar ? (
                <Image src={displayAvatar} alt="Avatar" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User size={32} className="text-white/20" />
                </div>
              )}
            </div>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors">
              <Camera size={12} />
              Change photo
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </label>
            {/* Role badge */}
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${roleColor}`}>
              <IdCard size={10} /> {roleLabel}
            </span>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[10px] text-white/35 uppercase tracking-wider">
                <User size={10} className="text-orange-400/70" /> Full name
              </label>
              <input
                type="text"
                value={profile?.full_name ?? ""}
                onChange={(e) => setProfile((p) => p ? { ...p, full_name: e.target.value } : p)}
                placeholder="Your full name"
                className={fieldCls}
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[10px] text-white/35 uppercase tracking-wider">
                <Hash size={10} className="text-orange-400/70" /> Roll number
              </label>
              <input
                type="text"
                value={profile?.roll_number ?? ""}
                onChange={(e) => setProfile((p) => p ? { ...p, roll_number: e.target.value } : p)}
                placeholder="e.g. RA2111003010001"
                className={fieldCls}
              />
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[10px] text-white/35 uppercase tracking-wider">
                <Calendar size={10} className="text-orange-400/70" /> Year of study
              </label>
              <select
                value={profile?.year ?? ""}
                onChange={(e) => setProfile((p) => p ? { ...p, year: e.target.value } : p)}
                className={`${fieldCls} appearance-none`}
              >
                <option value="">Select year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-[10px] text-white/35 uppercase tracking-wider">
                <Calendar size={10} className="text-orange-400/70" /> Joined
              </label>
              <input
                type="text"
                readOnly
                value={
                  profile?.joined_at
                    ? new Date(profile.joined_at).toLocaleDateString("en-IN", {
                        year: "numeric", month: "short", day: "numeric",
                      })
                    : "—"
                }
                className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5 text-sm text-white/30 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Save */}
          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(249,115,22,0.35)] transition-all duration-200 active:scale-95"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            {saving ? "Saving…" : "Save profile"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
