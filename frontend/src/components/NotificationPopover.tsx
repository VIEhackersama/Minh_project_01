"use client";

import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPhieuMuons, PhieuMuon } from "@/lib/loansApi";
import { useAuth } from "@/components/auth-context";
import { 
  Bell, 
  X, 
  ChevronRight, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  Check, 
  Trash2, 
  CheckCheck,
  RotateCcw
} from "lucide-react";
import Link from "next/link";

const SEEN_NOTIFS_KEY = "eduarchive_seen_notifications";
const DISMISSED_NOTIFS_KEY = "eduarchive_dismissed_notifications";

interface NotificationPopoverProps {
  collapsed?: boolean;
}

export function NotificationPopover({ collapsed = false }: NotificationPopoverProps) {
  const { user, hasPermission } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const isArchivistOrAdmin = hasPermission("LOAN_MANAGE") || user?.role === "ADMIN" || user?.role === "RECORDS_OFFICER";

  // Persistent seen and dismissed states
  const [seenIds, setSeenIds] = useState<string[]>([]);
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedSeen = localStorage.getItem(SEEN_NOTIFS_KEY);
        if (savedSeen) setSeenIds(JSON.parse(savedSeen));
        const savedDismissed = localStorage.getItem(DISMISSED_NOTIFS_KEY);
        if (savedDismissed) setDismissedIds(JSON.parse(savedDismissed));
      } catch (e) {
        console.error("Lỗi khi đọc trạng thái thông báo từ localStorage", e);
      }
    }
  }, []);

  const saveSeen = (newSeen: string[]) => {
    setSeenIds(newSeen);
    if (typeof window !== "undefined") {
      localStorage.setItem(SEEN_NOTIFS_KEY, JSON.stringify(newSeen));
    }
  };

  const saveDismissed = (newDismissed: string[]) => {
    setDismissedIds(newDismissed);
    if (typeof window !== "undefined") {
      localStorage.setItem(DISMISSED_NOTIFS_KEY, JSON.stringify(newDismissed));
    }
  };

  // Fetch overdue loans
  const { data: overdueData } = useQuery({
    queryKey: ["notifications-overdue"],
    queryFn: () => getPhieuMuons({ status: "QUA_HAN", page: 0, size: 5 }),
    refetchInterval: 30000,
  });

  // Fetch pending approval loans
  const { data: pendingData } = useQuery({
    queryKey: ["notifications-pending"],
    queryFn: () => getPhieuMuons({ status: "CHO_DUYET", page: 0, size: 5 }),
    enabled: isArchivistOrAdmin,
    refetchInterval: 30000,
  });

  const overdueList = overdueData?.content || [];
  const pendingList = pendingData?.content || [];

  // Build notification items list
  const notificationItems = [
    ...overdueList.map((pm) => ({
      id: `overdue-${pm.id}`,
      type: "OVERDUE" as const,
      title: `Phiếu quá hạn: ${pm.hoSo?.tenHoSo || pm.hoSo?.maHoSo}`,
      desc: `Người mượn: ${pm.nguoiMuon?.hoTen} (@${pm.nguoiMuon?.username}) - Hẹn trả: ${pm.ngayHenTra}`,
      link: "/dashboard/loans/overdue",
      date: pm.ngayHenTra,
      rawPm: pm,
    })),
    ...(isArchivistOrAdmin
      ? pendingList.map((pm) => ({
          id: `pending-${pm.id}`,
          type: "PENDING" as const,
          title: `Chờ duyệt mượn: ${pm.hoSo?.tenHoSo || pm.hoSo?.maHoSo}`,
          desc: `Yêu cầu từ: ${pm.nguoiMuon?.hoTen} (@${pm.nguoiMuon?.username})`,
          link: "/dashboard/loans?status=CHO_DUYET",
          date: pm.ngayYeuCau,
          rawPm: pm,
        }))
      : []),
  ].filter((item) => !dismissedIds.includes(item.id));

  const unreadItems = notificationItems.filter((item) => !seenIds.includes(item.id));
  const unreadCount = unreadItems.length;

  const markAsSeen = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!seenIds.includes(id)) {
      saveSeen([...seenIds, id]);
    }
  };

  const dismissNotif = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!dismissedIds.includes(id)) {
      saveDismissed([...dismissedIds, id]);
    }
  };

  const markAllAsSeen = () => {
    const allIds = notificationItems.map((i) => i.id);
    const combined = Array.from(new Set([...seenIds, ...allIds]));
    saveSeen(combined);
  };

  const clearAllNotifications = () => {
    const allIds = notificationItems.map((i) => i.id);
    const combined = Array.from(new Set([...dismissedIds, ...allIds]));
    saveDismissed(combined);
  };

  const resetAllDismissed = () => {
    saveDismissed([]);
    saveSeen([]);
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={popoverRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Thông báo hệ thống"
        className={`relative flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-all ${
          collapsed ? "w-10 h-10 mx-auto" : "w-full gap-2 px-3 py-2 text-left justify-start"
        }`}
      >
        <div className="relative">
          <Bell size={18} className="shrink-0" />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-[16px] px-1 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse border border-charcoal-ink">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </div>
        {!collapsed && (
          <div className="flex items-center justify-between flex-1 overflow-hidden">
            <span className="text-[12px] font-medium leading-none">Thông báo</span>
            {unreadCount > 0 && (
              <span className="bg-rose-500/20 text-rose-300 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-rose-500/30">
                {unreadCount} chưa đọc
              </span>
            )}
          </div>
        )}
      </button>

      {/* Flyout Popover Panel */}
      {isOpen && (
        <div
          className={`fixed left-[290px] md:left-[290px] ${
            collapsed ? "left-[80px] md:left-[80px]" : ""
          } bottom-12 z-50 w-[380px] max-w-[calc(100vw-32px)] bg-slate-900 border border-white/15 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl text-slate-100 animate-fade-in`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-2">
              <Bell size={16} className="text-primary-fixed-dim" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Thông báo hệ thống</span>
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsSeen}
                  title="Đánh dấu tất cả là đã đọc"
                  className="px-2 py-1 text-[11px] font-semibold text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors flex items-center gap-1"
                >
                  <CheckCheck size={14} />
                  Đã đọc tất cả
                </button>
              )}

              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors ml-1"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-white/5">
            {notificationItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-slate-400 gap-2">
                <CheckCircle2 size={36} className="text-emerald-500/80" />
                <span className="text-xs font-semibold text-slate-300">Không có thông báo mới nào</span>
                <span className="text-[11px] text-slate-500 text-center">Tất cả các phiếu mượn và yêu cầu đều đã được xem xét.</span>
                
                {dismissedIds.length > 0 && (
                  <button
                    onClick={resetAllDismissed}
                    className="mt-2 text-[11px] text-primary-fixed-dim hover:underline flex items-center gap-1"
                  >
                    <RotateCcw size={12} />
                    Khôi phục thông báo đã ẩn
                  </button>
                )}
              </div>
            ) : (
              notificationItems.map((item) => {
                const isSeen = seenIds.includes(item.id);
                const isOverdue = item.type === "OVERDUE";

                return (
                  <div
                    key={item.id}
                    className={`p-3 transition-colors relative group ${
                      isSeen ? "bg-white/[0.02] opacity-75" : isOverdue ? "bg-rose-500/10" : "bg-amber-500/10"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div
                        className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                          isOverdue ? "bg-rose-500/20 text-rose-400" : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {isOverdue ? <ShieldAlert size={18} /> : <Clock size={18} />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between gap-1">
                          <Link
                            href={item.link}
                            onClick={() => {
                              markAsSeen(item.id);
                              setIsOpen(false);
                            }}
                            className="text-xs font-bold truncate text-slate-200 hover:text-primary-fixed-dim transition-colors"
                          >
                            {item.title}
                          </Link>
                          {!isSeen && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" title="Chưa đọc" />
                          )}
                        </div>

                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{item.desc}</p>

                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                          <Link
                            href={item.link}
                            onClick={() => {
                              markAsSeen(item.id);
                              setIsOpen(false);
                            }}
                            className={`text-[11px] font-semibold flex items-center gap-0.5 hover:underline ${
                              isOverdue ? "text-rose-400" : "text-amber-400"
                            }`}
                          >
                            <span>Xem chi tiết</span>
                            <ChevronRight size={12} />
                          </Link>

                          {/* Quick Actions: Mark Seen / Delete */}
                          <div className="flex items-center gap-1">
                            {!isSeen && (
                              <button
                                onClick={(e) => markAsSeen(item.id, e)}
                                title="Đánh dấu đã xem"
                                className="px-2 py-0.5 text-[10px] font-medium bg-white/10 hover:bg-emerald-500/20 text-slate-300 hover:text-emerald-300 rounded-md transition-colors flex items-center gap-1"
                              >
                                <Check size={11} />
                                Đã xem
                              </button>
                            )}

                            <button
                              onClick={(e) => dismissNotif(item.id, e)}
                              title="Xóa thông báo này"
                              className="p-1 text-slate-500 hover:text-rose-400 hover:bg-rose-500/20 rounded-md transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px]">
            {notificationItems.length > 0 ? (
              <button
                onClick={clearAllNotifications}
                className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
              >
                <Trash2 size={12} />
                Xóa tất cả
              </button>
            ) : (
              <span className="text-slate-500">Tự động cập nhật 30s</span>
            )}

            <Link
              href="/dashboard/loans"
              onClick={() => setIsOpen(false)}
              className="text-primary-fixed-dim hover:text-white font-medium transition-colors"
            >
              Quản lý mượn trả &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
