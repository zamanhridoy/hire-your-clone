"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, RefreshCw } from "lucide-react";
import ClientTable from "@/components/ClientTable";
import ClientBoard from "@/components/ClientBoard";
import ClientModal from "@/components/ClientModal";
import EmailDrawer from "@/components/EmailDrawer";
import { cn } from "@/lib/utils";
import { type Client } from "@/lib/clients";

type ModalState =
  | { open: false }
  | { open: true; mode: "add"; defaultStatus?: string }
  | { open: true; mode: "edit"; client: Client };

export default function ClientsPage() {
  const [view, setView] = useState<"list" | "board">("list");
  const [clients, setClients] = useState<Client[]>([]);
  const [columns, setColumns] = useState(["Onboarding", "Active", "Training", "Offline"]);
  const [modal, setModal] = useState<ModalState>({ open: false });
  const [email, setEmail] = useState<{ open: boolean; client: Client | null }>({ open: false, client: null });
  const [loading, setLoading] = useState(true);

  // ── Fetch clients from API ───────────────────────────────────────────────

  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch("/api/clients");
      const text = await res.text();
      const data = JSON.parse(text);
      if (data.clients) setClients(data.clients);
    } catch {
      // silent fail — keep existing state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  // ── CRUD (persisted to API) ──────────────────────────────────────────────

  const saveClient = async (client: Client) => {
    const exists = clients.find((c) => c.id === client.id);

    if (exists) {
      // Update
      setClients((prev) => prev.map((c) => (c.id === client.id ? client : c)));
      try {
        await fetch(`/api/clients/${client.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(client),
        });
      } catch {
        // rollback on failure
        fetchClients();
      }
    } else {
      // Add — client already has an id from the modal (Date.now())
      setClients((prev) => [...prev, client]);
      try {
        const res = await fetch("/api/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(client),
        });
        const text = await res.text();
        const data = JSON.parse(text);
        if (data.client) {
          // Replace the temp-id client with the server-assigned one
          setClients((prev) =>
            prev.map((c) => (c.id === client.id ? data.client : c))
          );
        }
      } catch {
        fetchClients();
      }
    }
  };

  const deleteClient = async (id: number) => {
    setClients((prev) => prev.filter((c) => c.id !== id));
    try {
      await fetch(`/api/clients/${id}`, { method: "DELETE" });
    } catch {
      fetchClients();
    }
  };

  const openAdd = (defaultStatus?: string) =>
    setModal({ open: true, mode: "add", defaultStatus });

  const openEdit = (client: Client) =>
    setModal({ open: true, mode: "edit", client });

  const openEmail = (client: Client) =>
    setEmail({ open: true, client });

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
            Client Intelligence
          </h1>
          <p className="text-slate-500 font-medium tracking-tight">
            Monitor performance, manage human VAs, and fine-tune AI logic across your client base.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => { setLoading(true); fetchClients(); }}
            title="Refresh clients"
            className={cn(
              "p-2.5 glass rounded-xl border border-slate-200/50 text-slate-400 hover:text-indigo-500 transition-all",
              loading && "animate-spin"
            )}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <div className="flex p-1.5 glass rounded-2xl border border-slate-200/50 bg-white/20">
            <button
              onClick={() => setView("list")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                view === "list" ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <List className="w-4 h-4" /> List View
            </button>
            <button
              onClick={() => setView("board")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                view === "board" ? "bg-indigo-500 text-white shadow-lg" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <LayoutGrid className="w-4 h-4" /> Board View
            </button>
          </div>
          <button
            onClick={() => openAdd()}
            className="bg-indigo-500 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-lg hover:bg-indigo-600 transition-colors"
          >
            + Add Client
          </button>
        </div>
      </div>

      {/* Views */}
      {loading ? (
        <div className="flex items-center justify-center py-32">
          <div className="flex flex-col items-center gap-4">
            <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin" />
            <p className="text-sm text-slate-400 font-medium">Loading clients…</p>
          </div>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {view === "list" ? (
            <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25 }}>
              <ClientTable
                clients={clients}
                columns={columns}
                onAdd={openAdd}
                onEdit={openEdit}
                onDelete={deleteClient}
                onEmail={openEmail}
              />
            </motion.div>
          ) : (
            <motion.div key="board" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.25 }}>
              <ClientBoard
                clients={clients}
                setClients={setClients}
                columns={columns}
                setColumns={setColumns}
                onAdd={openAdd}
                onEdit={openEdit}
                onDelete={deleteClient}
                onEmail={openEmail}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Add / Edit modal */}
      {modal.open && (
        <ClientModal
          mode={modal.mode}
          client={modal.mode === "edit" ? modal.client : undefined}
          defaultStatus={modal.mode === "add" ? modal.defaultStatus : undefined}
          columns={columns}
          onSave={saveClient}
          onClose={() => setModal({ open: false })}
        />
      )}

      {/* Email drawer */}
      <EmailDrawer
        isOpen={email.open}
        onClose={() => setEmail({ open: false, client: null })}
        clientName={email.client?.name ?? null}
        clientEmail={email.client?.email ?? null}
      />
    </div>
  );
}
