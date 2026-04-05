"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Cpu,
  Mail,
  Mails,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Users, label: "Clients", href: "/admin/clients" },
  { icon: Cpu, label: "AI Agents", href: "/admin/agents" },
  { icon: Mail, label: "Email", href: "/admin/email" },
  { icon: Mails, label: "Bulk Email", href: "/admin/bulk-email" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-screen glass border-r border-white/20 transition-all duration-300 flex flex-col relative z-20",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex-shrink-0" />
        {!isCollapsed && (
          <span className="font-bold text-slate-900 tracking-tight whitespace-nowrap">
            Hire Your Clone
          </span>
        )}
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
                isActive 
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-100" 
                  : "text-slate-500 hover:bg-white/50 hover:text-indigo-600"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
              {!isCollapsed && (
                <span className="text-sm font-semibold tracking-tight">
                  {item.label}
                </span>
              )}
              {isActive && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10">
        {!isCollapsed && (
           <div className="glass-dark p-4 rounded-2xl mb-4 bg-indigo-900/5 border-indigo-200/20">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Pro Feature</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium leading-normal">
                Optimize your AI training with the new Neural Sync tool.
              </p>
           </div>
        )}
        <button className="flex items-center gap-4 w-full px-4 py-3 text-slate-400 hover:text-red-500 transition-colors rounded-xl hover:bg-red-50">
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-semibold">Sign Out</span>}
        </button>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform text-slate-400 hover:text-indigo-500"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
