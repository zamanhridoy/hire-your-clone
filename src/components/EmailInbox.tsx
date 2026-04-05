"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sanitizeHtml from "sanitize-html";
import {
  Inbox, Send, FileText, Trash2, Loader2, RefreshCw,
  ChevronLeft, X, Reply, Forward, AlertCircle,
  CheckCircle2, Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface EmailSummary {
  uid: number;
  seq: number;
  subject: string;
  from: { name: string; address: string };
  date: string | null;
  read: boolean;
}

interface EmailDetail extends EmailSummary {
  to: string;
  html: string | null;
  text: string;
}

interface Folder { id: string; label: string; icon: React.ElementType; imap: string }

// ── Helpers ───────────────────────────────────────────────────────────────────

const FOLDERS: Folder[] = [
  { id: "inbox",  label: "Inbox",  icon: Inbox,    imap: "INBOX"  },
  { id: "sent",   label: "Sent",   icon: Send,     imap: "Sent"   },
  { id: "drafts", label: "Drafts", icon: FileText,  imap: "Drafts" },
  { id: "trash",  label: "Trash",  icon: Trash2,   imap: "Trash"  },
];

function initials(str: string) {
  return str.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";
}

function fmtDate(raw: string | null) {
  if (!raw) return "";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return "";
  const now = new Date();
  return d.toDateString() === now.toDateString()
    ? d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString([], { month: "short", day: "numeric" });
}

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const text = await res.text();
  if (!text) throw new Error("Server returned empty response");
  let data: T & { error?: string };
  try { data = JSON.parse(text); }
  catch { throw new Error(text.slice(0, 200)); }
  if (!res.ok) throw new Error((data as { error?: string }).error || `Error ${res.status}`);
  return data;
}

// ── Compose ───────────────────────────────────────────────────────────────────

function ComposeModal({ onClose, initialTo = "", initialSubject = "" }: {
  onClose: () => void;
  initialTo?: string;
  initialSubject?: string;
}) {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!to.trim() || !subject.trim() || !body.trim()) return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, body }),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);
      setStatus("success");
      setTimeout(onClose, 1500);
    } catch (e) {
      setStatus("error");
      setError(e instanceof Error ? e.message : "Failed to send");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="fixed bottom-6 right-6 z-50 w-130 bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
    >
      <div className="flex items-center justify-between px-5 py-4 bg-slate-800 text-white">
        <span className="text-sm font-bold">New Message</span>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="To"
        className="w-full px-5 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none border-b border-slate-100"
      />
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        className="w-full px-5 py-3 text-sm text-slate-700 placeholder:text-slate-400 outline-none border-b border-slate-100"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your message..."
        className="flex-1 min-h-55 px-5 py-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none resize-none"
      />

      <div className="px-5 py-4 flex items-center justify-between border-t border-slate-100">
        {status === "success" && (
          <span className="flex items-center gap-1.5 text-green-600 text-xs font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Sent!
          </span>
        )}
        {status === "error" && (
          <span className="flex items-center gap-1.5 text-red-500 text-xs font-medium max-w-xs truncate">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {error}
          </span>
        )}
        {(status === "idle" || status === "sending") && <span />}

        <button
          onClick={handleSend}
          disabled={!to.trim() || !subject.trim() || !body.trim() || status === "sending"}
          className="px-6 py-2 bg-indigo-500 text-white text-sm font-bold rounded-xl hover:bg-indigo-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {status === "sending" && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Send
        </button>
      </div>
    </motion.div>
  );
}

// ── Email Reader ──────────────────────────────────────────────────────────────

