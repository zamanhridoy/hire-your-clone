"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Cpu,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  RefreshCw,
  UserPlus,
  Zap,
  BookOpen,
} from "lucide-react";

interface DashboardData {
  stats: {
    totalClients: number;
    activeClones: number;
    training: number;
    offline: number;
    onboarding: number;
    activeClients: number;
  };
  recent: {
    id: number;
    name: string;
    company: string;
    status: string;
    agentStatus: string;
    createdAt: string;
  }[];
}

function timeAgo(date: string) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

const activityIcons: Record<string, typeof Users> = {
  Active: Zap,
  Onboarding: UserPlus,
  Training: BookOpen,
  Offline: Clock,
};

const activityColors: Record<string, string> = {
  Active: "text-green-400",
  Onboarding: "text-blue-400",
  Training: "text-amber-400",
  Offline: "text-slate-400",
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const s = data?.stats;

  const stats = [
    { label: "Active Clones", value: s ? String(s.activeClones) : "—", change: "+12.5%", icon: Cpu, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { label: "Total Clients", value: s ? String(s.totalClients) : "—", change: "+8.3%", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Onboarding", value: s ? String(s.onboarding) : "—", change: "-2.4%", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Training", value: s ? String(s.training) : "—", change: "+0.4%", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
  ];

  const pipelineStages = s ? [
    { label: "Onboarding Pipeline", count: s.onboarding, total: s.totalClients },
    { label: "Active Deployments", count: s.activeClients, total: s.totalClients },
    { label: "AI Agent Training", count: s.training, total: s.totalClients },
  ] : [];

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <div className="flex items-center gap-2 mb-2 p-1 px-3 glass rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">System Live</span>
           </div>
           <h1 className="text-4xl font-bold tracking-tight text-slate-900">Welcome, Admin.</h1>
           <p className="text-slate-500 font-medium">
             {s
               ? `${s.activeClones} clone${s.activeClones !== 1 ? "s" : ""} active across ${s.totalClients} client${s.totalClients !== 1 ? "s" : ""}.`
               : "Your clones are operating at peak efficiency today."}
           </p>
        </div>
        <div className="flex items-center gap-4">
           <div className="glass px-6 py-3 rounded-2xl flex flex-col items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Offline</span>
              <span className="text-sm font-bold text-indigo-500">{s?.offline ?? "—"}</span>
           </div>
           <Link href="/admin/bulk-email" className="px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:shadow-xl transition-all flex items-center gap-2 group">
              Start Campaign
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
           </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass p-6 rounded-3xl group cursor-default"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`${stat.bg} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="glass px-2 py-1 rounded-lg text-[10px] font-bold text-green-500 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 glass rounded-[2.5rem] p-10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50/50 blur-[100px] -z-10" />
              <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                Client Pipeline
                <span className="text-[10px] bg-indigo-100 text-indigo-500 px-2 py-0.5 rounded-full uppercase tracking-widest">Live</span>
              </h3>
              <div className="space-y-8">
                {pipelineStages.map((stage, i) => {
                  const pct = stage.total > 0 ? Math.round((stage.count / stage.total) * 100) : 0;
                  return (
                    <div key={stage.label} className="flex items-center gap-6 group">
                      <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-300 font-bold group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-bold text-slate-800">{stage.label}</span>
                          <span className="text-xs font-bold text-slate-400">{stage.count}/{stage.total} &mdash; {pct}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-indigo-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass rounded-[2.5rem] p-10 bg-slate-900 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-indigo-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Recent Activity</h3>
              <div className="space-y-6">
                {(!data?.recent || data.recent.length === 0) && (
                  <p className="text-sm text-slate-400 italic">No clients yet.</p>
                )}
                {data?.recent.map((client) => {
                  const Icon = activityIcons[client.status] ?? Users;
                  const iconColor = activityColors[client.status] ?? "text-indigo-400";
                  return (
                    <div key={client.id} className="flex items-center gap-4 relative">
                      <div className="w-10 h-10 rounded-full glass-dark flex items-center justify-center">
                        <Icon className={`w-4 h-4 ${iconColor}`} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white tracking-tight">{client.name}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 font-medium italic">
                          <Clock className="w-3 h-3" />
                          {timeAgo(client.createdAt)}
                          {client.company && <> &bull; {client.company}</>}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link href="/admin/clients" className="block w-full mt-12 py-4 glass-dark text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all border-white/5 text-center">
                View All Clients
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
