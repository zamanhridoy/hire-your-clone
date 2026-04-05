"use client";

import { motion } from "framer-motion";
import { Settings, Wrench } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-[2.5rem] p-16 text-center max-w-lg"
      >
        <div className="mx-auto w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6">
          <Settings className="w-8 h-8 text-indigo-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
          Settings
        </h1>
        <div className="flex items-center justify-center gap-2 mb-4">
          <Wrench className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Under Development
          </span>
        </div>
        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">
          Configure your account, notifications, and system preferences.
          This feature is currently being built and will be available soon.
        </p>
        <Link
          href="/admin/dashboard"
          className="inline-block px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:shadow-xl transition-all"
        >
          Back to Dashboard
        </Link>
      </motion.div>
    </div>
  );
}
