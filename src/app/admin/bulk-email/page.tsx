"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Upload,
  Plus,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Users,
  FileSpreadsheet,
  Keyboard,
} from "lucide-react";

interface Client {
  id: number;
  name: string;
  email: string;
  company: string;
  status: string;
}

interface SendResult {
  email: string;
  status: "sent" | "failed";
  error?: string;
}

type SourceTab = "clients" | "csv" | "manual";

export default function BulkEmailPage() {
  /* ── Recipients state ── */
  const [sourceTab, setSourceTab] = useState<SourceTab>("clients");
  const [recipients, setRecipients] = useState<string[]>([]);
  const [manualInput, setManualInput] = useState("");

  /* ── Client picker state ── */
  const [clients, setClients] = useState<Client[]>([]);
  const [clientsLoading, setClientsLoading] = useState(false);
  const [selectedClientIds, setSelectedClientIds] = useState<Set<number>>(new Set());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  /* ── Email content ── */
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  /* ── Send state ── */
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState<SendResult[] | null>(null);
  const [error, setError] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Load clients ── */
  useEffect(() => {
    setClientsLoading(true);
    fetch("/api/clients")
      .then((r) => r.json())
      .then((data) => setClients(Array.isArray(data.clients) ? data.clients : Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setClientsLoading(false));
  }, []);

  /* ── Filtered clients ── */
  const statuses = ["All", ...Array.from(new Set(clients.map((c) => c.status)))];

  const filteredClients = clients.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  /* ── Derive final recipients list ── */
  const finalRecipients = (() => {
    if (sourceTab === "clients") {
      return clients
        .filter((c) => selectedClientIds.has(c.id))
        .map((c) => c.email);
    }
    return recipients;
  })();

  const canSend =
    finalRecipients.length > 0 && subject.trim() && body.trim() && !sending;

  /* ── Toggle client selection ── */
  const toggleClient = (id: number) => {
    setSelectedClientIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAllFiltered = () => {
    const filteredIds = filteredClients.map((c) => c.id);
    const allSelected = filteredIds.every((id) => selectedClientIds.has(id));
    setSelectedClientIds((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        filteredIds.forEach((id) => next.delete(id));
      } else {
        filteredIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  /* ── CSV parsing ── */
  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const emails = parseCsvEmails(text);
      setRecipients((prev) => dedupe([...prev, ...emails]));
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  /* ── Manual add ── */
  const addManualEmails = () => {
    const emails = manualInput
      .split(/[,;\n]+/)
      .map((e) => e.trim())
      .filter((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
    if (emails.length) {
      setRecipients((prev) => dedupe([...prev, ...emails]));
      setManualInput("");
    }
  };

  const removeRecipient = (email: string) => {
    setRecipients((prev) => prev.filter((e) => e !== email));
  };

  /* ── Send ── */
  const handleSend = async () => {
    setSending(true);
    setError("");
    setResults(null);

    try {
      const res = await fetch("/api/send-bulk-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipients: finalRecipients,
          subject: subject.trim(),
          body: body.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setRecipients([]);
    setSelectedClientIds(new Set());
    setManualInput("");
    setSubject("");
    setBody("");
    setResults(null);
    setError("");
  };

  const sentCount = results?.filter((r) => r.status === "sent").length ?? 0;
  const failedCount = results?.filter((r) => r.status === "failed").length ?? 0;

  return (
    <div className="space-y-8 pb-4">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
          Bulk Email
        </h1>
        <p className="text-slate-500 font-medium tracking-tight">
          Send emails to multiple recipients — from your clients, a CSV file, or
          typed manually.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
        {/* ══════ LEFT: Recipients ══════ */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* Source tabs */}
          <div className="flex border-b border-slate-100">
            {([
              { id: "clients" as const, icon: Users, label: "Clients" },
              { id: "csv" as const, icon: FileSpreadsheet, label: "CSV" },
              { id: "manual" as const, icon: Keyboard, label: "Manual" },
            ]).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSourceTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-xs font-semibold transition-colors border-b-2 ${
                  sourceTab === tab.id
                    ? "border-indigo-500 text-indigo-600 bg-indigo-50/50"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {/* ── Clients tab ── */}
            {sourceTab === "clients" && (
              <div className="space-y-3">
                {/* Search */}
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, or company..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />

                {/* Status filter */}
                <div className="flex flex-wrap gap-1.5">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        statusFilter === s
                          ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                          : "bg-white border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                {/* Select all / count */}
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-500">
                    {selectedClientIds.size} selected
                    {filteredClients.length !== clients.length &&
                      ` · ${filteredClients.length} shown`}
                  </p>
                  <button
                    onClick={selectAllFiltered}
                    disabled={filteredClients.length === 0}
                    className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {filteredClients.length > 0 &&
                    filteredClients.every((c) => selectedClientIds.has(c.id))
                      ? "Deselect Shown"
                      : "Select Shown"}
                  </button>
                </div>

                {clientsLoading ? (
                  <div className="flex items-center justify-center py-10 text-slate-400">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                ) : filteredClients.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-10">
                    {clients.length === 0
                      ? "No clients found."
                      : "No clients match your search."}
                  </p>
                ) : (
                  <div className="max-h-72 overflow-y-auto space-y-1.5 pr-1">
                    {filteredClients.map((c) => {
                      const selected = selectedClientIds.has(c.id);
                      return (
                        <button
                          key={c.id}
                          onClick={() => toggleClient(c.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                            selected
                              ? "bg-indigo-50 border border-indigo-200"
                              : "hover:bg-slate-50 border border-transparent"
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                              selected
                                ? "bg-indigo-500 border-indigo-500"
                                : "border-slate-300"
                            }`}
                          >
                            {selected && (
                              <svg viewBox="0 0 12 12" className="w-3 h-3">
                                <path
                                  d="M2.5,6 L5,8.5 L9.5,3.5"
                                  stroke="white"
                                  strokeWidth="2"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-semibold text-slate-800 truncate">
                              {c.name}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              {c.email}
                              {c.company ? ` · ${c.company}` : ""}
                            </p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            c.status === "Active" ? "bg-green-50 text-green-600" :
                            c.status === "Training" ? "bg-amber-50 text-amber-600" :
                            c.status === "Onboarding" ? "bg-blue-50 text-blue-600" :
                            "bg-slate-100 text-slate-500"
                          }`}>
                            {c.status}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ── CSV tab ── */}
            {sourceTab === "csv" && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Upload a CSV file with an <strong>email</strong> column. We'll
                  extract all valid email addresses automatically.
                </p>

                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv,.txt"
                  onChange={handleCsvUpload}
                  className="hidden"
                />

                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full py-8 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-indigo-300 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all flex flex-col items-center gap-2"
                >
                  <Upload className="w-6 h-6" />
                  <span className="text-sm font-semibold">
                    Click to upload CSV
                  </span>
                  <span className="text-xs">or drag & drop</span>
                </button>

                {recipients.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-500">
                      {recipients.length} email(s) loaded
                    </p>
                    <RecipientPills
                      emails={recipients}
                      onRemove={removeRecipient}
                    />
                  </div>
                )}
              </div>
            )}

            {/* ── Manual tab ── */}
            {sourceTab === "manual" && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Type or paste email addresses separated by commas, semicolons,
                  or new lines.
                </p>
                <textarea
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                  placeholder={"john@example.com\njane@company.com\nbob@work.io"}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none resize-none transition-all"
                />
                <button
                  onClick={addManualEmails}
                  disabled={!manualInput.trim()}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-600 font-semibold text-xs hover:bg-indigo-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add to List
                </button>

                {recipients.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-slate-500">
                      {recipients.length} email(s) added
                    </p>
                    <RecipientPills
                      emails={recipients}
                      onRemove={removeRecipient}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ══════ RIGHT: Compose + Send ══════ */}
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800 mb-1">
              Compose Email
            </h3>
            <p className="text-xs text-slate-400">
              This will be sent to{" "}
              <span className="font-semibold text-indigo-500">
                {finalRecipients.length}
              </span>{" "}
              recipient{finalRecipients.length !== 1 ? "s" : ""}.
            </p>
          </div>

          <div className="p-5 flex-1 space-y-4">
            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500">
                Subject
              </label>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Important update from Hire Your Clone"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>

            {/* Body */}
            <div className="space-y-1.5 flex-1">
              <label className="text-xs font-semibold text-slate-500">
                Body
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your email content here..."
                rows={10}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none resize-none transition-all"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-600">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}

            {/* Results */}
            {results && (
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-bold text-green-700">
                      {sentCount} sent
                    </span>
                  </div>
                  {failedCount > 0 && (
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-bold text-red-600">
                        {failedCount} failed
                      </span>
                    </div>
                  )}
                </div>

                {failedCount > 0 && (
                  <div className="space-y-1">
                    {results
                      .filter((r) => r.status === "failed")
                      .map((r) => (
                        <div
                          key={r.email}
                          className="text-xs text-red-500 px-3 py-1.5 bg-red-50 rounded-lg"
                        >
                          {r.email}: {r.error}
                        </div>
                      ))}
                  </div>
                )}

                <button
                  onClick={handleReset}
                  className="text-xs font-semibold text-indigo-500 hover:text-indigo-700 transition-colors"
                >
                  Send another batch
                </button>
              </div>
            )}
          </div>

          {/* Send button */}
          {!results && (
            <div className="p-5 border-t border-slate-100">
              <button
                onClick={handleSend}
                disabled={!canSend}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                {sending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending to {finalRecipients.length} recipient
                    {finalRecipients.length !== 1 ? "s" : ""}...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send to {finalRecipients.length} Recipient
                    {finalRecipients.length !== 1 ? "s" : ""}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Recipient pills ── */

function RecipientPills({
  emails,
  onRemove,
}: {
  emails: string[];
  onRemove: (e: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
      {emails.map((email) => (
        <span
          key={email}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-xs text-indigo-700 font-medium"
        >
          {email}
          <button
            onClick={() => onRemove(email)}
            className="text-indigo-400 hover:text-red-500 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  );
}

/* ── CSV parser — extracts emails from any column ── */

function parseCsvEmails(text: string): string[] {
  const emailRegex = /[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+/g;
  const matches = text.match(emailRegex) || [];
  return dedupe(matches.map((e) => e.toLowerCase()));
}

function dedupe(arr: string[]): string[] {
  return [...new Set(arr)];
}
