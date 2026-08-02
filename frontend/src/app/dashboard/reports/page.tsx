"use client";

import React, { useEffect, useState } from "react";
import { 
  BarChart3, 
  FolderOpen, 
  Archive, 
  Undo2, 
  AlertTriangle, 
  Flame, 
  RefreshCw,
  Layers,
  Building2,
  PieChart
} from "lucide-react";
import { apiClient } from "@/lib/api";

export default function ReportsPage() {
  const [summary, setSummary] = useState<any>(null);
  const [categoryInventory, setCategoryInventory] = useState<any[]>([]);
  const [locationInventory, setLocationInventory] = useState<any[]>([]);
  const [loanStats, setLoanStats] = useState<any>(null);
  const [overdueLoans, setOverdueLoans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [sumRes, catRes, locRes, loanRes, overdueRes] = await Promise.all([
        apiClient.get<any>("/reports/summary"),
        apiClient.get<any[]>("/reports/inventory/category"),
        apiClient.get<any[]>("/reports/inventory/location"),
        apiClient.get<any>("/reports/loans"),
        apiClient.get<any>("/phieu-muon?status=QUA_HAN")
      ]);
      setSummary(sumRes);
      setCategoryInventory(catRes || []);
      setLocationInventory(locRes || []);
      setLoanStats(loanRes);
      setOverdueLoans(overdueRes?.content || []);
    } catch (err) {
      console.error("Lỗi khi nạp dữ liệu báo cáo:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="flex flex-col w-full gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-on-surface flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-primary" />
            Báo Cáo & Thống Kê Kho Hồ Sơ
          </h1>
          <p className="text-sm text-secondary mt-1">
            Tổng hợp kiểm kê tài liệu, phân bổ vị trí lưu trữ kho vật lý và thống kê tình hình mượn/trả.
          </p>
        </div>

        <button
          onClick={fetchReports}
          className="flex items-center gap-2 px-4 py-2.5 bg-pure-surface border border-whisper-border hover:bg-surface-container text-xs font-semibold rounded-xl shadow-sm transition-all"
        >
          <RefreshCw className={`w-4 h-4 text-primary ${loading ? "animate-spin" : ""}`} />
          Làm mới dữ liệu
        </button>
      </div>

      {/* KPI Cards Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-pure-surface border border-whisper-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase text-secondary font-mono">Tổng Số Hồ Sơ</span>
            <div className="p-2 bg-primary/10 text-primary rounded-xl"><FolderOpen className="w-5 h-5" /></div>
          </div>
          <p className="text-2xl font-black text-on-surface">{loading ? "..." : summary?.totalRecords || 0}</p>
          <p className="text-xs text-secondary mt-1">{summary?.storedRecords || 0} hồ sơ lưu kho sẵn sàng</p>
        </div>

        <div className="bg-pure-surface border border-whisper-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase text-secondary font-mono">Phiếu Mượn Đang Diễn Ra</span>
            <div className="p-2 bg-warning-orange/10 text-warning-orange rounded-xl"><Undo2 className="w-5 h-5" /></div>
          </div>
          <p className="text-2xl font-black text-on-surface">{loading ? "..." : summary?.activeLoans || 0}</p>
          <p className="text-xs text-warning-orange mt-1">{summary?.pendingLoans || 0} phiếu chờ duyệt</p>
        </div>

        <div className="bg-pure-surface border border-whisper-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase text-secondary font-mono">Phiếu Mượn Quá Hạn</span>
            <div className="p-2 bg-danger-red/10 text-danger-red rounded-xl"><AlertTriangle className="w-5 h-5" /></div>
          </div>
          <p className="text-2xl font-black text-danger-red">{loading ? "..." : summary?.overdueLoans || 0}</p>
          <p className="text-xs text-danger-red mt-1">Cần đôn đốc thu hồi</p>
        </div>

        <div className="bg-pure-surface border border-whisper-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold uppercase text-secondary font-mono">Đủ Điều Kiện Tiêu Hủy</span>
            <div className="p-2 bg-slate-100 text-slate-700 rounded-xl"><Flame className="w-5 h-5" /></div>
          </div>
          <p className="text-2xl font-black text-on-surface">{loading ? "..." : summary?.eligibleDestruction || 0}</p>
          <p className="text-xs text-secondary mt-1">{summary?.destroyedRecords || 0} hồ sơ đã thực hiện hủy</p>
        </div>
      </div>

      {/* Grid Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Category Breakdown */}
        <div className="bg-pure-surface border border-whisper-border rounded-3xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-on-surface mb-6 flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            Kiểm Kê Hồ Sơ Theo Danh Mục
          </h3>

          {loading ? (
            <div className="py-8 text-center text-xs text-secondary">Đang thống kê...</div>
          ) : categoryInventory.length === 0 ? (
            <div className="py-8 text-center text-xs text-secondary">Chưa có dữ liệu danh mục.</div>
          ) : (
            <div className="space-y-4">
              {categoryInventory.map((cat, i) => {
                const percentage = summary?.totalRecords ? Math.round((cat.recordCount / summary.totalRecords) * 100) : 0;
                return (
                  <div key={i} className="p-4 bg-surface-container-low border border-whisper-border rounded-2xl">
                    <div className="flex justify-between items-center text-xs font-bold mb-2">
                      <span className="text-on-surface">{cat.categoryName} ({cat.categoryCode})</span>
                      <span className="text-primary font-mono">{cat.recordCount} hồ sơ ({percentage}%)</span>
                    </div>
                    <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Loan Statistics Status Breakdown */}
        <div className="bg-pure-surface border border-whisper-border rounded-3xl p-6 shadow-sm">
          <h3 className="text-base font-bold text-on-surface mb-6 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-warning-orange" />
            Thống Kê Trạng Thái Phiếu Mượn
          </h3>

          {loading ? (
            <div className="py-8 text-center text-xs text-secondary">Đang thống kê...</div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900">
                <p className="text-[10px] font-bold uppercase font-mono">Chờ Duyệt</p>
                <p className="text-2xl font-black mt-1">{loanStats?.CHO_DUYET || 0}</p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900">
                <p className="text-[10px] font-bold uppercase font-mono">Đã Duyệt</p>
                <p className="text-2xl font-black mt-1">{loanStats?.DA_DUYET || 0}</p>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900">
                <p className="text-[10px] font-bold uppercase font-mono">Đang Mượn</p>
                <p className="text-2xl font-black mt-1">{loanStats?.DANG_MUON || 0}</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900">
                <p className="text-[10px] font-bold uppercase font-mono">Đã Trả Về Kho</p>
                <p className="text-2xl font-black mt-1">{loanStats?.DA_TRA || 0}</p>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900">
                <p className="text-[10px] font-bold uppercase font-mono">Mượn Quá Hạn</p>
                <p className="text-2xl font-black mt-1">{loanStats?.QUA_HAN || 0}</p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900">
                <p className="text-[10px] font-bold uppercase font-mono">Từ Chối</p>
                <p className="text-2xl font-black mt-1">{loanStats?.TU_CHOI || 0}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Storage Location Inventory Table */}
      <div className="bg-pure-surface border border-whisper-border rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-on-surface mb-6 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Phân Bổ Hồ Sơ Theo Vị Trí Lưu Kho Vật Lý
        </h3>

        {loading ? (
          <div className="py-8 text-center text-xs text-secondary">Đang thống kê...</div>
        ) : locationInventory.length === 0 ? (
          <div className="py-8 text-center text-xs text-secondary">Chưa có vị trí lưu kho nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-low text-on-surface-variant uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-4 rounded-l-xl">Kho / Phòng</th>
                  <th className="p-4">Kệ Hàng</th>
                  <th className="p-4">Ngăn Chứa</th>
                  <th className="p-4 rounded-r-xl text-right">Số Lượng Hồ Sơ Active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whisper-border">
                {locationInventory.map((loc, i) => (
                  <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="p-4 font-bold text-on-surface">{loc.warehouse || "Kho chính"}</td>
                    <td className="p-4 font-mono text-secondary">{loc.shelf || "N/A"}</td>
                    <td className="p-4 font-mono text-secondary">{loc.compartment || "N/A"}</td>
                    <td className="p-4 font-black text-primary text-right">{loc.recordCount} hồ sơ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Overdue Loans Table */}
      <div className="bg-pure-surface border border-rose-200 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-rose-800 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-600 animate-pulse" />
            Danh Sách Phiếu Mượn Quá Hạn Cần Đôn Đốc Thu Hồi ({overdueLoans.length})
          </h3>
          <span className="text-xs text-rose-600 font-semibold">⚠️ Yêu cầu thu hồi ngay</span>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-secondary">Đang tải phiếu quá hạn...</div>
        ) : overdueLoans.length === 0 ? (
          <div className="py-8 text-center text-xs text-emerald-700 font-medium">Không có phiếu mượn nào bị quá hạn. Khai thác an toàn!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-rose-50 text-rose-900 uppercase font-mono text-[10px]">
                <tr>
                  <th className="p-4 rounded-l-xl">Mã Hồ Sơ</th>
                  <th className="p-4">Tên Hồ Sơ</th>
                  <th className="p-4">Người Mượn</th>
                  <th className="p-4">Ngày Hẹn Trả</th>
                  <th className="p-4 rounded-r-xl">Trạng Thái Cảnh Báo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100">
                {overdueLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-rose-50/50 transition-colors">
                    <td className="p-4 font-mono font-bold text-rose-700">{loan.hoSo?.maHoSo}</td>
                    <td className="p-4 font-semibold text-on-surface">{loan.hoSo?.tenHoSo}</td>
                    <td className="p-4 text-on-surface">
                      <span className="font-bold">{loan.nguoiMuon?.hoTen}</span>
                      <span className="text-[10px] text-secondary block font-mono">@{loan.nguoiMuon?.username}</span>
                    </td>
                    <td className="p-4 font-bold text-rose-600">{loan.ngayHenTra}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-rose-100 text-rose-800 font-bold text-[11px] rounded-full border border-rose-300 animate-pulse">
                         Quá hạn mượn
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
