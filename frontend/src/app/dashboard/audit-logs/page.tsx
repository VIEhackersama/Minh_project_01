"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/components/auth-context";
import {
  ShieldAlert,
  Search,
  Loader2,
  AlertCircle,
  Clock,
  User,
  Activity,
  FileText,
  KeyRound,
  ShieldCheck,
  RefreshCw,
  Monitor,
  Calendar
} from "lucide-react";

interface AuditLog {
  id: number;
  username: string;
  hoTen: string;
  hanhDong: string;
  chiTiet: string;
  ipAddress: string;
  ngayThucHien: string;
}

interface AuditLogPageResponse {
  content: AuditLog[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

const ACTION_GROUPS = [
  { label: "Tất cả", value: "ALL" },
  { label: "Đăng nhập", value: "DANG_NHAP" },
  { label: "Đăng nhập thất bại", value: "DANG_NHAP_THAT_BAI" },
  { label: "Tạo tài khoản", value: "TAO_TAI_KHOAN" },
  { label: "Cập nhật tài khoản", value: "CAP_NHAT_TAI_KHOAN" },
  { label: "Khóa/Mở khóa", value: "KHOA_TAI_KHOAN" },
  { label: "Cảnh báo quá hạn", value: "CANH_BAO_QUA_HAN" },
  { label: "Tiêu hủy", value: "PHE_DUYET_TIEU_HUY" },
];

export default function AuditLogsPage() {
  const { hasPermission, user: currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAction, setSelectedAction] = useState("ALL");
  const [page, setPage] = useState(0);

  // Authorization Guard
  if (currentUser && currentUser.role !== "ADMIN" && !hasPermission("SYS_ADMIN")) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <ShieldAlert className="w-16 h-16 text-rose-500" />
        <h2 className="text-xl font-bold text-on-surface">Không Có Quyền Truy Cập</h2>
        <p className="text-sm text-secondary max-w-md">
          Chức năng Nhật ký hệ thống (Audit log) chỉ dành riêng cho Quản trị viên (ADMIN). Vui lòng liên hệ Admin để được cấp quyền.
        </p>
      </div>
    );
  }

