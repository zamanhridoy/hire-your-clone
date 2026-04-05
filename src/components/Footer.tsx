"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Book a Call", href: "#booking" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

const contactInfo = [
  { icon: Mail, label: "hello@hireyourclone.com" },
  { icon: MapPin, label: "Remote — Global" },
  { icon: Clock, label: "Mon – Fri, 9am – 6pm EST" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* ── Top CTA banner ── */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-[100px]" />

        <div className="relative z-10 container mx-auto px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              Ready to Scale Yourself?
            </h2>
            <p className="text-indigo-200/60 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Book a free discovery call. We&apos;ll map your workflows, show you what your clone can do, and build a plan — no commitment required.
            </p>
            <motion.a
              href="#booking"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-indigo-50 transition-colors shadow-2xl shadow-black/20 group"
            >
              Book Your Free Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="bg-slate-950 border-t border-white/5">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

            {/* Brand column */}
            <div className="md:col-span-5">
              <Link href="/" className="flex items-center gap-3 group mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-400 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20" />
                <span className="text-xl font-bold tracking-tight text-white">Hire Your Clone</span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-8">
                The hybrid workforce of the future. Custom AI agents trained on your data, managed by expert human VAs to guarantee precision.
              </p>

              {/* Contact info */}
              <div className="space-y-3">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-center gap-3 text-sm text-slate-500">
                    <c.icon className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav column */}
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Navigate</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal column */}
            <div className="md:col-span-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="border-t border-white/5">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-600 font-medium">
                &copy; {new Date().getFullYear()} Hire Your Clone Inc. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span>All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
