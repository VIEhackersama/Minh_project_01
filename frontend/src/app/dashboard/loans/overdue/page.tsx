"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/auth-context";
import { 
  getPhieuMuons, 
  checkOverdueLoans, 
  xacNhanTraHoSo, 
  PhieuMuonPageResponse, 
  PhieuMuon 
} from "@/lib/loansApi";
import { 
  ShieldAlert, 
  AlertTriangle, 
  Search, 
  RotateCcw, 
  MapPin, 
  User, 
  Clock, 
  CheckCircle2, 
  RefreshCw, 
  Loader2, 
  Calendar,
  AlertCircle,
  QrCode
} from "lucide-react";
import { QrScannerModal } from "@/components/QrScannerModal";

export default function OverdueLoansPage() {
  const { user, hasPermission } = useAuth();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Fetch only QUA_HAN loans
  const { data: loansData, isLoading, refetch, isRefetching } = useQuery<PhieuMuonPageResponse>({
    queryKey: ["phieu-muon-overdue", searchQuery, page],
    queryFn: () => getPhieuMuons({ query: searchQuery, status: "QUA_HAN", page, size: 10 }),
  });

  // Manual Trigger scan mutation
  const scanMutation = useMutation({
    mutationFn: checkOverdueLoans,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["phieu-muon-overdue"] });
      queryClient.invalidateQueries({ queryKey: ["phieu-muon"] });
      alert(`Đã quét xong! Cập nhật thêm ${data.updatedCount} phiếu sang trạng thái quá hạn.`);
    },
    onError: (err: any) => {
      alert("Lỗi khi thực hiện quét quá hạn: " + (err.message || "Unknown error"));
    }
  });

  // Return Mutation
  const returnMutation = useMutation({
    mutationFn: (id: number) => xacNhanTraHoSo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phieu-muon-overdue"] });
      queryClient.invalidateQueries({ queryKey: ["phieu-muon"] });
    },
    onError: (err: any) => {
      alert(err.message || "Xác nhận nhận trả thất bại");
    }
  });

  const getOverdueDays = (ngayHenTraStr: string) => {
    if (!ngayHenTraStr) return 0;
    const due = new Date(ngayHenTraStr);
    const today = new Date();
    // Reset hours for accurate date difference calculation
    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const isArchivistOrAdmin = hasPermission("LOAN_MANAGE") || user?.role === "ADMIN" || user?.role === "RECORDS_OFFICER";

  const totalOverdueCount = loansData?.totalElements || 0;

  // Calculate unique borrowers
  const uniqueBorrowersCount = loansData?.content
    ? new Set(loansData.content.map((p) => p.nguoiMuon?.username)).size
    : 0;

  return (
    <div className="flex flex-col w-full gap-8 animate-fade-in relative">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center border border-rose-200">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-on-surface">Cảnh Báo Phiếu Mượn Quá Hạn</h1>
          </div>
          <p className="text-sm text-secondary">
            Danh sách tổng hợp các phiếu mượn hồ sơ vật lý đã trễ hạn trả cần thu hồi hoặc nhắc nhở.
          </p>
        </div>

        {isArchivistOrAdmin && (
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white px-5 py-3 rounded-full text-xs font-semibold shadow-md transition-all"
            >
              <QrCode className="w-4 h-4" />
              Quét QR Nhận Trả Nhanh
            </button>

            <button
              onClick={() => scanMutation.mutate()}
              disabled={scanMutation.isPending}
              title="Tự động rà soát cơ sở dữ liệu và chuyển các phiếu mượn trễ hạn sang trạng thái Quá hạn"
              className="flex items-center gap-2 border border-whisper-border bg-pure-surface hover:bg-slate-50 text-secondary px-4 py-3 rounded-full text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${scanMutation.isPending ? "animate-spin" : ""}`} />
              Rà Soát Quá Hạn Hệ Thống
            </button>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Total Overdue */}
        <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-rose-700 uppercase font-mono tracking-wider">Tổng phiếu quá hạn</span>
            <span className="text-3xl font-black text-rose-900">{totalOverdueCount}</span>
            <span className="text-[11px] text-rose-600">Cần thu hồi gấp về kho vật lý</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-200/60 text-rose-700 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Unique Borrowers */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-amber-700 uppercase font-mono tracking-wider">Người mượn trễ hạn</span>
            <span className="text-3xl font-black text-amber-900">{uniqueBorrowersCount}</span>
            <span className="text-[11px] text-amber-600">Cán bộ / Giáo viên chưa trả</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-200/60 text-amber-700 flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Status Summary */}
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-blue-700 uppercase font-mono tracking-wider">Trạng thái giám sát</span>
            <span className="text-sm font-bold text-blue-900 flex items-center gap-1.5 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              Đang hoạt động thời gian thực
            </span>
            <span className="text-[11px] text-blue-600">Tự động phát hiện khi truy vấn dữ liệu</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-200/60 text-blue-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-pure-surface rounded-[2rem] p-6 md:p-8 flex flex-col gap-6 shadow-sm border border-whisper-border relative overflow-hidden">
        {/* Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
              placeholder="Tìm kiếm phiếu quá hạn theo tên, mã hồ sơ, người mượn..."
              className="w-full bg-surface-container-low text-on-surface pl-12 pr-4 py-3 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-rose-400/30 border border-transparent"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              disabled={isRefetching}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-whisper-border bg-surface-container-low text-secondary hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin" : ""}`} />
              Làm mới
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-whisper-border rounded-2xl bg-pure-surface">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 gap-2 text-rose-600 font-medium text-xs">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Đang kiểm tra danh sách phiếu mượn quá hạn...</span>
            </div>
          ) : !loansData || loansData.content.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-emerald-600 bg-emerald-50/30">
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
              <span className="text-sm font-bold text-emerald-900">Không có phiếu mượn nào bị quá hạn!</span>
              <span className="text-xs text-emerald-700">Tất cả các hồ sơ đã được trả đúng thời hạn quy định.</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[1100px] layout-fixed">
              <thead>
                <tr className="text-secondary font-mono text-[10px] uppercase tracking-wider border-b border-whisper-border bg-rose-50/50">
                  <th className="py-3.5 pl-6 font-semibold w-[140px]">Mã Hồ Sơ</th>
                  <th className="py-3.5 font-semibold w-[280px]">Hồ Sơ & Vị Trí Kho</th>
                  <th className="py-3.5 font-semibold w-[180px] px-3">Người Mượn Hồ Sơ</th>
                  <th className="py-3.5 font-semibold w-[180px] px-3">Hẹn Trả & Thời Gian Quá Hạn</th>
                  <th className="py-3.5 font-semibold w-[140px] px-3">Trạng Thái</th>
                  <th className="py-3.5 pr-6 font-semibold text-right w-[140px]">Thao Tác Thu Hồi</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-whisper-border">
                {loansData.content.map((pm) => {
                  const daysOverdue = getOverdueDays(pm.ngayHenTra);

                  return (
                    <tr key={pm.id} className="hover:bg-rose-50/30 transition-colors">
                      {/* Column 1: Mã hồ sơ */}
                      <td className="py-4 pl-6 font-mono font-bold text-rose-700 align-top">
                        {pm.hoSo?.maHoSo || "—"}
                      </td>

                      {/* Column 2: Hồ sơ & Vị trí kho */}
                      <td className="py-4 align-top pr-4">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-xs text-on-surface line-clamp-2">{pm.hoSo?.tenHoSo}</span>
                          {pm.hoSo?.viTri && (
                            <span className="inline-flex items-center gap-1 text-[11px] text-secondary font-mono">
                              <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                              {pm.hoSo.viTri.phongKho} - {pm.hoSo.viTri.keHang} - {pm.hoSo.viTri.nganChua}
                            </span>
                          )}
                          {pm.lyDoMuon && (
                            <span className="text-[11px] text-slate-500 italic">Lý do: "{pm.lyDoMuon}"</span>
                          )}
                        </div>
                      </td>

                      {/* Column 3: Người mượn */}
                      <td className="py-4 px-3 align-top">
                        <div className="flex flex-col">
                          <span className="font-bold text-on-surface">{pm.nguoiMuon?.hoTen}</span>
                          <span className="text-[10px] text-slate-400 font-mono">@{pm.nguoiMuon?.username}</span>
                          {pm.nguoiMuon?.email && (
                            <span className="text-[10px] text-slate-500 underline mt-0.5">{pm.nguoiMuon.email}</span>
                          )}
                        </div>
                      </td>

                      {/* Column 4: Hẹn trả & Số ngày quá hạn */}
                      <td className="py-4 px-3 align-top whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-700">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            Hẹn trả: <strong className="text-slate-900">{pm.ngayHenTra || "—"}</strong>
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-md border border-rose-200 w-fit">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                            Quá hạn {daysOverdue} ngày
                          </span>
                        </div>
                      </td>

                      {/* Column 5: Trạng thái */}
                      <td className="py-4 px-3 align-top whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-800 font-bold text-xs rounded-full border border-rose-300 shadow-sm animate-pulse">
                          <AlertCircle className="w-4 h-4 text-rose-600" /> Quá hạn mượn
                        </span>
                      </td>

                      {/* Column 6: Thao tác Nhận Trả */}
                      <td className="py-4 pr-6 align-top text-right whitespace-nowrap">
                        {isArchivistOrAdmin && (
                          <button
                            onClick={() => returnMutation.mutate(pm.id)}
                            disabled={returnMutation.isPending}
                            title="Xác nhận đã nhận lại hồ sơ về kho"
                            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1 ml-auto"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Nhận Trả Kho
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {loansData && loansData.totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-secondary">
              Trang {loansData.number + 1} / {loansData.totalPages} (Tổng {loansData.totalElements} phiếu quá hạn)
            </span>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-whisper-border bg-pure-surface hover:bg-slate-50 text-secondary disabled:opacity-40"
              >
                Trước
              </button>
              <button
                disabled={page >= loansData.totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-whisper-border bg-pure-surface hover:bg-slate-50 text-secondary disabled:opacity-40"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* QR SCANNER MODAL */}
      <QrScannerModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        title="Quét QR Nhận Trả Hồ Sơ Quá Hạn"
        onSuccessLoan={() => {
          queryClient.invalidateQueries({ queryKey: ["phieu-muon-overdue"] });
          queryClient.invalidateQueries({ queryKey: ["phieu-muon"] });
        }}
      />
    </div>
  );
}