  // Query Audit Logs
  const { data: logsData, isLoading, isRefetching, refetch } = useQuery<AuditLogPageResponse>({
    queryKey: ["audit-logs", searchQuery, selectedAction, page],
    queryFn: () => api.get<AuditLogPageResponse>("/admin/audit-logs", {
      params: { query: searchQuery, action: selectedAction, page, size: 15 }
    }),
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return d.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      });
    } catch {
      return dateStr;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "DANG_NHAP":
        return {
          label: "Đăng nhập",
          bg: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
          icon: ShieldCheck
        };
      case "DANG_NHAP_THAT_BAI":
        return {
          label: "Đăng nhập lỗi",
          bg: "bg-rose-500/10 text-rose-700 border-rose-500/20",
          icon: ShieldAlert
        };
      case "DANG_XUAT":
        return {
          label: "Đăng xuất",
          bg: "bg-slate-500/10 text-slate-700 border-slate-500/20",
          icon: KeyRound
        };
      case "TAO_TAI_KHOAN":
        return {
          label: "Tạo tài khoản",
          bg: "bg-blue-500/10 text-blue-700 border-blue-500/20",
          icon: User
        };
      case "CAP_NHAT_TAI_KHOAN":
        return {
          label: "Cập nhật tài khoản",
          bg: "bg-sky-500/10 text-sky-700 border-sky-500/20",
          icon: Activity
        };
      case "XOA_TAI_KHOAN":
        return {
          label: "Xóa tài khoản",
          bg: "bg-rose-500/10 text-rose-700 border-rose-500/20",
          icon: ShieldAlert
        };
      case "KHOA_TAI_KHOAN":
        return {
          label: "Khóa tài khoản",
          bg: "bg-amber-500/10 text-amber-700 border-amber-500/20",
          icon: ShieldAlert
        };
      case "MO_KHOA_TAI_KHOAN":
        return {
          label: "Mở khóa",
          bg: "bg-teal-500/10 text-teal-700 border-teal-500/20",
          icon: ShieldCheck
        };
      case "CANH_BAO_QUA_HAN":
        return {
          label: "Cảnh báo quá hạn",
          bg: "bg-amber-500/10 text-amber-700 border-amber-500/20",
          icon: AlertCircle
        };
      case "PHE_DUYET_TIEU_HUY":
      case "THUC_THI_TIEU_HUY":
        return {
          label: "Tiêu hủy",
          bg: "bg-purple-500/10 text-purple-700 border-purple-500/20",
          icon: FileText
        };
      default:
        return {
          label: action,
          bg: "bg-primary/10 text-primary border-primary/20",
          icon: Activity
        };
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "S";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[parts.length - 2].substring(0, 1) + parts[parts.length - 1].substring(0, 1)).toUpperCase();
  };

  return (
    <div className="flex flex-col w-full gap-8 animate-fade-in relative">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black tracking-tight text-on-surface">Nhật ký Hệ thống (Audit Log)</h1>
          <p className="text-sm text-secondary">Theo dõi chi tiết lịch sử thao tác và an toàn thông tin của người dùng.</p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="flex items-center gap-2 bg-surface-container-low text-on-surface hover:bg-surface-container border border-whisper-border px-4 py-2.5 rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefetching ? "animate-spin text-primary" : ""}`} />
          <span>Làm mới nhật ký</span>
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-pure-surface rounded-[2rem] p-6 md:p-8 flex flex-col gap-6 shadow-sm border border-whisper-border relative overflow-hidden">
        {/* Glow ambient circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed-dim/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

        {/* Table Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between relative z-10">
          {/* Search Box */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Tìm theo người dùng, nội dung, IP..."
              className="w-full bg-surface-container-low text-on-surface pl-12 pr-4 py-3 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:bg-pure-surface focus:border-whisper-border shadow-sm transition-all"
            />
          </div>

          {/* Action Group Filters */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <span className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider whitespace-nowrap">Hành động:</span>
            <div className="flex items-center gap-1.5 bg-surface-container-low border border-whisper-border rounded-xl p-1 shadow-sm overflow-x-auto">
              {ACTION_GROUPS.map((act) => (
                <button
                  key={act.value}
                  onClick={() => {
                    setSelectedAction(act.value);
                    setPage(0);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedAction === act.value
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-secondary hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  {act.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="w-full overflow-x-auto pb-4 relative z-10 border border-whisper-border rounded-2xl bg-canvas-white/40">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <span className="text-xs text-secondary font-medium">Đang tải nhật ký hệ thống...</span>
            </div>
          ) : !logsData || logsData.content.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
              <AlertCircle className="w-10 h-10" />
              <span className="text-xs font-medium">Chưa có dữ liệu nhật ký thao tác phù hợp</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="text-secondary font-mono text-[10px] uppercase tracking-widest border-b border-whisper-border bg-slate-50">
                  <th className="py-4 pl-6 font-semibold w-48">Thời gian</th>
                  <th className="py-4 font-semibold w-56">Người thực hiện</th>
                  <th className="py-4 font-semibold w-44">Hành động</th>
                  <th className="py-4 font-semibold">Chi tiết thao tác</th>
                  <th className="py-4 pr-6 font-semibold w-36 text-right">Địa chỉ IP</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-whisper-border">
                {logsData.content.map((log) => {
                  const badge = getActionBadge(log.hanhDong);
                  const Icon = badge.icon;
                  const isSystem = log.username === "SYSTEM";

                  return (
                    <tr key={log.id} className="group hover:bg-pure-surface/80 transition-colors">
                      {/* Timestamp */}
                      <td className="py-4 pl-6 font-mono text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{formatDate(log.ngayThucHien)}</span>
                        </div>
                      </td>

                      {/* User */}
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                            isSystem ? "bg-slate-200 text-slate-700" : "bg-primary-fixed text-on-primary-fixed-variant"
                          }`}>
                            {getInitials(log.hoTen)}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-on-surface group-hover:text-primary transition-colors">
                              {log.hoTen}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">@{log.username}</span>
                          </div>
                        </div>
                      </td>

                      {/* Action Badge */}
                      <td className="py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold tracking-wide ${badge.bg}`}>
                          <Icon className="w-3 h-3" />
                          {badge.label}
                        </span>
                      </td>

                      {/* Details */}
                      <td className="py-4 text-on-surface-variant font-medium pr-4 leading-relaxed">
                        {log.chiTiet || "—"}
                      </td>

                      {/* IP Address */}
                      <td className="py-4 pr-6 text-right font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Monitor className="w-3.5 h-3.5 text-slate-400" />
                          <span>{log.ipAddress || "Localhost"}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination controls */}
        {logsData && logsData.totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-whisper-border relative z-10">
            <span className="text-xs text-secondary font-medium">
              Trang {page + 1} / {logsData.totalPages} ({logsData.totalElements} bản ghi nhật ký)
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-whisper-border bg-pure-surface hover:bg-slate-50 text-secondary disabled:opacity-40 transition-colors"
              >
                Trước
              </button>
              <button
                disabled={page >= logsData.totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-whisper-border bg-pure-surface hover:bg-slate-50 text-secondary disabled:opacity-40 transition-colors"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
