import { type ReactNode } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminBg from "@/components/AdminBg";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <AdminBg />
      <AdminSidebar />
      <main className="relative z-10 flex-1 overflow-y-auto px-10 py-12">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
