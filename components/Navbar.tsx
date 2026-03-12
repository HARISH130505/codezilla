"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { useUser } from "@/lib/useUser";

const NAV_ITEMS = [
  { label: "Home",    href: "/" },
  { label: "About",   href: "/about" },
  { label: "Events",  href: "/events" },
  { label: "Blogs",   href: "/blogs" },
  { label: "Members", href: "/members" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isMember, loading } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Main bar ─────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_0_rgba(255,255,255,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-orange-400/30 group-hover:border-orange-400/70 transition-colors duration-200">
              <Image src="/branding/Copy of codezilla with fox black.png" alt="Codezilla" fill sizes="32px" className="object-contain" priority />
            </div>
            <span className="font-passion text-lg text-white tracking-wide hidden sm:block group-hover:text-orange-300 transition-colors duration-200">
              CODEZILLA
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-md text-sm font-medium transition-colors duration-150 ${
                    active ? "text-orange-300" : "text-white/60 hover:text-white/90"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-white/[0.07] border border-white/[0.09]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side — auth-aware CTA */}
          <div className="flex items-center gap-2.5">
            {!loading && (
              isMember ? (
                /* ── Logged-in member ── */
                <Link
                  href="/portal"
                  className={`hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                    pathname.startsWith("/portal")
                      ? "bg-orange-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.45)]"
                      : "bg-orange-500/10 text-orange-300 border border-orange-500/30 hover:bg-orange-500/20"
                  }`}
                >
                  {user?.user_metadata?.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url}
                      alt="avatar"
                      width={18}
                      height={18}
                      className="rounded-full"
                    />
                  ) : (
                    <LayoutDashboard size={13} />
                  )}
                  My Portal
                </Link>
              ) : (
                /* ── Guest ── */
                <Link
                  href="/login"
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/[0.1] bg-white/[0.05] text-white/70 text-xs font-medium hover:text-white hover:bg-white/[0.09] transition-all duration-150"
                >
                  <LogIn size={12} />
                  Member login
                </Link>
              )
            )}

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-zinc-950 border-l border-white/[0.06] flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-5 h-14 border-b border-white/[0.06]">
                <span className="font-passion text-base text-white">CODEZILLA</span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
                {NAV_ITEMS.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          active
                            ? "bg-orange-500/10 text-orange-300 border border-orange-500/20"
                            : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                        }`}
                      >
                        {active && <span className="w-1 h-4 rounded-full bg-orange-400" />}
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile auth CTA */}
              <div className="p-4 border-t border-white/[0.06] space-y-2">
                {!loading && isMember ? (
                  <Link
                    href="/portal"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-400 text-black text-sm font-bold"
                  >
                    <LayoutDashboard size={14} /> My Portal
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-white/[0.1] bg-white/[0.05] text-white/80 text-sm font-medium"
                    >
                      <LogIn size={14} /> Member login
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold"
                    >
                      Apply for membership
                    </Link>
                  </>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-14" />
    </>
  );
}
