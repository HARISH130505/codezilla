"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import {
  Loader2, LogOut, IdCard, Calendar, Camera,
  User, Hash, Cpu, Building2, BookOpen, X, CheckCircle2, XCircle,
  ArrowLeft, Star, Zap, Shield, Copy, Check, TrendingUp,
} from "lucide-react";
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
  domain: string | null;
  position: string | null;
  department: string | null;
  skills: string[] | null;
  onboarding_complete: boolean | null;
};

type AttendanceRow = {
  id: string;
  event_name: string;
  event_date: string;
  present: boolean;
};

const DOMAINS = ["Technical", "Design", "Management & PR", "Content"];

const POSITIONS = [
  "Lead", "Co-Lead", "Technical-Lead",
  "Design-Lead", "Content-Lead", "Management & PR - Lead",
];

function getGreeting(name: string | null) {
  const h = new Date().getHours();
  const greet = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  const first = name?.split(" ")[0] ?? "there";
  return greet + ", " + first + " \uD83D\uDC4B";
}

function daysSince(dateStr: string | null) {
  if (!dateStr) return null;
  const diff = Date.now() - new Date(dateStr).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

type Badge = { icon: React.ElementType; label: string; color: string };
function getBadges(
  attendance: AttendanceRow[],
  skills: string[] | null,
  joinedAt: string | null,
): Badge[] {
  const badges: Badge[] = [];
  const pct =
    attendance.length > 0
      ? (attendance.filter((a) => a.present).length / attendance.length) * 100
      : 0;
  if (pct >= 90)
    badges.push({ icon: Star, label: "Perfect Attendance", color: "text-amber-400 bg-amber-400/10 border-amber-400/20" });
  else if (pct >= 75)
    badges.push({ icon: TrendingUp, label: "Consistent Member", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" });
  if ((skills?.length ?? 0) >= 5)
    badges.push({ icon: Zap, label: "Skill Builder", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" });
  const days = daysSince(joinedAt);
  if (days !== null && days >= 180)
    badges.push({ icon: Shield, label: "OG Member", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" });
  return badges;
}

export default function PortalPage() {
  const router = useRouter();
  const [loading,       setLoading]       = useState(true);
  const [saving,        setSaving]        = useState(false);
  const [profile,       setProfile]       = useState<Profile | null>(null);
  const [attendance,    setAttendance]    = useState<AttendanceRow[]>([]);
  const [avatarFile,    setAvatarFile]    = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error,         setError]         = useState<string | null>(null);
  const [success,       setSuccess]       = useState<string | null>(null);
  const [editMode,      setEditMode]      = useState(false);
  const [skillInput,    setSkillInput]    = useState("");
  const [copied,        setCopied]        = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!supabase) { setError("Supabase is not configured."); setLoading(false); return; }

      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) { router.replace("/login"); return; }

      const emailLower = (user.email ?? "").toLowerCase().trim();
      const [{ data: wl1 }, { data: wl2 }] = await Promise.all([
        supabase.from("allowed_emails").select("id").eq("email", emailLower).maybeSingle(),
        supabase.from("allowed_admins").select("id").eq("email", emailLower).maybeSingle(),
      ]);
      if (!wl1 && !wl2) {
        await supabase.auth.signOut();
        router.replace("/login");
        return;
      }

      const { data: rawData, error: profileError } = await supabase
        .from("profiles")
        .select("id, full_name, roll_number, year, joined_at, avatar_url, role, domain, position, department, skills, onboarding_complete")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) { setError(profileError.message); setLoading(false); return; }

      const data = rawData as Profile | null;
      if (!data || !data.onboarding_complete) {
        router.replace("/portal/onboarding");
        return;
      }

      setProfile({ ...data, role: (data.role as ProfileRole | null) ?? "member" });

      const { data: attData } = await supabase
        .from("attendance")
        .select("id, event_name, event_date, present")
        .eq("member_id", user.id)
        .order("event_date", { ascending: false });

      setAttendance((attData as AttendanceRow[]) ?? []);
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

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s || profile?.skills?.includes(s)) return;
    setProfile((p) => p ? { ...p, skills: [...(p.skills ?? []), s] } : p);
    setSkillInput("");
  };

  const removeSkill = (s: string) =>
    setProfile((p) => p ? { ...p, skills: (p.skills ?? []).filter((x) => x !== s) } : p);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!supabase || !profile) return;
    setSaving(true); setError(null); setSuccess(null);

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
      id:                  profile.id,
      full_name:           profile.full_name,
      roll_number:         profile.roll_number,
      year:                profile.year,
      joined_at:           profile.joined_at,
      avatar_url:          avatarUrl,
      role:                profile.role ?? "member",
      domain:              profile.domain,
      position:            profile.position,
      department:          profile.department,
      skills:              profile.skills ?? [],
      onboarding_complete: true,
    });

    setSaving(false);
    if (upsertError) { setError(upsertError.message); return; }
    setProfile((prev) => prev ? { ...prev, avatar_url: avatarUrl } : prev);
    setAvatarFile(null);
    setSuccess("Profile updated!");
    setEditMode(false);
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const copyRollNumber = () => {
    if (!profile?.roll_number) return;
    navigator.clipboard.writeText(profile.roll_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <Loader2 className="w-7 h-7 animate-spin text-orange-500 dark:text-orange-400" />
      </div>
    );
  }

  const displayAvatar   = avatarPreview ?? profile?.avatar_url;
  const roleLabel       = profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : "Member";
  const roleColor       =
    profile?.role === "admin"
      ? "bg-red-500/10 text-red-500 dark:text-red-400 border-red-200 dark:border-red-500/20"
      : profile?.role === "moderator"
      ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
      : "bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/20";
  const avatarRingColor =
    profile?.role === "admin" ? "ring-red-500/40"
    : profile?.role === "moderator" ? "ring-purple-500/40"
    : "ring-orange-500/40";

  const totalEvents   = attendance.length;
  const presentCount  = attendance.filter((a) => a.present).length;
  const attendancePct = totalEvents > 0 ? Math.round((presentCount / totalEvents) * 100) : null;
  const yearLabel     = profile?.year ? profile.year + (["st","nd","rd"][+profile.year - 1] ?? "th") + " Year" : null;
  const memberDays    = daysSince(profile?.joined_at ?? null);
  const badges        = getBadges(attendance, profile?.skills ?? null, profile?.joined_at ?? null);

  const fieldCls =
    "w-full rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] px-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/25 focus:outline-none focus:ring-2 focus:ring-orange-500/30 dark:focus:ring-orange-400/40 focus:border-orange-500/40 dark:focus:border-orange-400/50 transition";

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10 px-4 relative overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-orange-500/10 blur-3xl rounded-full" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 bg-amber-400/5 blur-3xl rounded-full" />

      <div className="relative max-w-2xl mx-auto space-y-6">

        {/* Top nav */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-white/30 hover:text-zinc-700 dark:hover:text-white/60 transition-colors">
              <ArrowLeft size={12} /> Back to site
            </Link>
            <span className="text-zinc-300 dark:text-white/10">·</span>
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 rounded overflow-hidden border border-orange-400/30">
                <Image src="/branding/Copy of codezilla with fox black.png" alt="Codezilla" fill sizes="20px" className="object-contain dark:invert" />
              </div>
              <span className="font-passion text-sm text-zinc-700 dark:text-white/60 tracking-wide">My Portal</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-white/[0.08] text-zinc-500 dark:text-white/40 hover:text-zinc-800 hover:dark:text-white/80 hover:border-zinc-300 dark:hover:border-white/20 text-xs font-medium transition-all duration-150"
          >
            <LogOut size={12} /> Sign out
          </button>
        </div>

        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ ...tx, delay: 0 }}>
          <h1 className="font-passion text-3xl md:text-4xl text-zinc-900 dark:text-white">
            {getGreeting(profile?.full_name ?? null)}
          </h1>
          <p className="text-sm text-zinc-400 dark:text-white/30 mt-1">
            {"Here\u2019s your Codezilla member dashboard."}
          </p>
        </motion.div>

        {error   && <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-600 dark:text-red-300">{error}</div>}
        {success && <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-600 dark:text-emerald-300">{success}</div>}

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ ...tx, delay: 0.05 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            {
              label: "Attendance",
              value: attendancePct !== null ? attendancePct + "%" : "\u2014",
              sub: totalEvents > 0 ? presentCount + "/" + totalEvents + " events" : "No records yet",
              color: attendancePct === null ? "text-zinc-400 dark:text-white/30"
                : attendancePct >= 75 ? "text-emerald-500 dark:text-emerald-400"
                : attendancePct >= 50 ? "text-amber-500 dark:text-amber-400"
                : "text-red-500 dark:text-red-400",
            },
            {
              label: "Skills",
              value: String(profile?.skills?.length ?? 0),
              sub: "added so far",
              color: "text-blue-500 dark:text-blue-400",
            },
            {
              label: "Days active",
              value: memberDays !== null ? String(memberDays) : "\u2014",
              sub: "since joining",
              color: "text-purple-500 dark:text-purple-400",
            },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-white/[0.02] shadow-sm dark:shadow-none p-4">
              <p className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-white/25 mb-1">{label}</p>
              <p className={"font-passion text-2xl " + color}>{value}</p>
              <p className="text-[10px] text-zinc-400 dark:text-white/20 mt-0.5">{sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Profile Card - view mode */}
        {!editMode && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ ...tx, delay: 0.08 }}
            className="rounded-2xl border border-zinc-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.04] backdrop-blur-xl shadow-sm dark:shadow-none p-6 space-y-5"
          >
            <div className="flex items-start gap-5">
              <div className={"relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 ring-2 " + avatarRingColor + " ring-offset-2 ring-offset-white dark:ring-offset-zinc-950"}>
                {displayAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={displayAvatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-white/[0.06]">
                    <User size={28} className="text-zinc-400 dark:text-white/20" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-passion text-2xl text-zinc-900 dark:text-white truncate">{profile?.full_name ?? "\u2014"}</h2>
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className={"inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider " + roleColor}>
                    <IdCard size={10} /> {roleLabel}
                  </span>
                  {(profile?.domain || profile?.position) && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-wider">
                      <Cpu size={10} /> {profile.domain || profile.position}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Detail grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Building2, label: "Department", value: profile?.department, copyable: false },
                { icon: Hash,       label: "Roll No.",   value: profile?.roll_number, copyable: true },
                { icon: Calendar,   label: "Year",       value: yearLabel, copyable: false },
                { icon: Calendar,   label: "Joined",     value: profile?.joined_at ? new Date(profile.joined_at).toLocaleDateString("en-IN", { year: "numeric", month: "short" }) : null, copyable: false },
              ].map(({ icon: Icon, label, value, copyable }) => (
                <div key={label} className="rounded-xl border border-zinc-100 dark:border-white/[0.06] bg-zinc-50 dark:bg-white/[0.02] p-3 group">
                  <p className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-orange-500 dark:text-orange-400/50 mb-1">
                    <Icon size={9} /> {label}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm text-zinc-700 dark:text-white/70 truncate">{value ?? "\u2014"}</p>
                    {copyable && value && (
                      <button onClick={copyRollNumber} className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400 dark:text-white/20 hover:text-orange-500 dark:hover:text-orange-400">
                        {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Badges */}
            {badges.length > 0 && (
              <div className="space-y-2">
                <p className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-white/25">Achievements</p>
                <div className="flex flex-wrap gap-2">
                  {badges.map(({ icon: Icon, label, color }) => (
                    <span key={label} className={"inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold " + color}>
                      <Icon size={11} /> {label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(profile?.skills?.length ?? 0) > 0 && (
              <div className="space-y-2">
                <p className="flex items-center gap-1 text-[9px] uppercase tracking-widest text-zinc-400 dark:text-white/25">
                  <BookOpen size={9} /> Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {profile!.skills!.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 rounded-full bg-orange-50 dark:bg-orange-500/15 border border-orange-200 dark:border-orange-500/25 px-2.5 py-0.5 text-[11px] text-orange-600 dark:text-orange-300 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => setEditMode(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.03] hover:bg-zinc-50 dark:hover:bg-white/[0.07] shadow-sm dark:shadow-none text-xs text-zinc-600 dark:text-white/50 hover:text-zinc-900 dark:hover:text-white/80 font-medium transition-all duration-150"
            >
              Edit profile
            </button>
          </motion.div>
        )}

        {/* Edit Profile - form mode */}
        {editMode && (
          <motion.form
            onSubmit={handleSave}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={tx}
            className="rounded-2xl border border-zinc-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.04] backdrop-blur-xl shadow-sm dark:shadow-none p-6 space-y-5"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-passion text-lg text-zinc-900 dark:text-white">Edit Profile</h3>
              <button type="button" onClick={() => setEditMode(false)}
                className="text-zinc-400 dark:text-white/30 hover:text-zinc-600 hover:dark:text-white/60 transition-colors">
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className={"relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 ring-2 " + avatarRingColor + " ring-offset-2 ring-offset-white dark:ring-offset-zinc-950"}>
                {displayAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={displayAvatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-white/[0.06]">
                    <User size={24} className="text-zinc-400 dark:text-white/20" />
                  </div>
                )}
              </div>
              <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs text-orange-500 dark:text-orange-400 hover:text-orange-600 hover:dark:text-orange-300 font-medium transition-colors">
                <Camera size={12} /> Change photo
                <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 dark:text-white/35 uppercase tracking-wider flex items-center gap-1">
                  <Cpu size={9} className="text-orange-500 dark:text-orange-400/70" />
                  {profile?.role === "admin" ? "Position" : "Domain"}
                </label>
                {profile?.role === "admin" ? (
                  <select value={profile?.position ?? ""} onChange={(e) => setProfile((p) => p ? { ...p, position: e.target.value } : p)} className={fieldCls + " appearance-none"}>
                    <option value="" className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Select position</option>
                    {POSITIONS.map((pos) => <option key={pos} value={pos} className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">{pos}</option>)}
                  </select>
                ) : (
                  <select value={profile?.domain ?? ""} onChange={(e) => setProfile((p) => p ? { ...p, domain: e.target.value } : p)} className={fieldCls + " appearance-none"}>
                    <option value="" className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">Select domain</option>
                    {DOMAINS.map((d) => <option key={d} value={d} className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">{d}</option>)}
                  </select>
                )}
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 dark:text-white/35 uppercase tracking-wider flex items-center gap-1">
                  <Building2 size={9} className="text-orange-500 dark:text-orange-400/70" /> Department
                </label>
                <input type="text" value={profile?.department ?? ""} onChange={(e) => setProfile((p) => p ? { ...p, department: e.target.value } : p)} placeholder="e.g. CSE" className={fieldCls} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-zinc-500 dark:text-white/35 uppercase tracking-wider flex items-center gap-1">
                <BookOpen size={9} className="text-orange-500 dark:text-orange-400/70" /> Skills
              </label>
              <div className="rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50 dark:bg-white/[0.04] p-3 space-y-2 focus-within:ring-2 focus-within:ring-orange-500/30 dark:focus-within:ring-orange-400/40 transition">
                {(profile?.skills?.length ?? 0) > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {profile!.skills!.map((s) => (
                      <span key={s} className="inline-flex items-center gap-1 rounded-full bg-orange-500/20 border border-orange-500/30 px-2.5 py-0.5 text-[11px] text-orange-600 dark:text-orange-300 font-medium">
                        {s}
                        <button type="button" onClick={() => removeSkill(s)} className="text-orange-500 dark:text-orange-400/60 hover:text-orange-600 hover:dark:text-orange-300">
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addSkill(); } }}
                  onBlur={addSkill}
                  placeholder="Type a skill and press Enter..."
                  className="w-full bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-white/25 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(249,115,22,0.3)] transition-all duration-200">
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? "Saving..." : "Save changes"}
              </button>
              <button type="button" onClick={() => setEditMode(false)}
                className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-white/[0.08] text-xs text-zinc-500 dark:text-white/40 hover:text-zinc-700 hover:dark:text-white/70 font-medium transition-all duration-150">
                Cancel
              </button>
            </div>
          </motion.form>
        )}

        {/* Attendance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...tx, delay: 0.12 }}
          className="rounded-2xl border border-zinc-200 dark:border-white/[0.07] bg-white dark:bg-white/[0.04] backdrop-blur-xl shadow-sm dark:shadow-none p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-passion text-lg text-zinc-900 dark:text-white">Attendance</h3>
            {attendancePct !== null && (
              <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 rounded-full bg-zinc-100 dark:bg-white/[0.06] overflow-hidden">
                  <div
                    className={"h-full rounded-full transition-all duration-700 " + (attendancePct >= 75 ? "bg-emerald-500" : attendancePct >= 50 ? "bg-amber-500" : "bg-red-500")}
                    style={{ width: attendancePct + "%" }}
                  />
                </div>
                <span className={"text-sm font-bold tabular-nums " + (attendancePct >= 75 ? "text-emerald-500 dark:text-emerald-400" : attendancePct >= 50 ? "text-amber-500 dark:text-amber-400" : "text-red-500 dark:text-red-400")}>
                  {attendancePct}%
                </span>
              </div>
            )}
          </div>

          {attendance.length === 0 ? (
            <div className="text-center py-8 space-y-2">
              <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-white/[0.04] flex items-center justify-center mx-auto">
                <Calendar size={18} className="text-zinc-300 dark:text-white/20" />
              </div>
              <p className="text-sm text-zinc-400 dark:text-white/25">No attendance records yet.</p>
              <p className="text-xs text-zinc-300 dark:text-white/15">Records appear after attending club events.</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-100 dark:divide-white/[0.04]">
              <div className="grid grid-cols-3 pb-2">
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-white/25">Event</span>
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-white/25">Date</span>
                <span className="text-[9px] uppercase tracking-widest text-zinc-400 dark:text-white/25 text-right">Status</span>
              </div>
              {attendance.map((a) => (
                <div key={a.id} className="grid grid-cols-3 py-2.5 items-center">
                  <span className="text-sm text-zinc-700 dark:text-white/70 truncate pr-2">{a.event_name}</span>
                  <span className="text-[11px] text-zinc-400 dark:text-white/35">
                    {new Date(a.event_date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                  <div className="flex justify-end">
                    {a.present ? (
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-500 dark:text-emerald-400 font-medium">
                        <CheckCircle2 size={12} /> Present
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-red-400 dark:text-red-400 font-medium">
                        <XCircle size={12} /> Absent
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <p className="text-[10px] text-zinc-300 dark:text-white/20 text-center pt-3">
                {presentCount} / {totalEvents} events attended
              </p>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}