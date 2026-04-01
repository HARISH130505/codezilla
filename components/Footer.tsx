import React from "react";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiMozilla } from "react-icons/si";


const SOCIALS = [
  { icon: FaInstagram, href: "https://www.instagram.com/codezillaclub/", label: "Instagram" },
  { icon: FaGithub, href: "https://github.com/CodezillaClub", label: "GitHub" },
  { icon: SiMozilla, href: "https://community.mozilla.org/de/groups/codezilla/", label: "Mozilla" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/codezillaclub/", label: "LinkedIn" },
  { icon: FaXTwitter, href: "https://x.com/CodezillaClub", label: "X" },
];

export default function Footer() {
  return (
    <footer className="relative bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/[0.05] overflow-hidden">
      {/* Subtle brand glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-orange-500/5 dark:bg-orange-500/10 blur-3xl rounded-full" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 rounded-md overflow-hidden border border-orange-400/30">
                <Image
                  src="/branding/Copy of codezilla with fox black.png"
                  alt="Codezilla"
                  fill
                  sizes="28px"
                  className="object-contain dark:invert"
                />
              </div>
              <span className="font-passion text-base text-zinc-900 dark:text-zinc-100 tracking-wide">CODEZILLA</span>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[250px] leading-relaxed">
                Mozilla Campus Club · SRMIST Ramapuram
              </p>
            </div>

          </div>



          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-white/[0.07] text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-300 hover:border-orange-500/30 dark:hover:border-orange-400/30 hover:bg-orange-500/5 dark:hover:bg-orange-500/10 transition-all duration-150"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Codezilla SRMIST. All rights reserved.
          </p>
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
            Built with Next.js · Supabase · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
