"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-4" : "py-6"
      }`}
    >
      <nav className="container mx-auto px-6">
        <div
          className={`glass rounded-full px-8 py-3 flex items-center justify-between transition-all duration-300 ${
            isScrolled ? "bg-white/60 shadow-lg" : "bg-white/30"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-400 floating group-hover:scale-110 transition-transform" />
            <span className="text-xl font-semibold tracking-tight text-slate-800">
              Hire Your Clone
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#services"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Services
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#booking"
              className="glass px-6 py-2 rounded-full text-sm font-semibold text-indigo-600 hover:bg-white/80 transition-all flex items-center gap-2 group"
            >
              Book Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <button className="md:hidden p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  );
}
