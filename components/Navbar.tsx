"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { useUser } from "@/lib/useUser";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_ITEMS = [
  { label: "Home",    href: "/" },
  { label: "About",   href: "/about" },
  { label: "Events",  href: "/events" },
  { label: "Blogs",   href: "/blogs" },
  { label: "Members", href: "/members" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
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
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 ${scrolled ? "shadow-sm" : ""}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-14 flex items-center justify-between gap-6">

          <Link href="/" className="flex-shrink-0 flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 group-hover:border-orange-400 transition-colors duration-200">
              <Image src="/branding/Copy of codezilla with fox black.png" alt="Codezilla" fill sizes="32px" className="object-contain dark:invert" priority />
            </div>
            <span className="font-passion text-lg text-zinc-900 dark:text-zinc-100 tracking-wide hidden sm:block group-hover:text-orange-500 transition-colors duration-200">
              CODEZILLA
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-md text-sm font-semibold transition-colors duration-150 ${active ? "text-orange-500" : "text-zinc-800 dark:text-zinc-200 hover:text-orange-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                >
                  {active && (
                    <motion.span layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/30"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!loading && (isMember ? (
              <Link href="/portal"
                className={`hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${pathname.startsWith("/portal") ? "bg-orange-500 text-white shadow-[0_4px_12px_rgba(249,115,22,0.35)]" : "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30 hover:bg-orange-100 dark:hover:bg-orange-500/20"}`}
              >
                {user?.user_metadata?.avatar_url ? (
                  <Image src={user.user_metadata.avatar_url} alt="avatar" width={18} height={18} className="rounded-full" />
                ) : (<LayoutDashboard size={13} />)}
                My Portal
              </Link>
            ) : (
              <Link href="/login"
                className="hidden md:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all duration-150 shadow-sm"
              >
                <LogIn size={12} /> Member login
              </Link>
            ))}
            <button onClick={() => setOpen((v) => !v)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}
            />
            <motion.nav key="drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", bounce: 0, duration: 0.35 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between px-5 h-14 border-b border-zinc-200 dark:border-zinc-800">
                <span className="font-passion text-base text-zinc-900 dark:text-zinc-100">CODEZILLA</span>
                <button onClick={() => setOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
                {NAV_ITEMS.map((item, i) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div key={item.href} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}>
                      <Link href={item.href}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${active ? "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30" : "text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                      >
                        {active && <span className="w-1 h-4 rounded-full bg-orange-500" />}
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                {!loading && isMember ? (
                  <Link href="/portal" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold">
                    <LayoutDashboard size={14} /> My Portal
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700">
                      <LogIn size={14} /> Member login
                    </Link>
                    <Link href="/recruit" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold">
                      Apply for membership
                    </Link>
                  </>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <div className="h-14" />
    </>
  );
}
