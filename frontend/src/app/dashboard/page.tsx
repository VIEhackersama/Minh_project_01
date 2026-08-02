"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-context";
import {
  FolderOpen,
  ArrowCounterClockwise,
  Users,
  Warning,
  ClockCountdown,
  Lightning,
  UserPlus,
  QrCode,
  Plus,
  ArrowRight,
  HardDrive,
  Flame,
  ChartBar,
  CheckCircle,
  ArrowsClockwise,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api";

export default function DashboardHome() {
  const { user } = useAuth();
  const router = useRouter();
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [scanningOverdue, setScanningOverdue] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get<any>("/reports/summary");
      setSummary(res);
    } catch (err) {
      console.error("Failed to fetch summary reports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.role === "TEACHER") {
      router.replace("/dashboard/records");
      return;
    }
    fetchSummary();
  }, [user, router]);

  const handleScanOverdue = async () => {
    try {
      setScanningOverdue(true);
      setScanMessage(null);
      const res = await apiClient.post<any>("/phieu-muon/check-overdue", {});
      setScanMessage(`Đã quét xong — cập nhật ${res.updatedCount || 0} phiếu quá hạn.`);
      fetchSummary();
    } catch {
      setScanMessage("Kết nối thất bại. Vui lòng thử lại.");
    } finally {
      setScanningOverdue(false);
    }
  };

  const totalRecords = summary?.totalRecords ?? 0;
  const storedRecords = summary?.storedRecords ?? 0;
  const activeLoans = summary?.activeLoans ?? 0;
  const reservedRecords = summary?.reservedRecords ?? 0;
  const overdueLoans = summary?.overdueLoans ?? 0;
  const pendingLoans = summary?.pendingLoans ?? 0;
  const eligibleDestruction = summary?.eligibleDestruction ?? 0;
  const destroyedRecords = summary?.destroyedRecords ?? 0;

  const storedPct = totalRecords ? Math.round((storedRecords / totalRecords) * 100) : 0;

  // ── Metric strip data
  const metrics = [
    {
      label: "Tổng hồ sơ",
      value: loading ? "—" : totalRecords,
      sub: `${storedPct}% lưu kho`,
      icon: FolderOpen,
      iconColor: "text-primary",
    },
    {
      label: "Đang mượn",
      value: loading ? "—" : activeLoans + reservedRecords,
      sub: `${activeLoans} thực tế · ${reservedRecords} đặt giữ`,
      icon: ArrowCounterClockwise,
      iconColor: "text-warning-orange",
    },
    {
      label: "Quá hạn",
      value: loading ? "—" : overdueLoans,
      sub: overdueLoans > 0 ? "Cần xử lý ngay" : "Không vi phạm",
      icon: Warning,
      iconColor: overdueLoans > 0 ? "text-danger-red" : "text-success-green",
      highlight: overdueLoans > 0,
    },
    {
      label: "Chờ hủy",
      value: loading ? "—" : eligibleDestruction,
      sub: `${destroyedRecords} đã hủy`,
      icon: Flame,
      iconColor: "text-zinc-400",
    },
  ];

  return (
    <div className="flex flex-col w-full gap-8 animate-fade-in">

      {/* ── Welcome row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-on-surface">
            Xin chào, {user?.hoTen || "Quản trị viên"}
          </h1>
          <p className="text-sm text-secondary mt-0.5">Dashboard điều hành EduArchive</p>
        </div>
        <button
          onClick={handleScanOverdue}
          disabled={scanningOverdue}
          className="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-[13px] font-medium rounded-lg transition-all shrink-0 disabled:opacity-50 border border-whisper-border"
        >
          <ArrowsClockwise size={15} className={scanningOverdue ? "animate-spin" : ""} />
          {scanningOverdue ? "Đang quét..." : "Quét phiếu quá hạn"}
        </button>
      </div>

      {/* ── Scan message */}
      {scanMessage && (
        <div className="px-4 py-3 bg-primary/8 border border-primary/20 rounded-xl flex items-center gap-3 text-[13px] font-medium text-primary">
          <CheckCircle size={16} weight="fill" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* ── Metric Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-whisper-border border border-whisper-border rounded-2xl bg-pure-surface overflow-hidden shadow-sm">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className={`px-6 py-5 flex flex-col gap-3 relative ${
                m.highlight ? "bg-red-50/50" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wide">
                  {m.label}
                </span>
                <Icon size={16} className={m.iconColor} weight="fill" />
              </div>
              <div>
                <span className={`text-3xl font-black tracking-tight leading-none ${m.highlight ? "text-danger-red" : "text-on-surface"}`}>
                  {m.value}
                </span>
                <p className={`text-[11px] mt-1.5 ${m.highlight ? "text-danger-red/70" : "text-secondary"}`}>
                  {m.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Main grid: Analytics (2col) + Quick Actions (1col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Analytics panel */}
        <div className="lg:col-span-2 bg-pure-surface rounded-2xl border border-whisper-border shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-whisper-border flex items-center justify-between">
            <h3 className="text-[14px] font-bold text-on-surface flex items-center gap-2">
              <ChartBar size={16} weight="duotone" className="text-primary" />
              Chỉ số kiểm kê & khai thác
            </h3>
            <Link href="/dashboard/reports" className="text-[12px] font-semibold text-primary hover:underline">
              Xem báo cáo →
            </Link>
          </div>

          <div className="p-6 flex flex-col gap-6">
            {/* Sub-metrics row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Lưu kho", value: storedRecords, color: "text-on-surface", note: "Sẵn sàng mượn" },
                { label: "Đang mượn", value: activeLoans, color: "text-warning-orange", note: "Độc giả đang giữ" },
                { label: "Chờ duyệt", value: pendingLoans, color: "text-primary", note: "Cần văn thư duyệt" },
              ].map((item, i) => (
                <div key={i} className="bg-surface-container-low rounded-xl px-4 py-3.5">
                  <p className="text-[10px] text-secondary font-semibold uppercase tracking-wide mb-2">{item.label}</p>
                  <p className={`text-2xl font-black ${item.color}`}>{loading ? "—" : item.value}</p>
                  <p className="text-[10px] text-secondary mt-1">{item.note}</p>
                </div>
              ))}
            </div>

            {/* Storage ratio bar */}
            <div>
              <div className="flex items-center justify-between text-[12px] font-medium text-on-surface mb-2">
                <span>Tỷ lệ hồ sơ hiện diện sẵn sàng tại kho</span>
                <span className="font-mono font-bold">{storedPct}% ({storedRecords}/{totalRecords} hồ sơ)</span>
              </div>
              <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${storedPct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-whisper-border flex items-center justify-between">
            <span className="text-[11px] text-secondary">Dữ liệu được cập nhật thời gian thực.</span>
            <Link href="/dashboard/reports" className="text-[12px] font-semibold text-primary hover:underline">
              Xem báo cáo kho →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-4">
          {/* Dark quick-actions card */}
          <div className="bg-charcoal-ink rounded-2xl border border-white/[0.07] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <h3 className="text-[13px] font-bold text-white flex items-center gap-2">
                <Lightning size={15} weight="fill" className="text-primary-fixed-dim" />
                Thao tác nhanh
              </h3>
            </div>
            <div className="p-3 flex flex-col gap-1.5">
              {[
                { href: "/dashboard/records?create=true", label: "Tạo hồ sơ mới", icon: Plus, accent: true },
                { href: "/dashboard/destruction", label: "Đề xuất tiêu hủy", icon: Flame, accent: false },
                { href: "/dashboard/reports", label: "Báo cáo thống kê", icon: ChartBar, accent: false },
              ].map((action, i) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={i}
                    href={action.href}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-[13px] font-medium transition-all group ${
                      action.accent
                        ? "bg-primary text-white hover:bg-primary-container"
                        : "bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon size={15} weight={action.accent ? "bold" : "regular"} />
                      {action.label}
                    </span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
