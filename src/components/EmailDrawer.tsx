"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Paperclip, Bold, Italic, Link, Sparkles, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

interface EmailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string | null;
  clientEmail: string | null;
}

type SendStatus = "idle" | "sending" | "success" | "error";

export default function EmailDrawer({ isOpen, onClose, clientName, clientEmail }: EmailDrawerProps) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<SendStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const reset = () => {
    setSubject("");
    setBody("");
    setStatus("idle");
    setErrorMsg("");
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 400); // wait for exit animation
  };

  const handleSend = async () => {
    if (!clientEmail || !subject.trim() || !body.trim()) return;
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: clientEmail, subject, body }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to send");
      }
      setStatus("success");
      setTimeout(handleClose, 1800);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const canSend = !!clientEmail && subject.trim().length > 0 && body.trim().length > 0 && status === "idle";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl glass-dark border-l border-white/10 z-50 p-10 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Email Client</h3>
                <p className="text-slate-400 text-sm font-medium">
                  Communicating with{" "}
                  <span className="text-white underline underline-offset-4">{clientName}</span>
                  {clientEmail && (
                    <span className="text-slate-500 ml-1">({clientEmail})</span>
                  )}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-3 glass rounded-2xl hover:bg-white/10 transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto pr-4 scrollbar-hide">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Drafting sync strategy..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:border-indigo-500 outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <button className="text-slate-500 hover:text-white transition-colors p-1"><Bold className="w-4 h-4" /></button>
                  <button className="text-slate-500 hover:text-white transition-colors p-1"><Italic className="w-4 h-4" /></button>
                  <button className="text-slate-500 hover:text-white transition-colors p-1"><Link className="w-4 h-4" /></button>
                  <div className="w-px h-4 bg-white/5 mx-2" />
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors group">
                    <Sparkles className="w-3 h-3 group-hover:scale-125 transition-transform" />
                    Generate with AI
                  </button>
                </div>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Start typing your message..."
                  className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-600 min-h-[300px] resize-none outline-none leading-relaxed"
                />
              </div>

              <div className="glass p-6 rounded-3xl bg-indigo-500/5 border-indigo-500/10 flex items-center justify-between group cursor-pointer hover:bg-indigo-500/10 transition-all">
                <div className="flex items-center gap-4">
                  <Paperclip className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">Campaign_Brief.pdf</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Selected as attachment</p>
                  </div>
                </div>
                <X className="w-4 h-4 text-slate-600 hover:text-white transition-colors" />
              </div>

              {/* Status messages */}
              {status === "success" && (
                <div className="flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl text-green-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium">Email sent successfully!</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="text-sm font-medium">{errorMsg}</span>
                </div>
              )}
            </div>

            <div className="pt-10 mt-auto flex items-center justify-between border-t border-white/5">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="" className="opacity-70" />
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white z-10">
                  +2
                </div>
              </div>
              <button
                onClick={handleSend}
                disabled={!canSend}
                className="px-10 py-4 bg-indigo-500 text-white rounded-2xl font-bold hover:shadow-2xl transition-all flex items-center gap-3 group disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    Sending
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Send Intel
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
