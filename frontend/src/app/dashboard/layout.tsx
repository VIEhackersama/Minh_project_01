"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useAuth } from "@/components/auth-context";
import {
  House,
  FolderOpen,
  BookOpen,
  ChartBar,
  Gear,
  SignOut,

  Files,
  List,
  X,
  CaretDown,
  CaretRight,
  BookOpenText,
  ShieldWarning,
  Archive,
  Trash,
  Tag,
  ArrowsLeftRight,
  Gauge,
  SidebarSimple,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { NotificationPopover } from "@/components/NotificationPopover";

const SIDEBAR_COLLAPSED_KEY = "eduarchive_sidebar_collapsed";

function DashboardLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, logout, hasPermission } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab");

  const isSubActive = (subHref: string) => {
    if (subHref.includes("?")) {
      const [path, query] = subHref.split("?");
      const urlParams = new URLSearchParams(query);
      const expectedTab = urlParams.get("tab");
      const expectedStatus = urlParams.get("status");
      if (expectedTab) return pathname === path && currentTab === expectedTab;
      if (expectedStatus) return pathname === path && searchParams.get("status") === expectedStatus;
    }
    return pathname === subHref;
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
    }
    return false;
  });

  const isArchivistOrAdmin =
    user?.role === "ADMIN" || user?.role === "RECORDS_OFFICER" || hasPermission("RECORD_MANAGE");
  const isAdmin = user?.role === "ADMIN" || hasPermission("SYS_ADMIN");

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    system: pathname.startsWith("/dashboard/users") || pathname.startsWith("/dashboard/audit-logs"),
    records:
      pathname.startsWith("/dashboard/records") ||
      pathname.startsWith("/dashboard/storage") ||
      pathname.startsWith("/dashboard/categories") ||
      pathname.startsWith("/dashboard/destruction"),
    loans: pathname.startsWith("/dashboard/loans"),
    reports: pathname.startsWith("/dashboard/reports"),
  });

  useEffect(() => {
    setExpandedModules((prev) => ({
      ...prev,
      system: prev.system || pathname.startsWith("/dashboard/users") || pathname.startsWith("/dashboard/audit-logs"),
      records:
        prev.records ||
        pathname.startsWith("/dashboard/records") ||
        pathname.startsWith("/dashboard/storage") ||
        pathname.startsWith("/dashboard/categories") ||
        pathname.startsWith("/dashboard/destruction"),
      loans: prev.loans || pathname.startsWith("/dashboard/loans"),
      reports: prev.reports || pathname.startsWith("/dashboard/reports"),
    }));
  }, [pathname]);

  const toggleModule = (id: string) => {
    if (collapsed) return; // no dropdown when icon-only
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCollapse = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      return next;
    });
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[parts.length - 2].substring(0, 1) + parts[parts.length - 1].substring(0, 1)).toUpperCase();
  };

  const roleLabel =
    user?.role === "ADMIN"
      ? "Quản trị viên"
      : user?.role === "RECORDS_OFFICER"
      ? "Văn thư kho"
      : "Giáo viên";

  const moduleGroups = [
    ...(isAdmin
      ? [
          {
            id: "system",
            name: "Quản trị hệ thống",
            icon: Gear,
            subItems: [
              { name: "Phân quyền & Tài khoản", href: "/dashboard/users", icon: ShieldWarning },
              { name: "Cấu hình & Audit log", href: "/dashboard/audit-logs", icon: Files },
            ],
          },
        ]
      : []),
    {
      id: "records",
      name: "Hồ sơ & Tài liệu",
      icon: FolderOpen,
      subItems: [
        { name: "Danh sách hồ sơ", href: "/dashboard/records", icon: Archive },
        ...(isArchivistOrAdmin
          ? [
              { name: "Vị trí lưu trữ", href: "/dashboard/storage", icon: Gauge },
              { name: "Danh mục & Hạn bảo quản", href: "/dashboard/categories", icon: Tag },
              { name: "Quy trình tiêu hủy", href: "/dashboard/destruction", icon: Trash },
            ]
          : []),
      ],
    },
    {
      id: "loans",
      name: "Khai thác mượn trả",
      icon: BookOpenText,
      subItems: [
        { name: "Tra cứu & Đăng ký mượn/trả", href: "/dashboard/loans", icon: BookOpen },
        { name: "Cảnh báo quá hạn", href: "/dashboard/loans/overdue", icon: ShieldWarning },
      ],
    },
    ...(isArchivistOrAdmin
      ? [
          {
            id: "reports",
            name: "Báo cáo & Thống kê",
            icon: ChartBar,
            subItems: [
              { name: "Kiểm kê kho vật lý", href: "/dashboard/reports?tab=inventory", icon: Gauge },
              { name: "Tình trạng mượn trả", href: "/dashboard/reports?tab=loans", icon: ArrowsLeftRight },
              { name: "Tiêu hủy tài liệu", href: "/dashboard/reports?tab=destruction", icon: Trash },
            ],
          },
        ]
      : []),
  ];

  const sidebarW = collapsed ? "72px" : "280px";

  const renderSidebarContent = (onLinkClick?: () => void) => (
    <div className="flex flex-col gap-1.5 w-full">
      <Link
        href="/dashboard"
        onClick={onLinkClick}
        title={collapsed ? "Tổng quan" : undefined}
        className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
          pathname === "/dashboard"
            ? "bg-primary/15 text-white nav-item-active"
            : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
        } ${collapsed ? "justify-center" : ""}`}
      >
        <House size={18} weight={pathname === "/dashboard" ? "fill" : "regular"} className="shrink-0" />
        {!collapsed && <span className="text-[13px] font-medium leading-none">Tổng quan</span>}
      </Link>

      <div className="my-2 border-t border-white/[0.06]" />

      <div className="flex flex-col gap-1">
        {moduleGroups.map((mod) => {
          const Icon = mod.icon;
          const isExpanded = !!expandedModules[mod.id];
          const hasActiveSub = mod.subItems.some((sub) => isSubActive(sub.href));

          return (
            <div key={mod.id}>
              <button
                onClick={() => toggleModule(mod.id)}
                title={collapsed ? mod.name : undefined}
                className={`w-full relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-left ${
                  hasActiveSub
                    ? "bg-primary/15 text-white nav-item-active"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                } ${collapsed ? "justify-center" : "justify-between"}`}
              >
                <div className={`flex items-center gap-3 ${collapsed ? "" : "overflow-hidden"}`}>
                  <Icon
                    size={18}
                    weight={hasActiveSub ? "fill" : "regular"}
                    className="shrink-0"
                  />
                  {!collapsed && (
                    <span className="text-[13px] font-medium truncate leading-none">{mod.name}</span>
                  )}
                </div>
                {!collapsed && (
                  <span className="text-zinc-600 shrink-0">
                    {isExpanded ? <CaretDown size={13} weight="bold" /> : <CaretRight size={13} weight="bold" />}
                  </span>
                )}
              </button>

              {!collapsed && isExpanded && (
                <div className="ml-[15px] pl-3 mt-1 mb-1 border-l border-white/[0.08] flex flex-col gap-0.5">
                  {mod.subItems.map((sub, idx) => {
                    const SubIcon = sub.icon;
                    const isActive = isSubActive(sub.href);
                    return (
                      <Link
                        key={idx}
                        href={sub.href}
                        onClick={onLinkClick}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] transition-all duration-150 ${
                          isActive
                            ? "bg-primary/10 text-primary-fixed-dim font-semibold"
                            : "text-zinc-500 hover:text-zinc-200 hover:bg-white/5"
                        }`}
                      >
                        <SubIcon size={13} weight={isActive ? "fill" : "regular"} className="shrink-0" />
                        <span className="truncate">{sub.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const sidebarContent = (isMobile = false, onLinkClick?: () => void) => (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-3 px-4 py-5 ${collapsed && !isMobile ? "justify-center px-3" : ""}`}>
        <div className="shrink-0 w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center border border-primary/25">
          <Files size={16} weight="fill" className="text-primary-fixed-dim" />
        </div>
        {(!collapsed || isMobile) && (
          <div className="overflow-hidden">
            <span className="text-white font-bold text-[15px] tracking-tight block leading-none">EduArchive</span>
            <span className="text-zinc-500 text-[10px] block font-mono mt-0.5">Quản lý hồ sơ</span>
          </div>
        )}
        {isMobile && (
          <button
            onClick={onLinkClick}
            className="ml-auto text-zinc-500 hover:text-zinc-200 p-1 transition-colors"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Collapse toggle button — desktop only */}
      {!isMobile && (
        <div className={`px-3 pb-3 ${collapsed ? "flex justify-center" : ""}`}>
          <button
            onClick={toggleCollapse}
            title={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-all text-[11px] font-medium w-full"
          >
            <SidebarSimple size={15} weight="regular" className="shrink-0" />
            {!collapsed && <span>Thu gọn</span>}
          </button>
        </div>
      )}

      {/* Nav */}
      <nav className={`flex-1 px-3 overflow-y-auto sidebar-scroll ${collapsed && !isMobile ? "px-2" : ""}`}>
        {renderSidebarContent(onLinkClick)}
      </nav>

      {/* Notification Bell in Sidebar */}
      <div className={`px-3 pt-2 pb-1 border-t border-white/[0.06] ${collapsed && !isMobile ? "px-2" : ""}`}>
        <NotificationPopover collapsed={collapsed && !isMobile} />
      </div>

      {/* User footer */}
      <div className={`p-3 mt-auto border-t border-white/[0.06] ${collapsed && !isMobile ? "flex justify-center" : ""}`}>
        {collapsed && !isMobile ? (
          <button
            onClick={handleLogout}
            title="Đăng xuất"
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 flex items-center justify-center transition-all"
          >
            <SignOut size={16} />
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[10px] bg-primary-fixed text-on-surface font-bold flex items-center justify-center text-[11px] shrink-0">
              {user ? getInitials(user.hoTen) : "U"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-white text-[12px] font-semibold truncate leading-none mb-0.5">
                {user?.hoTen || "Người dùng"}
              </p>
              <p className="text-zinc-500 text-[10px] truncate font-mono">{roleLabel}</p>
            </div>
            <button
              onClick={handleLogout}
              title="Đăng xuất"
              className="shrink-0 p-1.5 rounded-lg text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <SignOut size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-canvas-white flex font-sans">
      {/* ── Desktop Sidebar ── */}
      <aside
        style={{ width: sidebarW }}
        className="fixed left-0 top-0 h-full bg-charcoal-ink z-40 hidden md:flex flex-col border-r border-white/[0.06] overflow-hidden transition-[width] duration-300 ease-in-out"
      >
        {sidebarContent(false)}
      </aside>

      {/* ── Mobile Backdrop ── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Mobile Sidebar Drawer ── */}
      <aside
        className={`fixed left-0 top-0 h-full w-[280px] bg-charcoal-ink z-50 flex flex-col border-r border-white/[0.06] shadow-2xl transition-transform duration-300 ease-in-out md:hidden overflow-hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent(true, () => setMobileMenuOpen(false))}
      </aside>

      {/* ── Main content ── */}
      <div
        style={{ paddingLeft: `${collapsed ? "72px" : "280px"}` }}
        className="flex-1 flex flex-col min-h-screen md:transition-[padding-left] duration-300 ease-in-out max-md:pl-0"
      >
        {/* Header (Mobile only) */}
        <header className="sticky top-0 h-[60px] bg-pure-surface/90 backdrop-blur-xl z-30 border-b border-whisper-border px-5 md:hidden flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-1 text-on-surface-variant hover:bg-surface-container rounded-xl md:hidden transition-colors"
            >
              <List size={20} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main id="main-content" className="flex-grow p-5 md:p-8 max-w-[1400px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </Suspense>
  );
}
