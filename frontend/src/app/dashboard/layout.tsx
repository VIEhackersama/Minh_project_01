"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Undo2,
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  Bell, 
  PlusCircle, 
  FileText,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, hasPermission } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { name: string; href: string; icon: any; permission: string | null }[] = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, permission: null },
    { name: "Quản lý Hồ sơ", href: "/dashboard/records", icon: FolderOpen, permission: null }, // default permission check is null
    { name: "Mượn trả", href: "/dashboard/loans", icon: Undo2, permission: null },
    { name: "Báo cáo", href: "/dashboard/reports", icon: BarChart3, permission: null },
  ];

  // Only show Admin/System settings link if user has SYS_ADMIN permission
  if (hasPermission("SYS_ADMIN")) {
    navItems.push({ name: "Hệ thống", href: "/dashboard/users", icon: Settings, permission: "SYS_ADMIN" });
  }

  const handleLogout = async () => {
    await logout();
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[parts.length - 2].substring(0, 1) + parts[parts.length - 1].substring(0, 1)).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-canvas-white flex flex-col font-sans">
      {/* Sidebar - Desktop */}
      <aside className="fixed left-0 top-0 h-full w-[280px] bg-charcoal-ink z-40 hidden md:flex flex-col shadow-xl border-r border-slate-800">
        {/* Sidebar Logo */}
        <div className="p-8 mb-4 flex items-center gap-3">
          <div className="bg-primary/20 text-primary-fixed-dim p-2 rounded-xl border border-primary/30">
            <FileText className="w-6 h-6 text-primary-fixed" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">EduArchive</span>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-primary-container text-on-primary font-semibold shadow-md shadow-primary/10" 
                    : "text-secondary hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 mr-4 opacity-75 group-hover:opacity-100 transition-opacity ${isActive ? "text-white" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar User Footer */}
        <div className="mt-auto p-4 mx-4 mb-8 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed font-bold flex items-center justify-center text-sm shadow-sm ring-2 ring-primary/20">
              {user ? getInitials(user.hoTen) : "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold truncate">{user?.hoTen || "Người dùng"}</p>
              <p className="text-secondary text-xs truncate">
                {user?.role === "ADMIN" ? "Quản trị viên" : user?.role === "RECORDS_OFFICER" ? "Văn thư" : "Giáo viên"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors border border-transparent hover:border-danger-red/20"
          >
            <LogOut className="w-3.5 h-3.5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Mobile Drawer */}
      <aside 
        className={`fixed left-0 top-0 h-full w-[280px] bg-charcoal-ink z-50 flex flex-col shadow-xl transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 text-primary-fixed-dim p-2 rounded-xl border border-primary/30">
              <FileText className="w-6 h-6 text-primary-fixed" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">EduArchive</span>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? "bg-primary-container text-on-primary font-semibold shadow-md shadow-primary/10" 
                    : "text-secondary hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 mr-4 opacity-75" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-4 mx-4 mb-8 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed font-bold flex items-center justify-center text-sm ring-2 ring-primary/20">
              {user ? getInitials(user.hoTen) : "U"}
            </div>
            <div className="overflow-hidden">
              <p className="text-white text-sm font-semibold truncate">{user?.hoTen || "Người dùng"}</p>
              <p className="text-secondary text-xs truncate">
                {user?.role === "ADMIN" ? "Quản trị viên" : user?.role === "RECORDS_OFFICER" ? "Văn thư" : "Giáo viên"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 pl-0 md:pl-[280px] min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 h-20 bg-pure-surface/80 backdrop-blur-xl z-30 border-b border-whisper-border px-6 md:px-10 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            {/* Mobile menu toggle */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-xl md:hidden transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Search Bar */}
            <div className="relative w-full hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm hồ sơ, học sinh..."
                className="w-full pl-12 pr-4 py-2.5 bg-surface-container-low border border-transparent rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-pure-surface focus:border-whisper-border transition-all"
              />
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4">
            {/* Notification button */}
            <button className="relative p-2.5 text-on-surface-variant hover:bg-surface-container rounded-full transition-colors border border-transparent hover:border-whisper-border">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-danger-red rounded-full ring-2 ring-pure-surface"></span>
            </button>
            
            {/* Quick Action Button */}
            <Link
              href="/dashboard/records?create=true"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-full text-xs font-semibold shadow-lg shadow-primary/20 hover:bg-primary-container hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden md:inline">Tạo mới Hồ sơ</span>
            </Link>
          </div>
        </header>

        {/* Content Wrapper */}
        <main className="flex-grow p-6 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
