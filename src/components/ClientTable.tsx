"use client";

import { useState } from "react";
import {
  Search, Filter, Mail, Eye, Trash2,
  CheckCircle2, CircleDashed, Brain, X, Pencil,
} from "lucide-react";
import { type Client } from "@/lib/clients";
import { cn } from "@/lib/utils";

interface ClientTableProps {
  clients: Client[];
  columns: string[];
  onAdd: (defaultStatus?: string) => void;
  onEdit: (client: Client) => void;
  onDelete: (id: number) => void;
  onEmail: (client: Client) => void;
}

export default function ClientTable({ clients, columns, onAdd, onEdit, onDelete, onEmail }: ClientTableProps) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterOpen, setFilterOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  const filtered = clients.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: number) => {
    onDelete(id);
    setConfirmDeleteId(null);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search clients, companies, emails…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-6 py-3 rounded-2xl glass border border-slate-200/50 outline-none focus:border-indigo-400 transition-all font-medium text-slate-600 text-sm"
          />
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen((v) => !v)}
              className={cn(
                "glass px-5 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all",
                filterStatus !== "all"
                  ? "bg-indigo-50 border border-indigo-200 text-indigo-600"
                  : "text-slate-500 hover:bg-white border border-transparent"
              )}
            >
              <Filter className="w-4 h-4" />
              {filterStatus === "all" ? "Filter" : filterStatus}
              {filterStatus !== "all" && (
                <button
                  onClick={(e) => { e.stopPropagation(); setFilterStatus("all"); }}
                  className="ml-1 text-indigo-400 hover:text-indigo-600"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </button>

            {filterOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-20">
                <button
                  onClick={() => { setFilterStatus("all"); setFilterOpen(false); }}
                  className={cn("w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50", filterStatus === "all" && "text-indigo-600 font-bold")}
                >
                  All Statuses
                </button>
                {columns.map((col) => (
                  <button
                    key={col}
                    onClick={() => { setFilterStatus(col); setFilterOpen(false); }}
                    className={cn("w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50", filterStatus === col && "text-indigo-600 font-bold")}
                  >
                    {col}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => onAdd()}
            className="bg-indigo-500 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg hover:bg-indigo-600 transition-colors"
          >
            Add Client
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass rounded-[2.5rem] overflow-hidden shadow-xl border border-white/20">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-white/30">
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Client</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Company</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Assigned VA</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Agent</th>
              <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-8 py-16 text-center text-sm text-slate-400 font-medium">
                  No clients found.{" "}
                  <button onClick={() => onAdd()} className="text-indigo-500 font-bold hover:underline">
                    Add one?
                  </button>
                </td>
              </tr>
            ) : (
              filtered.map((client) => (
                <tr
                  key={client.id}
                  className="group hover:bg-white/60 transition-colors border-b border-slate-100 last:border-0"
                >
                  {/* Client */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600 text-xs shrink-0">
                        {client.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{client.name}</p>
                        <p className="text-[11px] text-slate-400">{client.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-8 py-5 text-sm font-semibold text-slate-600">{client.company}</td>

                  {/* Status */}
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-bold uppercase tracking-wide bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                      {client.status}
                    </span>
                  </td>

                  {/* VA */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      {client.va}
                    </div>
                  </td>

                  {/* Agent */}
                  <td className="px-8 py-5">
                    {client.agentStatus === "Active" ? (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 border border-green-200 text-[10px] font-bold uppercase tracking-wide w-fit">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    ) : client.agentStatus === "Training" ? (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-200 text-[10px] font-bold uppercase tracking-wide w-fit">
                        <Brain className="w-3 h-3 animate-pulse" /> Training
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 text-slate-400 border border-slate-200 text-[10px] font-bold uppercase tracking-wide w-fit">
                        <CircleDashed className="w-3 h-3" /> Offline
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-5">
                    {confirmDeleteId === client.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-500 font-bold">Delete?</span>
                        <button
                          onClick={() => handleDelete(client.id)}
                          className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEmail(client)}
                          title="Send email"
                          className="p-2 glass text-indigo-500 hover:bg-white hover:shadow-md transition-all rounded-xl"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(client)}
                          title="Edit client"
                          className="p-2 glass text-slate-500 hover:bg-white hover:shadow-md transition-all rounded-xl"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(client.id)}
                          title="Delete client"
                          className="p-2 glass text-red-400 hover:bg-white hover:shadow-md transition-all rounded-xl"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Count */}
      <p className="text-xs text-slate-400 font-medium px-2">
        Showing {filtered.length} of {clients.length} client{clients.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
