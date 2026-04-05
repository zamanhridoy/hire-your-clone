"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Building2, Mail, Cpu, Briefcase } from "lucide-react";
import { type Client } from "@/lib/clients";
import { cn } from "@/lib/utils";

const VA_OPTIONS = ["Sarah M.", "Dave K.", "Elena R.", "James T.", "Priya N."];
const AGENT_STATUSES = ["Active", "Training", "Offline"] as const;

interface ClientModalProps {
  mode: "add" | "edit";
  client?: Client;
  defaultStatus?: string;
  columns: string[];
  onSave: (client: Client) => void;
  onClose: () => void;
}

const EMPTY: Omit<Client, "id"> = {
  name: "", company: "", email: "", va: VA_OPTIONS[0],
  status: "", agentStatus: "Training",
};

export default function ClientModal({
  mode, client, defaultStatus, columns, onSave, onClose,
}: ClientModalProps) {
  const [form, setForm] = useState<Omit<Client, "id">>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Client, string>>>({});

  useEffect(() => {
    if (mode === "edit" && client) {
      const { id: _, ...rest } = client;
      setForm(rest);
    } else {
      setForm({ ...EMPTY, status: defaultStatus ?? columns[0] ?? "" });
    }
    setErrors({});
  }, [mode, client, defaultStatus, columns]);

  const set = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.company.trim()) e.company = "Company is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      id: mode === "edit" && client ? client.id : Date.now(),
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim(),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {mode === "add" ? "Add Client" : "Edit Client"}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {mode === "add" ? "Fill in the details to add a new client." : "Update client information."}
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-8 py-6 space-y-5">
            {/* Name + Company */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Full Name" icon={User} error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Alice Johnson"
                  className={fieldCls(!!errors.name)}
                />
              </Field>
              <Field label="Company" icon={Building2} error={errors.company}>
                <input
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  placeholder="Aetheris Lab"
                  className={fieldCls(!!errors.company)}
                />
              </Field>
            </div>

            {/* Email */}
            <Field label="Email Address" icon={Mail} error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="alice@example.com"
                className={fieldCls(!!errors.email)}
              />
            </Field>

            {/* VA + Status */}
            <div className="grid grid-cols-2 gap-4">
              <Field label="Assigned VA" icon={Briefcase}>
                <select value={form.va} onChange={(e) => set("va", e.target.value)} className={fieldCls(false)}>
                  {VA_OPTIONS.map((va) => <option key={va}>{va}</option>)}
                </select>
              </Field>
              <Field label="Status" icon={Cpu}>
                <select value={form.status} onChange={(e) => set("status", e.target.value)} className={fieldCls(false)}>
                  {columns.map((col) => <option key={col}>{col}</option>)}
                </select>
              </Field>
            </div>

            {/* Agent Status */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 block">
                Agent Status
              </label>
              <div className="flex gap-2">
                {AGENT_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => set("agentStatus", s)}
                    className={cn(
                      "flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide border transition-all",
                      form.agentStatus === s
                        ? s === "Active" ? "bg-green-50 border-green-300 text-green-600"
                          : s === "Training" ? "bg-indigo-50 border-indigo-300 text-indigo-600"
                          : "bg-slate-100 border-slate-300 text-slate-600"
                        : "border-slate-200 text-slate-400 hover:border-slate-300"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-slate-100 bg-slate-50/50">
            <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 text-sm font-bold bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-100"
            >
              {mode === "add" ? "Add Client" : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function fieldCls(hasError: boolean) {
  return cn(
    "w-full px-3 py-2.5 text-sm text-slate-700 bg-white border rounded-xl outline-none transition-all",
    hasError ? "border-red-300 focus:border-red-400" : "border-slate-200 focus:border-indigo-400"
  );
}

function Field({ label, icon: Icon, error, children }: {
  label: string; icon: React.ElementType; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <Icon className="w-3 h-3" />
        {label}
      </label>
      {children}
      {error && <p className="text-[11px] text-red-500 font-medium">{error}</p>}
    </div>
  );
}
