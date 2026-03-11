"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

export type UserRole = "member" | "moderator" | "admin" | "guest";

export type AppUser = {
  user: User | null;
  role: UserRole;
  loading: boolean;
  isMember: boolean; // true for member / moderator / admin
};

export function useUser(): AppUser {
  const [user, setUser]       = useState<User | null>(null);
  const [role, setRole]       = useState<UserRole>("guest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }

    // Initial session check
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); return; }
      setUser(user);
      const role = await fetchRole(user.id);
      setRole(role);
      setLoading(false);
    });

    // Listen for auth state changes (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const u = session?.user ?? null;
        setUser(u);
        if (u) {
          const role = await fetchRole(u.id);
          setRole(role);
        } else {
          setRole("guest");
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, role, loading, isMember: role !== "guest" };
}

async function fetchRole(userId: string): Promise<UserRole> {
  if (!supabase) return "guest";
  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  const r = (data as { role?: string } | null)?.role;
  if (r === "admin")     return "admin";
  if (r === "moderator") return "moderator";
  if (r === "member")    return "member";
  // User is authenticated but has no profile row yet — treat as member
  return "member";
}
