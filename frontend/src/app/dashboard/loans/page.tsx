"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/components/auth-context";
import { 
  getPhieuMuons, 
  pheDuyetPhieuMuon, 
  xacNhanTraHoSo, 
  PhieuMuon, 
  PhieuMuonPageResponse, 
  TrangThaiPhieuMuon 
} from "@/lib/loansApi";
import { QrScannerModal } from "@/components/QrScannerModal";
import { 
  BookOpenCheck, 
  Search, 
  QrCode, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  MapPin, 
  Calendar,
  AlertCircle,
  Check,
  X
} from "lucide-react";

export default function LoanManagementPage() {
  const { user, hasPermission } = useAuth();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const initialStatus = searchParams.get("status") || "ALL";
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [onlyMine, setOnlyMine] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const statusFromUrl = searchParams.get("status");
    if (statusFromUrl) {
      setStatusFilter(statusFromUrl);
    }
  }, [searchParams]);

  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Fetch Loans list
  const { data: loansData, isLoading } = useQuery<PhieuMuonPageResponse>({
    queryKey: ["phieu-muon", searchQuery, statusFilter, onlyMine, page],
    queryFn: () => getPhieuMuons({ query: searchQuery, status: statusFilter, onlyMine, page, size: 10 }),
  });

  // Approval Mutation
  const approveMutation = useMutation({
    mutationFn: ({ id, approve, ghiChu }: { id: number; approve: boolean; ghiChu?: string }) => 
      pheDuyetPhieuMuon(id, approve, ghiChu),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phieu-muon"] });
    },
    onError: (err: any) => {
      alert(err.message || "Xử lý thất bại");
    }
  });

  // Return Mutation
  const returnMutation = useMutation({
    mutationFn: (id: number) => xacNhanTraHoSo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["phieu-muon"] });
    },
    onError: (err: any) => {
      alert(err.message || "Xác nhận trả thất bại");
    }
  });

  const getStatusBadge = (status: TrangThaiPhieuMuon) => {
    switch (status) {
      case "CHO_DUYET":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 font-semibold text-[11px] rounded-full border border-amber-200 whitespace-nowrap">
            <Clock className="w-3 h-3" /> Chờ duyệt
          </span>
        );
      case "DANG_MUON":
      case "DA_DUYET":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-blue-700 font-semibold text-[11px] rounded-full border border-blue-200 whitespace-nowrap">
            <BookOpenCheck className="w-3 h-3" /> Đang mượn
          </span>
        );
      case "DA_TRA":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-semibold text-[11px] rounded-full border border-emerald-200 whitespace-nowrap">
            <CheckCircle2 className="w-3 h-3" /> Đã trả kho
          </span>
        );
      case "TU_CHOI":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-red-50 text-red-700 font-semibold text-[11px] rounded-full border border-red-200 whitespace-nowrap">
            <XCircle className="w-3 h-3" /> Từ chối
          </span>
        );
      case "QUA_HAN":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-800 font-bold text-xs rounded-full border border-rose-300 shadow-sm animate-pulse whitespace-nowrap">
            <AlertCircle className="w-4 h-4 text-rose-600" /> Quá hạn mượn
          </span>
        );
      default:
        return <span className="text-xs text-secondary">{status}</span>;
    }
  };

  const isArchivistOrAdmin = hasPermission("LOAN_MANAGE") || user?.role === "ADMIN" || user?.role === "RECORDS_OFFICER";

  return (
    <div className="flex flex-col w-full gap-8 animate-fade-in relative">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black tracking-tight text-on-surface">Mượn / Trả Hồ Sơ & Đặt Giữ</h1>
          <p className="text-sm text-secondary">Quản lý quy trình đăng ký giữ chỗ, phê duyệt và bàn giao hồ sơ vật lý trong kho.</p>
        </div>

        <button
          onClick={() => setIsQrModalOpen(true)}
          className="flex items-center gap-2 bg-primary text-on-primary px-5 py-3 rounded-full text-xs font-semibold shadow-md hover:bg-primary-container transition-all"
        >
          <QrCode className="w-4 h-4" />
          Quét QR / Tra Cứu Nhanh
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-pure-surface rounded-[2rem] p-6 md:p-8 flex flex-col gap-6 shadow-sm border border-whisper-border relative overflow-hidden">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
              placeholder="Tìm kiếm theo mã hồ sơ, tên người mượn..."
              className="w-full bg-surface-container-low text-on-surface pl-12 pr-4 py-3 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 border border-transparent"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => { setOnlyMine(!onlyMine); setPage(0); }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                onlyMine 
                  ? "bg-primary/10 text-primary border-primary/30 font-bold" 
                  : "bg-surface-container-low border-whisper-border text-secondary hover:bg-slate-100"
              }`}
            >
              {onlyMine ? "✓ Phiếu của tôi" : "Tất cả phiếu"}
            </button>

            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}
              className="bg-surface-container-low text-xs border border-whisper-border rounded-xl px-4 py-2.5 text-on-surface focus:outline-none"
            >
              <option value="ALL">-- Tất cả trạng thái --</option>
              <option value="CHO_DUYET">Chờ Duyệt Bàn Giao</option>
              <option value="DANG_MUON">Đang Mượn</option>
              <option value="QUA_HAN">Quá Hạn Mượn</option>
              <option value="DA_TRA">Đã Nhận Trả Kho</option>
              <option value="TU_CHOI">Từ Chối</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto border border-whisper-border rounded-2xl bg-pure-surface">
          {isLoading ? (
            <div className="flex items-center justify-center py-16 gap-2 text-primary font-medium text-xs">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Đang tải danh sách phiếu mượn...</span>
            </div>
          ) : !loansData || loansData.content.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
              <AlertCircle className="w-10 h-10" />
              <span className="text-xs font-medium">Chưa có phiếu mượn nào khớp với điều kiện lọc</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[1100px] layout-fixed">
              <thead>
                <tr className="text-secondary font-mono text-[10px] uppercase tracking-wider border-b border-whisper-border bg-slate-50/80">
                  <th className="py-3.5 pl-6 font-semibold w-[140px]">Mã Hồ Sơ</th>
                  <th className="py-3.5 font-semibold w-[280px]">Hồ Sơ & Vị Trí Kho</th>
                  <th className="py-3.5 font-semibold w-[160px] px-3">Người Mượn</th>
                  <th className="py-3.5 font-semibold w-[170px] px-3">Thời Gian</th>
                  <th className="py-3.5 font-semibold w-[160px] px-3">Người Duyệt</th>
                  <th className="py-3.5 font-semibold w-[120px] px-3">Trạng Thái</th>
                  <th className="py-3.5 pr-6 font-semibold text-right w-[150px]">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-whisper-border">
                {loansData.content.map((pm) => (
                  <tr key={pm.id} className="hover:bg-pure-surface/60 transition-colors">
                    {/* Column 1: Mã hồ sơ */}
                    <td className="py-4 pl-6 font-mono font-bold text-primary align-top">
                      {pm.hoSo?.maHoSo || "—"}
                    </td>

                    {/* Column 2: Hồ sơ & Vị trí kho */}
                    <td className="py-4 align-top pr-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-xs text-on-surface line-clamp-2">{pm.hoSo?.tenHoSo}</span>
                        {pm.hoSo?.viTri && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-secondary font-mono">
                            <MapPin className="w-3 h-3 text-primary shrink-0" />
                            {pm.hoSo.viTri.phongKho} - {pm.hoSo.viTri.keHang} - {pm.hoSo.viTri.nganChua}
                          </span>
                        )}
                        {pm.lyDoMuon && (
                          <span className="text-[11px] text-slate-500 italic">Lý do: "{pm.lyDoMuon}"</span>
                        )}
                      </div>
                    </td>

                    {/* Column 3: Người đăng ký mượn */}
                    <td className="py-4 px-3 align-top">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">{pm.nguoiMuon?.hoTen}</span>
                        <span className="text-[10px] text-slate-400">@{pm.nguoiMuon?.username}</span>
                      </div>
                    </td>

                    {/* Column 4: Thời gian tạo & hẹn trả */}
                    <td className="py-4 px-3 align-top whitespace-nowrap text-secondary">
                      <div className="flex flex-col gap-0.5">
                        <span className="inline-flex items-center gap-1 text-[11px]">
                          <span className="text-slate-400">Tạo:</span>
                          <span className="font-mono font-medium text-slate-700">
                            {pm.ngayYeuCau ? pm.ngayYeuCau.replace("T", " ").substring(0, 16) : "—"}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px]">
                          <span className="text-slate-400">Hẹn trả:</span>
                          <span className="font-mono font-bold text-primary">
                            {pm.ngayHenTra || "—"}
                          </span>
                        </span>
                      </div>
                    </td>

                    {/* Column 5: Người duyệt cuối */}
                    <td className="py-4 px-3 align-top">
                      {pm.nguoiDuyet ? (
                        <div className="flex flex-col">
                          <span className="font-semibold text-emerald-800">{pm.nguoiDuyet.hoTen}</span>
                          <span className="text-[10px] text-emerald-600 font-mono">@{pm.nguoiDuyet.username}</span>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Chưa duyệt</span>
                      )}
                    </td>

                    {/* Column 6: Trạng thái */}
                    <td className="py-4 px-3 align-top whitespace-nowrap">
                      {getStatusBadge(pm.trangThai)}
                    </td>

                    {/* Column 7: Thao tác duyệt compact */}
                    <td className="py-4 pr-6 align-top text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {pm.trangThai === "CHO_DUYET" && isArchivistOrAdmin && (
                          <>
                            <button
                              onClick={() => approveMutation.mutate({ id: pm.id, approve: true })}
                              disabled={approveMutation.isPending}
                              title="Duyệt bàn giao hồ sơ"
                              className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1"
                            >
                              <Check className="w-3.5 h-3.5" /> Duyệt
                            </button>
                            <button
                              onClick={() => approveMutation.mutate({ id: pm.id, approve: false })}
                              disabled={approveMutation.isPending}
                              title="Từ chối yêu cầu mượn"
                              className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-danger-red border border-red-200 rounded-lg text-xs font-semibold transition-all flex items-center gap-1"
                            >
                              <X className="w-3.5 h-3.5" /> Từ chối
                            </button>
                          </>
                        )}

                        {(pm.trangThai === "DANG_MUON" || pm.trangThai === "QUA_HAN") && isArchivistOrAdmin && (
                          <button
                            onClick={() => returnMutation.mutate(pm.id)}
                            disabled={returnMutation.isPending}
                            title="Xác nhận đã nhận lại hồ sơ về kho"
                            className="px-2.5 py-1.5 bg-primary hover:bg-primary-container text-on-primary rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1"
                          >
                            <RotateCcw className="w-3.5 h-3.5" /> Nhận Trả
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {loansData && loansData.totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-secondary">
              Trang {loansData.number + 1} / {loansData.totalPages} (Tổng {loansData.totalElements} phiếu)
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
        onSuccessLoan={() => queryClient.invalidateQueries({ queryKey: ["phieu-muon"] })}
      />
    </div>
  );
}
