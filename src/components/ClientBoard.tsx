"use client";

import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Plus, MoreVertical, Brain, CheckCircle2, CircleDashed,
  User, Building2, Pencil, Check, X, Trash2, RotateCcw,
  AlertTriangle, Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { type Client } from "@/lib/clients";

// ── Types ─────────────────────────────────────────────────────────────────────

type DragState = { clientId: number; offsetX: number; offsetY: number; width: number } | null;
type UndoState = { column: string; index: number; clientIds: number[] } | null;

interface BoardProps {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  columns: string[];
  setColumns: React.Dispatch<React.SetStateAction<string[]>>;
  onAdd: (defaultStatus?: string) => void;
  onEdit: (client: Client) => void;
  onDelete: (id: number) => void;
  onEmail: (client: Client) => void;
}

const UNDO_MS = 5000;

export default function ClientBoard({
  clients, setClients, columns, setColumns, onAdd, onEdit, onDelete, onEmail,
}: BoardProps) {
  const [editingCol, setEditingCol] = useState<{ name: string; draft: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [undoState, setUndoState] = useState<UndoState>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [ghost, setGhost] = useState({ x: 0, y: 0, width: 0 });
  const dragState = useRef<DragState>(null);
  const columnRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const undoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Column management ──────────────────────────────────────────────────────

  const clearUndo = useCallback(() => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setUndoState(null);
  }, []);

  const commitRename = useCallback((oldName: string, draft: string) => {
    const newName = draft.trim();
    setEditingCol(null);
    if (!newName || newName === oldName) return;
    setColumns((prev) => prev.map((c) => (c === oldName ? newName : c)));
    setClients((prev) => prev.map((c) => c.status === oldName ? { ...c, status: newName } : c));
    columnRefs.current[newName] = columnRefs.current[oldName] ?? null;
    delete columnRefs.current[oldName];
  }, [setColumns, setClients]);

  const addColumn = useCallback(() => {
    const name = `Status ${Date.now()}`;
    setColumns((prev) => [...prev, name]);
    setEditingCol({ name, draft: "" });
  }, [setColumns]);

  const deleteColumn = useCallback((name: string) => {
    setColumns((prev) => {
      const index = prev.indexOf(name);
      const next = prev.filter((c) => c !== name);
      const fallback = next[0] ?? "";
      setClients((all) => {
        const affected = all.filter((c) => c.status === name).map((c) => c.id);
        if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
        setUndoState({ column: name, index, clientIds: affected });
        undoTimerRef.current = setTimeout(() => setUndoState(null), UNDO_MS);
        return all.map((c) => c.status === name ? { ...c, status: fallback } : c);
      });
      delete columnRefs.current[name];
      return next;
    });
    setConfirmDelete(null);
  }, [setColumns, setClients]);

  const undoDelete = useCallback(() => {
    if (!undoState) return;
    const { column, index, clientIds } = undoState;
    setColumns((prev) => { const n = [...prev]; n.splice(index, 0, column); return n; });
    setClients((prev) => prev.map((c) => clientIds.includes(c.id) ? { ...c, status: column } : c));
    clearUndo();
  }, [undoState, clearUndo, setColumns, setClients]);

  // ── Drag & drop ───────────────────────────────────────────────────────────

  const getColumnAtPoint = useCallback((x: number) => {
    for (const col of Object.keys(columnRefs.current)) {
      const el = columnRefs.current[col];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right) return col;
    }
    return null;
  }, []);

  const startDrag = useCallback((e: React.PointerEvent, client: Client) => {
    e.preventDefault();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    dragState.current = { clientId: client.id, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top, width: rect.width };
    setGhost({ x: rect.left, y: rect.top, width: rect.width });
    setDraggingId(client.id);

    const onMove = (ev: PointerEvent) => {
      if (!dragState.current) return;
      setGhost((g) => ({ ...g, x: ev.clientX - dragState.current!.offsetX, y: ev.clientY - dragState.current!.offsetY }));
      setActiveColumn(getColumnAtPoint(ev.clientX));
    };
    const onUp = (ev: PointerEvent) => {
      if (!dragState.current) return;
      const col = getColumnAtPoint(ev.clientX);
      if (col) {
        const id = dragState.current.clientId;
        setClients((prev) => prev.map((c) => c.id === id ? { ...c, status: col } : c));
      }
      dragState.current = null;
      setDraggingId(null);
      setActiveColumn(null);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [getColumnAtPoint, setClients]);

  const draggingClient = clients.find((c) => c.id === draggingId);
  const confirmDeleteCount = confirmDelete ? clients.filter((c) => c.status === confirmDelete).length : 0;

  return (
    <LayoutGroup>
      <div className="flex gap-5 overflow-x-auto pb-4 items-start">
        {columns.map((column) => (
          <div key={column} className="w-70 shrink-0 space-y-4">
            {/* Column header */}
            <div className="flex items-center justify-between px-3">
              {editingCol?.name === column ? (
                <div className="flex items-center gap-1.5 flex-1 mr-2">
                  <input
                    autoFocus
                    value={editingCol.draft}
                    onChange={(e) => setEditingCol({ name: column, draft: e.target.value })}
                    onKeyDown={(e) => { if (e.key === "Enter") commitRename(column, editingCol.draft); if (e.key === "Escape") setEditingCol(null); }}
                    onBlur={() => commitRename(column, editingCol.draft)}
                    className="text-sm font-bold uppercase tracking-widest text-slate-500 bg-white border border-indigo-300 rounded-lg px-2 py-0.5 w-full outline-none focus:ring-2 focus:ring-indigo-400/40"
                  />
                  <button onMouseDown={(e) => { e.preventDefault(); commitRename(column, editingCol.draft); }} className="text-green-500 hover:text-green-600"><Check className="w-3.5 h-3.5" /></button>
                  <button onMouseDown={(e) => { e.preventDefault(); setEditingCol(null); }} className="text-slate-400 hover:text-slate-600"><X className="w-3.5 h-3.5" /></button>
                </div>
              ) : confirmDelete === column ? (
                <div className="flex items-center gap-2 flex-1 mr-2">
                  <span className="text-[11px] font-bold text-red-500 uppercase tracking-wide">Delete &ldquo;{column}&rdquo;?</span>
                  <button onClick={() => deleteColumn(column)} className="text-[10px] font-bold bg-red-500 text-white px-2 py-0.5 rounded-lg hover:bg-red-600 transition-colors shrink-0">Delete</button>
                  <button onClick={() => setConfirmDelete(null)} className="text-slate-400 hover:text-slate-600 shrink-0"><X className="w-3.5 h-3.5" /></button>
                </div>
              ) : (
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 group/header min-w-0">
                  <div className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                  <span className="truncate">{column}</span>
                  <button onClick={() => setEditingCol({ name: column, draft: column })} className="opacity-0 group-hover/header:opacity-100 transition-opacity text-slate-300 hover:text-indigo-400 shrink-0"><Pencil className="w-3 h-3" /></button>
                  <button onClick={() => setConfirmDelete(column)} className="opacity-0 group-hover/header:opacity-100 transition-opacity text-slate-300 hover:text-red-400 shrink-0"><Trash2 className="w-3 h-3" /></button>
                </h3>
              )}
              <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full shrink-0">
                {clients.filter((c) => c.status === column).length}
              </span>
            </div>

            {/* Cards */}
            <motion.div
              layout
              ref={(el) => { columnRefs.current[column] = el; }}
              className={cn(
                "space-y-3 min-h-120 p-3 rounded-4xl transition-colors duration-200",
                activeColumn === column ? "bg-indigo-500/5 ring-2 ring-indigo-500/20" : "bg-transparent"
              )}
            >
              <AnimatePresence>
                {clients.filter((c) => c.status === column).map((client) => (
                  <KanbanCard
                    key={client.id}
                    client={client}
                    isDragging={draggingId === client.id}
                    onPointerDown={(e) => startDrag(e, client)}
                    onEdit={() => onEdit(client)}
                    onDelete={() => onDelete(client.id)}
                    onEmail={() => onEmail(client)}
                  />
                ))}
              </AnimatePresence>

              <button
                onClick={() => onAdd(column)}
                className="w-full py-3 border-2 border-dashed border-slate-200 rounded-3xl text-slate-300 hover:text-indigo-400 hover:border-indigo-200 transition-all flex items-center justify-center gap-2 group"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                <span className="text-xs font-bold uppercase tracking-widest">Add Client</span>
              </button>
            </motion.div>
          </div>
        ))}

        {/* Add Status */}
        <div className="w-50 shrink-0 pt-1">
          <button
            onClick={addColumn}
            className="w-full py-3 px-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-300 hover:text-indigo-400 hover:border-indigo-300 transition-all flex items-center justify-center gap-2 group"
          >
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Add Status</span>
          </button>
        </div>
      </div>

      {/* Ghost */}
      {draggingId && draggingClient && typeof document !== "undefined" && createPortal(
        <GhostCard client={draggingClient} x={ghost.x} y={ghost.y} width={ghost.width} />,
        document.body
      )}

      {/* Delete column modal */}
      {confirmDelete && typeof document !== "undefined" && createPortal(
        <DeleteModal
          column={confirmDelete}
          clientCount={confirmDeleteCount}
          onConfirm={() => deleteColumn(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />,
        document.body
      )}

      {/* Undo toast */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {undoState && (
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10001 flex items-center gap-3 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl"
            >
              <span className="text-sm font-medium">&ldquo;{undoState.column}&rdquo; deleted</span>
              <button onClick={undoDelete} className="flex items-center gap-1.5 text-indigo-300 hover:text-indigo-200 font-bold text-sm transition-colors">
                <RotateCcw className="w-3.5 h-3.5" /> Undo
              </button>
              <button onClick={clearUndo} className="text-slate-400 hover:text-white transition-colors ml-1"><X className="w-4 h-4" /></button>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </LayoutGroup>
  );
}

// ── Kanban Card ───────────────────────────────────────────────────────────────

function KanbanCard({ client, isDragging, onPointerDown, onEdit, onDelete, onEmail }: {
  client: Client;
  isDragging: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
  onEdit: () => void;
  onDelete: () => void;
  onEmail: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      layoutId={`card-${client.id}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isDragging ? 0.25 : 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.15 } }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      onPointerDown={onPointerDown}
      className="glass p-5 rounded-[1.75rem] border border-white/20 shadow-sm hover:shadow-xl transition-shadow cursor-grab active:cursor-grabbing bg-white/70 select-none relative"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-9 h-9 rounded-2xl bg-white border border-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs shadow-inner">
          {client.name.split(" ").map((n) => n[0]).join("")}
        </div>

        {/* Context menu */}
        <div className="relative" onPointerDown={(e) => e.stopPropagation()}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1.5 text-slate-300 hover:text-slate-600 transition-colors rounded-lg hover:bg-white/80"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-20">
                <button onClick={() => { onEmail(); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" /> Send Email
                </button>
                <button onClick={() => { onEdit(); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  <Pencil className="w-3.5 h-3.5 text-slate-400" /> Edit
                </button>
                <div className="h-px bg-slate-100 my-1" />
                <button onClick={() => { onDelete(); setMenuOpen(false); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-bold text-slate-800 tracking-tight">{client.name}</h4>
          <div className="flex items-center gap-1.5 mt-0.5 text-slate-400">
            <Building2 className="w-3 h-3" />
            <span className="text-[11px] font-medium">{client.company}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500">
            <User className="w-3 h-3" />
            <span className="text-[10px] font-bold uppercase tracking-tight">{client.va}</span>
          </div>
          <div>
            {client.agentStatus === "Active" ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : client.agentStatus === "Training" ? (
              <Brain className="w-4 h-4 text-indigo-400 animate-pulse" />
            ) : (
              <CircleDashed className="w-4 h-4 text-slate-300" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Ghost card ────────────────────────────────────────────────────────────────

function GhostCard({ client, x, y, width }: { client: Client; x: number; y: number; width: number }) {
  return (
    <div
      style={{ position: "fixed", left: x, top: y, width, pointerEvents: "none", zIndex: 9999, transform: "rotate(2deg) scale(1.05)", boxShadow: "0 30px 60px -12px rgb(0 0 0 / 0.25)" }}
      className="glass p-5 rounded-4xl border border-white/20 bg-white/90"
    >
      <div className="w-9 h-9 rounded-2xl bg-white border border-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs mb-3">
        {client.name.split(" ").map((n) => n[0]).join("")}
      </div>
      <p className="text-sm font-bold text-slate-800">{client.name}</p>
      <p className="text-[11px] text-slate-400 mt-0.5">{client.company}</p>
    </div>
  );
}

// ── Delete column modal ───────────────────────────────────────────────────────

function DeleteModal({ column, clientCount, onConfirm, onCancel }: {
  column: string; clientCount: number; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-10000 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm mx-4 flex flex-col gap-5"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Delete &ldquo;{column}&rdquo;?</h2>
            <p className="text-sm text-slate-500 mt-1">
              {clientCount > 0
                ? `${clientCount} client${clientCount > 1 ? "s" : ""} will move to the next status.`
                : "This status is empty and will be removed."}
            </p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm font-bold bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">Delete Status</button>
        </div>
      </motion.div>
    </div>
  );
}
