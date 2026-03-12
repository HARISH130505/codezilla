import React from "react";

import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiMozilla } from "react-icons/si";

const LINKS = [
  { label: "About",   href: "/about" },
  { label: "Events",  href: "/events" },
  { label: "Blogs",   href: "/blogs" },
  { label: "Members", href: "/members" },
  { label: "Contact", href: "/contact" },
  { label: "Portal",  href: "/portal" },
];

const SOCIALS = [
  { icon: FaInstagram,  href: "https://www.instagram.com/codezillaclub/",           label: "Instagram" },
  { icon: FaGithub,     href: "https://github.com/CodezillaClub",                   label: "GitHub" },
  { icon: SiMozilla,    href: "https://community.mozilla.org/de/groups/codezilla/", label: "Mozilla" },
  { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/codezillaclub/",    label: "LinkedIn" },
  { icon: FaXTwitter,   href: "https://x.com/CodezillaClub",                        label: "X" },
];

export default function Footer() {
  return (
    <footer className="relative bg-zinc-950 border-t border-white/[0.05] overflow-hidden">
      {/* Subtle brand glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-orange-500/10 blur-3xl rounded-full" />

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
                  className="object-contain"
                />
              </div>
              <span className="font-passion text-base text-white/90 tracking-wide">CODEZILLA</span>
            </div>
            <p className="text-xs text-white/35 max-w-[200px] leading-relaxed">
              Mozilla Campus Club · SRMIST Ramapuram
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-white/40 hover:text-orange-300 transition-colors duration-150"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.07] text-white/40 hover:text-orange-300 hover:border-orange-400/30 hover:bg-orange-500/10 transition-all duration-150"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-8 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-white/25">
            © {new Date().getFullYear()} Codezilla SRMIST. All rights reserved.
          </p>
          <p className="text-[11px] text-white/20">
            Built with Next.js · Supabase · Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
