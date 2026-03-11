"use client";

import React, { useState } from "react";
import { motion, type Transition } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa6";

const tx = (delay = 0): Transition => ({
  duration: 0.55,
  ease: [0.25, 0.46, 0.45, 0.94],
  delay,
});

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: tx(delay),
});

const INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "codezillaclub@gmail.com",
    href: "mailto:codezillaclub@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 74981 33608",
    href: "tel:+917498133608",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "SRMIST Ramapuram, Chennai",
    href: "https://maps.google.com/?q=SRMIST+Ramapuram",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  const inputCls =
    "w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-400/40 focus:border-orange-300 transition";

  return (
    <div className="bg-[#fafaf9] min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.03) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-56 bg-orange-400/10 blur-3xl rounded-full" />
        <div className="relative max-w-3xl mx-auto px-5 md:px-8 text-center">
          <motion.div {...fade(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/60 bg-orange-50 px-3 py-1 text-[11px] font-semibold text-orange-600 uppercase tracking-widest mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              Get in touch
            </span>
          </motion.div>
          <motion.h1 {...fade(0.07)} className="font-passion text-5xl md:text-7xl text-zinc-900 leading-[1.05] mb-5">
            Talk to <span className="text-orange-500">us.</span>
          </motion.h1>
          <motion.p {...fade(0.14)} className="text-base md:text-lg text-zinc-500 max-w-xl mx-auto">
            Have a question, want to collaborate, or just want to say hi? Drop us a message and
            we&apos;ll get back to you quickly.
          </motion.p>
        </div>
      </section>

      {/* Split layout */}
      <section className="max-w-5xl mx-auto px-5 md:px-8 pb-24 md:pb-32 grid md:grid-cols-2 gap-10">

        {/* Left — info */}
        <motion.div {...fade(0)} className="space-y-8">
          <div className="space-y-4">
            {INFO.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl border border-zinc-200/70 bg-white p-4 hover:border-orange-200 hover:shadow-sm transition-all duration-200 group"
              >
                <div className="w-9 h-9 flex-shrink-0 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                  <Icon size={15} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-[11px] text-zinc-400 uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-zinc-800">{value}</p>
                </div>
              </a>
            ))}
          </div>

          <div>
            <p className="text-[11px] text-zinc-400 uppercase tracking-wider mb-3">Follow us</p>
            <div className="flex gap-3">
              {[
                { icon: FaInstagram, href: "https://www.instagram.com/codezillaclub/", label: "Instagram" },
                { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/codezillaclub/", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 hover:text-orange-500 hover:border-orange-200 transition-all duration-150"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right — form */}
        <motion.div {...fade(0.1)}>
          {sent ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center space-y-3">
              <p className="text-3xl">✅</p>
              <p className="font-semibold text-emerald-800">Message sent!</p>
              <p className="text-sm text-emerald-600">
                We&apos;ll get back to you at <strong>{form.email}</strong> soon.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-zinc-200/70 bg-white p-6 space-y-4 shadow-sm"
            >
              <h3 className="font-semibold text-zinc-800 text-sm mb-1">Send a message</h3>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-500 uppercase tracking-wider">Name</label>
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-500 uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputCls}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-zinc-500 uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={handleChange}
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(249,115,22,0.3)] transition-all duration-200 active:scale-95"
              >
                <Send size={14} />
                Send message
              </button>
            </form>
          )}
        </motion.div>
      </section>
    </div>
  );
}