function EmailReader({ email, onBack, onReply }: {
  email: EmailDetail;
  onBack: () => void;
  onReply: (to: string, subject: string) => void;
}) {
  const safeHtml = email.html
    ? sanitizeHtml(email.html, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "figure", "figcaption"]),
        allowedAttributes: { ...sanitizeHtml.defaults.allowedAttributes, "*": ["style", "class"] },
      })
    : null;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 shrink-0">
        <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h2 className="text-base font-bold text-slate-800 flex-1 truncate">{email.subject}</h2>
        <button
          onClick={() => onReply(email.from?.address ?? "", `Re: ${email.subject}`)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Reply className="w-3.5 h-3.5" /> Reply
        </button>
        <button
          onClick={() => onReply("", `Fwd: ${email.subject}`)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Forward className="w-3.5 h-3.5" /> Forward
        </button>
      </div>

      <div className="px-6 py-4 border-b border-slate-100 shrink-0">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0">
            {initials(email.from?.name || email.from?.address || "")}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm font-bold text-slate-800 truncate">
                {email.from?.name || email.from?.address}
              </span>
              <span className="text-xs text-slate-400 shrink-0">{fmtDate(email.date)}</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">To: {email.to}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {safeHtml ? (
          <div
            className="prose prose-sm max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        ) : (
          <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
            {email.text}
          </pre>
        )}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function EmailInbox() {
  const [activeFolder, setActiveFolder] = useState<Folder>(FOLDERS[0]);
  const [emails, setEmails] = useState<EmailSummary[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<EmailDetail | null>(null);
  const [listLoading, setListLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [listError, setListError] = useState("");
  const [composing, setComposing] = useState(false);
  const [composeDefaults, setComposeDefaults] = useState({ to: "", subject: "" });
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});

  const fetchMessages = useCallback(async (folder: Folder) => {
    setListLoading(true);
    setListError("");
    setSelectedEmail(null);
    try {
      const data = await apiFetch<{ messages: EmailSummary[]; total: number }>(
        `/api/email/messages?folder=${encodeURIComponent(folder.imap)}`
      );
      setEmails(data.messages ?? []);
      setUnreadCounts((prev) => ({
        ...prev,
        [folder.id]: (data.messages ?? []).filter((m) => !m.read).length,
      }));
    } catch (e) {
      setListError(e instanceof Error ? e.message : "Failed to load");
      setEmails([]);
    } finally {
      setListLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages(activeFolder);
  }, [activeFolder]); // eslint-disable-line react-hooks/exhaustive-deps

  const openEmail = async (summary: EmailSummary) => {
    setDetailLoading(true);
    setSelectedEmail({ ...summary, to: "", html: null, text: "" });
    try {
      const data = await apiFetch<EmailDetail>(
        `/api/email/message?uid=${summary.uid}&folder=${encodeURIComponent(activeFolder.imap)}`
      );
      setSelectedEmail({ ...summary, ...data });
      setEmails((prev) => prev.map((m) => m.uid === summary.uid ? { ...m, read: true } : m));
    } catch (e) {
      setSelectedEmail({
        ...summary, to: "", html: null,
        text: e instanceof Error ? `Failed to load: ${e.message}` : "Failed to load email.",
      });
    } finally {
      setDetailLoading(false);
    }
  };

  const openCompose = (to = "", subject = "") => {
    setComposeDefaults({ to, subject });
    setComposing(true);
  };

  const switchFolder = (folder: Folder) => {
    if (folder.id !== activeFolder.id) setActiveFolder(folder);
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] rounded-4xl overflow-hidden border border-slate-200/60 shadow-xl bg-white">

      {/* Folder sidebar */}
      <div className="w-52 shrink-0 bg-slate-50 border-r border-slate-100 flex flex-col py-4">
        <div className="px-3 mb-4">
          <button
            onClick={() => openCompose()}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-100 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Compose
          </button>
        </div>

        <nav className="flex-1 space-y-0.5 px-2">
          {FOLDERS.map((folder) => {
            const isActive = activeFolder.id === folder.id;
            const count = unreadCounts[folder.id] ?? 0;
            return (
              <button
                key={folder.id}
                onClick={() => switchFolder(folder)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors",
                  isActive ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                )}
              >
                <folder.icon className="w-4 h-4 shrink-0" />
                <span className="flex-1 text-left">{folder.label}</span>
                {count > 0 && (
                  <span className="text-[10px] font-bold bg-indigo-500 text-white rounded-full px-1.5 py-0.5 min-w-4.5 text-center">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-4 pt-3 border-t border-slate-100 mt-2">
          <p className="text-[10px] font-bold text-slate-400 truncate">
            {process.env.NEXT_PUBLIC_EMAIL_USER}
          </p>
        </div>
      </div>

      {/* Email list */}
      <div className={cn(
        "shrink-0 border-r border-slate-100 flex flex-col bg-white transition-all duration-300",
        selectedEmail ? "w-72" : "flex-1"
      )}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-800">{activeFolder.label}</h2>
          <button
            onClick={() => fetchMessages(activeFolder)}
            disabled={listLoading}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={cn("w-3.5 h-3.5", listLoading && "animate-spin")} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {listLoading ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-xs font-medium">Loading…</span>
            </div>
          ) : listError ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 px-6 text-center">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <p className="text-xs text-red-500 font-medium wrap-break-word">{listError}</p>
              <button onClick={() => fetchMessages(activeFolder)} className="text-xs text-indigo-500 font-bold hover:underline">
                Retry
              </button>
            </div>
          ) : emails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-400">
              <activeFolder.icon className="w-8 h-8 opacity-30" />
              <p className="text-xs font-medium">No messages</p>
            </div>
          ) : (
            <ul>
              {emails.map((email) => (
                <li key={email.uid}>
                  <button
                    onClick={() => openEmail(email)}
                    className={cn(
                      "w-full text-left px-5 py-4 border-b border-slate-50 transition-colors hover:bg-slate-50",
                      selectedEmail?.uid === email.uid && "bg-indigo-50 hover:bg-indigo-50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                        {initials(email.from?.name || email.from?.address || "")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-1 mb-0.5">
                          <span className={cn(
                            "text-xs truncate",
                            email.read ? "font-medium text-slate-600" : "font-bold text-slate-900"
                          )}>
                            {email.from?.name || email.from?.address || "Unknown"}
                          </span>
                          <span className="text-[10px] text-slate-400 shrink-0">{fmtDate(email.date)}</span>
                        </div>
                        <p className={cn(
                          "text-xs truncate",
                          email.read ? "text-slate-400" : "font-semibold text-slate-700"
                        )}>
                          {email.subject}
                        </p>
                        {!email.read && <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1" />}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Reading pane */}
      <AnimatePresence mode="wait">
        {selectedEmail ? (
          <motion.div
            key={selectedEmail.uid}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {detailLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-400" />
              </div>
            ) : (
              <EmailReader
                email={selectedEmail}
                onBack={() => setSelectedEmail(null)}
                onReply={(to, subject) => openCompose(to, subject)}
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 hidden lg:flex items-center justify-center flex-col gap-3 text-slate-300"
          >
            <Inbox className="w-12 h-12 opacity-30" />
            <p className="text-sm font-medium">Select an email to read</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compose modal */}
      <AnimatePresence>
        {composing && (
          <ComposeModal
            key="compose"
            initialTo={composeDefaults.to}
            initialSubject={composeDefaults.subject}
            onClose={() => setComposing(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
