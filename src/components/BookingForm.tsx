"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Clock,
  Send,
  ChevronLeft,
  ChevronRight,
  Loader2,
  User,
  Mail,
  Building2,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";

/* ─── Step indicator data ─── */
const stepMeta = [
  { label: "Your Details", icon: User },
  { label: "Pick a Time", icon: CalendarIcon },
  { label: "Confirm", icon: CheckCircle2 },
];

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companySize, setCompanySize] = useState("1-10 Employees");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  const step1Valid = name.trim() && email.trim() && company.trim();
  const step2Valid = selectedDate && selectedTime;

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleConfirm = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          status: "Onboarding",
          agentStatus: "Offline",
          va: "Unassigned",
        }),
      });
      const text = await res.text();
      const data = JSON.parse(text);
      if (!res.ok) throw new Error(data.error || "Failed to submit booking");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setName("");
    setEmail("");
    setCompany("");
    setCompanySize("1-10 Employees");
    setSelectedDate(null);
    setSelectedTime(null);
    setSubmitted(false);
    setError("");
  };

  return (
    <section id="booking" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">

          {/* ── Section header ── */}
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 mb-6"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Get Started</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            >
              Book Your Discovery Call
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 max-w-xl mx-auto"
            >
              30 minutes. No commitment. We&apos;ll map your workflows and show you what your clone can do.
            </motion.p>
          </div>

          {/* ── Main card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-4xl overflow-hidden relative shadow-xl shadow-slate-200/50 border border-slate-200/80"
          >
            {/* Light background */}
            <div className="absolute inset-0 bg-linear-to-br from-white via-slate-50 to-indigo-50/30" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200/15 rounded-full blur-[100px]" />
            <div className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(100,116,139,0.4) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 grid md:grid-cols-[320px_1fr]">

              {/* ── Left sidebar ── */}
              <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-200/60">
                {/* Step indicators */}
                <div className="flex md:flex-col gap-4 md:gap-0 mb-8 md:mb-0">
                  {stepMeta.map((s, i) => {
                    const StepIcon = s.icon;
                    const isActive = step === i + 1;
                    const isDone = step > i + 1 || submitted;

                    return (
                      <div key={s.label} className="flex items-center md:items-start gap-3 flex-1 md:flex-none">
                        {/* Node + line */}
                        <div className="flex flex-col items-center">
                          <motion.div
                            animate={{
                              backgroundColor: isDone ? "#22c55e" : isActive ? "#6366f1" : "#f1f5f9",
                              borderColor: isDone ? "#22c55e" : isActive ? "#6366f1" : "#e2e8f0",
                              scale: isActive ? 1.1 : 1,
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="w-10 h-10 rounded-xl border-2 flex items-center justify-center shrink-0"
                          >
                            {isDone ? (
                              <svg viewBox="0 0 16 16" className="w-4 h-4">
                                <path d="M3,8 L7,12 L13,4" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
                              </svg>
                            ) : (
                              <StepIcon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                            )}
                          </motion.div>
                          {/* Connector line */}
                          {i < stepMeta.length - 1 && (
                            <div className="hidden md:block w-0.5 h-12 my-1.5 rounded-full overflow-hidden bg-slate-200">
                              <motion.div
                                className="w-full bg-green-500 rounded-full"
                                animate={{ height: isDone ? "100%" : "0%" }}
                                transition={{ duration: 0.4 }}
                              />
                            </div>
                          )}
                        </div>
                        {/* Label */}
                        <div className="hidden md:block mt-1.5">
                          <p className={`text-sm font-semibold transition-colors ${isActive ? "text-slate-900" : isDone ? "text-green-600" : "text-slate-400"}`}>
                            {s.label}
                          </p>
                          <p className="text-xs text-slate-400">
                            Step {i + 1} of 3
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Sidebar trust badges */}
                <div className="hidden md:block mt-auto pt-10 space-y-4">
                  {[
                    { icon: Shield, text: "Your data is encrypted & secure" },
                    { icon: Zap, text: "Response within 2 hours" },
                    { icon: Clock, text: "30-min call, no commitment" },
                  ].map((b) => (
                    <div key={b.text} className="flex items-center gap-2.5">
                      <b.icon className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-xs text-slate-500">{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right content ── */}
              <div className="p-8 md:p-10 min-h-120 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {/* ════ STEP 1: Details ════ */}
                  {step === 1 && (
                    <motion.div
                      key="s1"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">Tell us about yourself</h3>
                        <p className="text-sm text-slate-500">We&apos;ll use this to prepare your discovery session.</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <InputField icon={User} label="Full Name" value={name} onChange={setName} placeholder="John Doe" />
                        <InputField icon={Mail} label="Work Email" value={email} onChange={setEmail} placeholder="john@company.com" type="email" />
                        <InputField icon={Building2} label="Company" value={company} onChange={setCompany} placeholder="Acme Inc." />
                        <div className="space-y-1.5">
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 ml-1">
                            <Users className="w-3 h-3" />
                            Team Size
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {["1-10", "11-50", "51-200", "200+"].map((size) => (
                              <button
                                key={size}
                                onClick={() => setCompanySize(size)}
                                className={`py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                                  companySize === size
                                    ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm"
                                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={handleNext}
                        disabled={!step1Valid}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/25"
                      >
                        Continue
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  )}

                  {/* ════ STEP 2: Date & Time ════ */}
                  {step === 2 && (
                    <motion.div
                      key="s2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1">Pick a time that works</h3>
                        <p className="text-sm text-slate-500">All times are in EST. Sessions are 30 minutes.</p>
                      </div>

                      {/* Calendar */}
                      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-indigo-500" />
                            August 2026
                          </h4>
                          <div className="flex gap-1">
                            <button className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                              <ChevronLeft className="w-3.5 h-3.5 text-slate-500" />
                            </button>
                            <button className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                            </button>
                          </div>
                        </div>
                        {/* Day headers */}
                        <div className="grid grid-cols-7 gap-1.5 mb-2">
                          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                            <div key={i} className="text-center text-[10px] font-bold text-slate-400 py-1">{d}</div>
                          ))}
                        </div>
                        {/* Day grid */}
                        <div className="grid grid-cols-7 gap-1.5">
                          {days.map((d) => {
                            const isSelected = selectedDate === d;
                            const isWeekend = (d % 7 === 1) || (d % 7 === 0);
                            return (
                              <button
                                key={d}
                                onClick={() => !isWeekend && setSelectedDate(d)}
                                disabled={isWeekend}
                                className={`py-2 rounded-lg text-xs font-semibold transition-all relative ${
                                  isSelected
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                    : isWeekend
                                    ? "text-slate-300 cursor-not-allowed"
                                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-700"
                                }`}
                              >
                                {d}
                                {isSelected && (
                                  <motion.div layoutId="date-ring" className="absolute inset-0 rounded-lg ring-2 ring-indigo-400/50" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time slots */}
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-indigo-500" />
                          Available Times
                        </h4>
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                          {timeSlots.map((time) => {
                            const isSelected = selectedTime === time;
                            return (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 rounded-xl text-xs font-bold transition-all border relative ${
                                  isSelected
                                    ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm"
                                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300"
                                }`}
                              >
                                {time}
                                {isSelected && (
                                  <motion.div layoutId="time-ring" className="absolute inset-0 rounded-xl ring-2 ring-indigo-400/40" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={handlePrev}
                          className="py-3.5 rounded-2xl font-semibold text-sm text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleNext}
                          disabled={!step2Valid}
                          className="py-3.5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg shadow-indigo-500/25"
                        >
                          Review
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ════ STEP 3: Confirm / Success ════ */}
                  {step === 3 && (
                    <motion.div
                      key="s3"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="space-y-6"
                    >
                      {submitted ? (
                        /* ── Success state ── */
                        <div className="text-center py-6">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                          >
                            <motion.svg viewBox="0 0 24 24" className="w-10 h-10">
                              <motion.path
                                d="M4,12 L10,18 L20,6"
                                stroke="#22c55e" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                              />
                            </motion.svg>
                          </motion.div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">You&apos;re All Set!</h3>
                          <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">
                            We&apos;ll send a calendar invite to <span className="text-indigo-600 font-semibold">{email}</span> within 2 hours.
                          </p>
                          <SummaryCard {...{ name, company, companySize, selectedDate, selectedTime }} />
                          <button
                            onClick={handleReset}
                            className="mt-8 px-8 py-3 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all"
                          >
                            Book Another Call
                          </button>
                        </div>
                      ) : (
                        /* ── Review state ── */
                        <>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Review & Confirm</h3>
                            <p className="text-sm text-slate-500">Double-check everything, then hit confirm.</p>
                          </div>
                          <SummaryCard {...{ name, company, companySize, selectedDate, selectedTime, email }} />
                          {error && (
                            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600 font-medium">{error}</div>
                          )}
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              onClick={handlePrev}
                              disabled={submitting}
                              className="py-3.5 rounded-2xl font-semibold text-sm text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all disabled:opacity-30"
                            >
                              Back
                            </button>
                            <button
                              onClick={handleConfirm}
                              disabled={submitting}
                              className="py-3.5 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2 group shadow-lg shadow-green-500/25"
                            >
                              {submitting ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                              ) : (
                                <><Send className="w-4 h-4" /> Confirm Booking</>
                              )}
                            </button>
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Reusable input field ─── */

function InputField({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 ml-1">
        <Icon className="w-3 h-3" />
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-900 text-sm placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all shadow-sm"
      />
    </div>
  );
}

/* ─── Summary card ─── */

function SummaryCard({
  name,
  email,
  company,
  companySize,
  selectedDate,
  selectedTime,
}: {
  name: string;
  email?: string;
  company: string;
  companySize: string;
  selectedDate: number | null;
  selectedTime: string | null;
}) {
  const rows = [
    { label: "Name", value: name },
    ...(email ? [{ label: "Email", value: email }] : []),
    { label: "Company", value: `${company} (${companySize})` },
    { label: "Date", value: `August ${selectedDate}, 2026` },
    { label: "Time", value: selectedTime ?? "" },
  ];

  return (
    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center justify-between text-sm">
          <span className="text-slate-500">{r.label}</span>
          <span className="font-semibold text-slate-900">{r.value}</span>
        </div>
      ))}
    </div>
  );
}
