"use client";

import React, { useState } from "react";
import { 
  QrCode, 
  Upload, 
  Keyboard, 
  X, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Search,
  BookOpenCheck,
  RotateCcw,
  User,
  Calendar,
  Clock,
  Check,
  MapPin
} from "lucide-react";
import { 
  decodeQrImage, 
  getCurrentLoanByMaHoSo, 
  xacNhanTraHoSo, 
  pheDuyetPhieuMuon, 
  PhieuMuon 
} from "@/lib/loansApi";
import { searchHoSo, HoSo } from "@/lib/recordsApi";
import { CreateLoanModal } from "@/components/CreateLoanModal";
import { useAuth } from "@/components/auth-context";

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecord?: (record: HoSo) => void;
  onSuccessLoan?: () => void;
  title?: string;
  defaultTab?: "upload" | "manual";
}

export function QrScannerModal({ 
  isOpen, 
  onClose, 
  onSelectRecord, 
  onSuccessLoan,
  title = "Tra Cứu & Quét QR Mượn - Trả Hồ Sơ",
  defaultTab = "upload"
}: QrScannerModalProps) {
  const { user, hasPermission } = useAuth();
  const isArchivistOrAdmin = hasPermission("LOAN_MANAGE") || user?.role === "ADMIN" || user?.role === "RECORDS_OFFICER";

  const [activeTab, setActiveTab] = useState<"upload" | "manual">(defaultTab);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const [manualCode, setManualCode] = useState("");
  const [scannedRecords, setScannedRecords] = useState<HoSo[]>([]);
  const [activeLoans, setActiveLoans] = useState<Record<string, PhieuMuon | null>>({});
  
  // State for CreateLoanModal popup
  const [loanRecordTarget, setLoanRecordTarget] = useState<HoSo | null>(null);

  if (!isOpen) return null;

  const getOverdueDays = (ngayHenTraStr?: string) => {
    if (!ngayHenTraStr) return 0;
    const due = new Date(ngayHenTraStr);
    const today = new Date();
    due.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const handleUploadDecode = async (file: File) => {
    setSelectedFile(file);
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setScannedRecords([]);
    setActiveLoans({});

    try {
      const res = await decodeQrImage(file);
      if (res.maHoSo) {
        setManualCode(res.maHoSo);
        await fetchRecordByCode(res.maHoSo);
      } else {
        setErrorMsg("Không tìm thấy thông tin mã hồ sơ trong tệp ảnh QR này.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Không thể đọc mã QR từ tệp ảnh này.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecordByCode = async (keyword: string) => {
    if (!keyword || !keyword.trim()) return;
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setScannedRecords([]);
    setActiveLoans({});

    try {
      const res = await searchHoSo({ query: keyword.trim(), page: 0, size: 10 });
      if (res.content && res.content.length > 0) {
        setScannedRecords(res.content);

        // Retrieve current active loans for each record in parallel
        const loanMap: Record<string, PhieuMuon | null> = {};
        await Promise.all(
          res.content.map(async (rec) => {
            try {
              const loan = await getCurrentLoanByMaHoSo(rec.maHoSo);
              if (loan) {
                loanMap[rec.maHoSo] = loan;
              }
            } catch (ignored) {}
          })
        );
        setActiveLoans(loanMap);
      } else {
        setErrorMsg(`Không tìm thấy hồ sơ nào khớp với từ khóa "${keyword}"`);
      }
    } catch (err: any) {
      setErrorMsg("Lỗi khi tra cứu thông tin hồ sơ");
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    fetchRecordByCode(manualCode);
  };

  const handleOpenLoanPopup = (record: HoSo) => {
    if (onSelectRecord) {
      onSelectRecord(record);
      onClose();
      return;
    }
    setLoanRecordTarget(record);
  };

  // Quick return handler (requires LOAN_MANAGE)
  const handleReturnLoan = async (record: HoSo, loanId: number) => {
    if (!isArchivistOrAdmin) return;
    setActionLoadingId(loanId);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      await xacNhanTraHoSo(loanId);
      setSuccessMsg(`✓ Đã nhận trả kho thành công hồ sơ "${record.tenHoSo}" (${record.maHoSo})!`);
      // Update UI state
      setScannedRecords((prev) =>
        prev.map((r) => (r.id === record.id ? { ...r, trangThai: "DANG_LUU_KHO" as any } : r))
      );
      setActiveLoans((prev) => {
        const next = { ...prev };
        delete next[record.maHoSo];
        return next;
      });
      if (onSuccessLoan) {
        onSuccessLoan();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Xác nhận nhận trả hồ sơ thất bại");
    } finally {
      setActionLoadingId(null);
    }
  };

  // Quick approve/reject loan handler (requires LOAN_MANAGE)
  const handleApproveLoan = async (record: HoSo, loanId: number, approve: boolean) => {
    if (!isArchivistOrAdmin) return;
    setActionLoadingId(loanId);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      await pheDuyetPhieuMuon(loanId, approve);
      setSuccessMsg(
        approve 
          ? `✓ Đã duyệt bàn giao hồ sơ "${record.tenHoSo}" (${record.maHoSo})!`
          : `✓ Đã từ chối yêu cầu mượn hồ sơ "${record.tenHoSo}"!`
      );
      setScannedRecords((prev) =>
        prev.map((r) =>
          r.id === record.id
            ? { ...r, trangThai: (approve ? "DA_MUON" : "DANG_LUU_KHO") as any }
            : r
        )
      );
      if (approve) {
        setActiveLoans((prev) => ({
          ...prev,
          [record.maHoSo]: prev[record.maHoSo] ? { ...prev[record.maHoSo]!, trangThai: "DANG_MUON" } : null
        }));
      } else {
        setActiveLoans((prev) => {
          const next = { ...prev };
          delete next[record.maHoSo];
          return next;
        });
      }
      if (onSuccessLoan) {
        onSuccessLoan();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Xử lý duyệt thất bại");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
        <div className="bg-pure-surface rounded-[2rem] border border-whisper-border shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-fade-in max-h-[88vh] my-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-whisper-border bg-slate-50/50 shrink-0">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <QrCode className="w-5 h-5 text-primary" />
              {title}
            </h3>
            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-on-surface hover:bg-slate-200/60 rounded-full transition-colors"
              title="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-whisper-border bg-surface-container-low px-6 shrink-0">
            <button
              onClick={() => { setActiveTab("upload"); setErrorMsg(null); setSuccessMsg(null); }}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === "upload"
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-on-surface"
              }`}
            >
              <Upload className="w-4 h-4" />
              Tải Ảnh Mã QR (Tem Dán Hồ Sơ)
            </button>

            <button
              onClick={() => { setActiveTab("manual"); setErrorMsg(null); setSuccessMsg(null); }}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-colors ${
                activeTab === "manual"
                  ? "border-primary text-primary"
                  : "border-transparent text-secondary hover:text-on-surface"
              }`}
            >
              <Keyboard className="w-4 h-4" />
              Nhập Mã / Máy Quét Cầm Tay
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0">
            {/* TAB 1: UPLOAD QR IMAGE */}
            {activeTab === "upload" && (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-secondary">
                  Tải ảnh tem QR dán trên bìa hồ sơ hoặc ảnh chụp màn hình mã QR để hệ thống tự động nhận diện và xử lý mượn / trả.
                </p>
                
                <div className="border-2 border-dashed border-whisper-border hover:border-primary/50 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer relative">
                  <Upload className="w-8 h-8 text-primary" />
                  <div className="text-center">
                    <span className="text-xs font-semibold text-on-surface block">
                      {selectedFile ? selectedFile.name : "Kéo thả hoặc chọn tệp ảnh QR"}
                    </span>
                    <span className="text-[11px] text-slate-400">Hỗ trợ PNG, JPG, JPEG</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleUploadDecode(f);
                    }}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: MANUAL ENTRY / SCANNER GUN */}
            {activeTab === "manual" && (
              <form onSubmit={handleManualSubmit} className="flex flex-col gap-4">
                <p className="text-xs text-secondary">
                  Bắn máy quét mã vạch / QR vào ô bên dưới, hoặc nhập mã hồ sơ (Ví dụ: <code className="bg-slate-100 px-1 py-0.5 rounded text-primary">HS-2026-2ED6</code>):
                </p>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
                  <input
                    type="text"
                    value={manualCode}
                    autoFocus
                    onChange={(e) => {
                      setManualCode(e.target.value);
                      if (e.target.value.trim().length >= 3) {
                        fetchRecordByCode(e.target.value);
                      }
                    }}
                    placeholder="Quét mã vạch hoặc nhập mã hồ sơ..."
                    className="w-full bg-surface-container-low pl-10 pr-24 py-3 rounded-xl text-xs border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary-container"
                  >
                    Tra cứu
                  </button>
                </div>
              </form>
            )}

            {/* LOADING & NOTIFICATION STATES */}
            {loading && (
              <div className="flex items-center justify-center py-6 gap-2 text-xs text-primary font-medium">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Đang tra cứu dữ liệu hồ sơ & trạng thái mượn trả...</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-red-50 text-danger-red border border-red-200 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* LIST RESULTS WITH SMART LOAN ACTIONS */}
            {scannedRecords.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Tìm thấy {scannedRecords.length} hồ sơ phù hợp
                  </span>
                </div>

                <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-1">
                  {scannedRecords.map((record) => {
                    const loan = activeLoans[record.maHoSo];
                    const isOverdue = loan?.trangThai === "QUA_HAN";
                    const isBorrowing = loan?.trangThai === "DANG_MUON" || loan?.trangThai === "DA_DUYET";
                    const isPending = loan?.trangThai === "CHO_DUYET";
                    const isAvailable = record.trangThai === "DANG_LUU_KHO" && !loan;
                    const overdueDays = isOverdue ? getOverdueDays(loan?.ngayHenTra) : 0;
                    const isProcessing = actionLoadingId === loan?.id;

                    return (
                      <div
                        key={record.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                          isOverdue 
                            ? "bg-rose-50/70 border-rose-200 hover:bg-rose-50" 
                            : isBorrowing
                              ? "bg-blue-50/50 border-blue-200 hover:bg-blue-50"
                              : isPending
                                ? "bg-amber-50/50 border-amber-200 hover:bg-amber-50"
                                : "bg-emerald-50/50 border-emerald-200 hover:bg-emerald-50"
                        }`}
                      >
                        {/* Record Info */}
                        <div className="flex flex-col gap-1.5 overflow-hidden flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-white/80 border border-slate-200 text-slate-800 rounded-md">
                              {record.maHoSo}
                            </span>

                            {/* Status Badge */}
                            {isOverdue && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                                Quá hạn {overdueDays > 0 ? `${overdueDays} ngày` : ""}
                              </span>
                            )}

                            {isBorrowing && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                                <BookOpenCheck className="w-3.5 h-3.5 text-blue-600" />
                                Đang mượn
                              </span>
                            )}

                            {isPending && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                                <Clock className="w-3.5 h-3.5 text-amber-600" />
                                Chờ duyệt bàn giao
                              </span>
                            )}

                            {isAvailable && (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Đang lưu kho (Khả dụng)
                              </span>
                            )}

                            {!isOverdue && !isBorrowing && !isPending && !isAvailable && (
                              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                {record.trangThai}
                              </span>
                            )}
                          </div>

                          <h4 className="font-bold text-xs text-on-surface line-clamp-1">{record.tenHoSo}</h4>

                          <div className="flex items-center gap-3 text-[11px] text-secondary flex-wrap">
                            <span className="inline-flex items-center gap-1 font-mono">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {record.viTri ? `${record.viTri.phongKho} / ${record.viTri.keHang} / ${record.viTri.nganChua}` : "Chưa gán kho"}
                            </span>

                            {/* Borrower info if loan active */}
                            {loan && (
                              <>
                                <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
                                  <User className="w-3 h-3 text-slate-400" />
                                  Người mượn: {loan.nguoiMuon?.hoTen} (@{loan.nguoiMuon?.username})
                                </span>
                                <span className="inline-flex items-center gap-1 font-mono text-slate-600">
                                  <Calendar className="w-3 h-3 text-slate-400" />
                                  Hạn trả: {loan.ngayHenTra || "—"}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons (Strictly Permission-Gated) */}
                        <div className="shrink-0 flex items-center gap-2">
                          {/* Case 1: Overdue or Borrowing -> Quick Return */}
                          {(isOverdue || isBorrowing) && loan && (
                            isArchivistOrAdmin ? (
                              <button
                                onClick={() => handleReturnLoan(record, loan.id)}
                                disabled={isProcessing}
                                className={`px-4 py-2 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap ${
                                  isOverdue 
                                    ? "bg-rose-600 hover:bg-rose-700" 
                                    : "bg-primary hover:bg-primary-container"
                                } disabled:opacity-50`}
                              >
                                {isProcessing ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <RotateCcw className="w-3.5 h-3.5" />
                                )}
                                Xác Nhận Nhận Trả Kho
                              </button>
                            ) : (
                              <span className="text-[11px] font-medium text-slate-500 italic">
                                Chỉ cán bộ kho mới có quyền nhận trả
                              </span>
                            )
                          )}

                          {/* Case 2: Pending Approval -> Quick Approve/Reject */}
                          {isPending && loan && (
                            isArchivistOrAdmin ? (
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleApproveLoan(record, loan.id, true)}
                                  disabled={isProcessing}
                                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1 shadow-sm transition-all whitespace-nowrap disabled:opacity-50"
                                >
                                  {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                  Duyệt Bàn Giao
                                </button>
                                <button
                                  onClick={() => handleApproveLoan(record, loan.id, false)}
                                  disabled={isProcessing}
                                  className="px-2.5 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 font-semibold text-xs rounded-xl flex items-center gap-1 transition-all whitespace-nowrap disabled:opacity-50"
                                >
                                  <X className="w-3.5 h-3.5" />
                                  Từ chối
                                </button>
                              </div>
                            ) : (
                              <span className="text-[11px] font-medium text-amber-700 bg-amber-100/60 px-3 py-1.5 rounded-xl whitespace-nowrap">
                                Đang chờ cán bộ duyệt
                              </span>
                            )
                          )}

                          {/* Case 3: Available in Storage -> Create Loan */}
                          {isAvailable && (
                            <button
                              onClick={() => handleOpenLoanPopup(record)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
                            >
                              <BookOpenCheck className="w-3.5 h-3.5" />
                              Tạo Phiếu Mượn
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* POPUP CONFIRM & CHANGE RETURN DATE */}
      <CreateLoanModal
        isOpen={!!loanRecordTarget}
        onClose={() => setLoanRecordTarget(null)}
        record={loanRecordTarget}
        onSuccess={() => {
          if (loanRecordTarget) {
            setSuccessMsg(`Đã tạo thành công phiếu mượn cho hồ sơ "${loanRecordTarget.tenHoSo}"!`);
            setScannedRecords((prev) =>
              prev.map((item) =>
                item.id === loanRecordTarget.id ? { ...item, trangThai: "DA_DAT_GIU" as any } : item
              )
            );
          }
          if (onSuccessLoan) {
            onSuccessLoan();
          }
        }}
      />
    </>
  );
}
