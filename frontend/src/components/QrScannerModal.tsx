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
  BookOpenCheck
} from "lucide-react";
import { decodeQrImage } from "@/lib/loansApi";
import { searchHoSo, HoSo } from "@/lib/recordsApi";
import { CreateLoanModal } from "@/components/CreateLoanModal";

interface QrScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecord?: (record: HoSo) => void;
  onSuccessLoan?: () => void;
}

export function QrScannerModal({ isOpen, onClose, onSelectRecord, onSuccessLoan }: QrScannerModalProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "manual">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const [manualCode, setManualCode] = useState("");
  const [scannedRecords, setScannedRecords] = useState<HoSo[]>([]);
  
  // State for CreateLoanModal popup
  const [loanRecordTarget, setLoanRecordTarget] = useState<HoSo | null>(null);

  if (!isOpen) return null;

  const handleUploadDecode = async (file: File) => {
    setSelectedFile(file);
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    setScannedRecords([]);

    try {
      const res = await decodeQrImage(file);
      if (res.maHoSo) {
        setManualCode(res.maHoSo);
        await fetchRecordByCode(res.maHoSo);
      } else {
        setErrorMsg("Không tìm thấy thông tin mã hồ sơ trong tệp QR.");
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

    try {
      const res = await searchHoSo({ query: keyword.trim(), page: 0, size: 10 });
      if (res.content && res.content.length > 0) {
        setScannedRecords(res.content);
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

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
        <div className="bg-pure-surface rounded-[2rem] border border-whisper-border shadow-2xl w-full max-w-xl overflow-hidden flex flex-col animate-fade-in max-h-[85vh] my-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-whisper-border bg-slate-50/50 shrink-0">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <QrCode className="w-5 h-5 text-primary" />
              Tra Cứu / Quét Mã QR Hồ Sơ
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
              Tải Ảnh Mã QR (Không Cần Camera)
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
              Nhập Mã / Máy Quét Vạch
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 flex flex-col gap-5 overflow-y-auto flex-1 min-h-0">
            {/* TAB 1: UPLOAD QR IMAGE */}
            {activeTab === "upload" && (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-secondary">
                  Dành cho máy tính PC không có Camera: Tải tệp ảnh chứa mã QR (PNG, JPG) hoặc ảnh chụp màn hình để hệ thống tự động giải mã.
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

            {/* TAB 2: MANUAL ENTRY / RELATIVE SEARCH */}
            {activeTab === "manual" && (
              <form onSubmit={handleManualSubmit} className="flex flex-col gap-4">
                <p className="text-xs text-secondary">
                  Tìm kiếm tương đối theo mã hoặc tên hồ sơ (Ví dụ: nhập <code className="bg-slate-100 px-1 py-0.5 rounded text-primary">HS-202</code> để tìm tất cả hồ sơ khớp):
                </p>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => {
                      setManualCode(e.target.value);
                      if (e.target.value.trim().length >= 2) {
                        fetchRecordByCode(e.target.value);
                      }
                    }}
                    placeholder="Nhập từ khóa mã hồ sơ hoặc tên (VD: HS-202)..."
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
                <span>Đang tra cứu danh sách hồ sơ...</span>
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

            {/* LIST RESULTS DISPLAY WITH BORROW POPUP BUTTON */}
            {scannedRecords.length > 0 && (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    Tìm thấy {scannedRecords.length} hồ sơ phù hợp
                  </span>
                </div>

                <div className="flex flex-col gap-2.5 max-h-[250px] overflow-y-auto pr-1">
                  {scannedRecords.map((record) => {
                    const isAvailable = record.trangThai === "DANG_LUU_KHO";

                    return (
                      <div
                        key={record.id}
                        className="p-3.5 bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200/80 rounded-2xl flex items-center justify-between gap-4 transition-colors"
                      >
                        <div className="flex flex-col gap-1 overflow-hidden">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">
                              {record.maHoSo}
                            </span>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                            }`}>
                              {isAvailable ? "Đang lưu kho" : record.trangThai === "DA_DAT_GIU" ? "Đã đặt giữ" : record.trangThai}
                            </span>
                          </div>
                          <h4 className="font-bold text-xs text-on-surface truncate">{record.tenHoSo}</h4>
                          <p className="text-[11px] text-secondary truncate">
                            Kho: <b>{record.viTri ? `${record.viTri.phongKho} / ${record.viTri.keHang} / ${record.viTri.nganChua}` : "Chưa gán"}</b>
                          </p>
                        </div>

                        {/* Prominent Action Button -> Opens CreateLoanModal popup */}
                        <div>
                          {isAvailable ? (
                            <button
                              onClick={() => handleOpenLoanPopup(record)}
                              className="shrink-0 px-3.5 py-2 bg-primary hover:bg-primary-container text-on-primary font-semibold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all whitespace-nowrap"
                            >
                              <BookOpenCheck className="w-3.5 h-3.5" />
                              Tạo Phiếu Mượn
                            </button>
                          ) : (
                            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl whitespace-nowrap inline-block">
                              Không khả dụng
                            </span>
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
