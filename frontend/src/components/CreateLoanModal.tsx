"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, FileText, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { datGiuHoSo } from "@/lib/loansApi";
import { HoSo } from "@/lib/recordsApi";

interface CreateLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: HoSo | null;
  onSuccess?: () => void;
}

export function CreateLoanModal({ isOpen, onClose, record, onSuccess }: CreateLoanModalProps) {
  // Default date = 7 days from today
  const defaultDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const todayStr = new Date().toISOString().split("T")[0];

  const [ngayHenTra, setNgayHenTra] = useState(defaultDate);
  const [lyDoMuon, setLyDoMuon] = useState("Mượn tra cứu / nghiên cứu tài liệu");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setNgayHenTra(defaultDate);
      setLyDoMuon("Mượn tra cứu / nghiên cứu tài liệu");
      setErrorMsg(null);
    }
  }, [isOpen]);

  if (!isOpen || !record) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      await datGiuHoSo(record.id, ngayHenTra, lyDoMuon);
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Không thể tạo phiếu mượn cho hồ sơ này");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center p-4">
      <div className="bg-pure-surface rounded-3xl border border-whisper-border shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-fade-in my-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-whisper-border bg-slate-50/50 shrink-0">
          <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Đăng Ký Mượn / Đặt Giữ Hồ Sơ
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-on-surface hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {/* Target Record Info */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex flex-col gap-1">
            <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md w-fit">
              {record.maHoSo}
            </span>
            <h4 className="font-bold text-xs text-on-surface mt-1">{record.tenHoSo}</h4>
            <p className="text-[11px] text-secondary">
              Vị trí kho: <b>{record.viTri ? `${record.viTri.phongKho} / ${record.viTri.keHang} / ${record.viTri.nganChua}` : "Chưa gán"}</b>
            </p>
          </div>

          {/* Form Field 1: Ngay Hen Tra */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              Ngày hẹn trả dự kiến:
            </label>
            <input
              type="date"
              min={todayStr}
              value={ngayHenTra}
              onChange={(e) => setNgayHenTra(e.target.value)}
              required
              className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-xs border border-whisper-border focus:outline-none focus:ring-2 focus:ring-primary/30 font-medium"
            />
          </div>

          {/* Form Field 2: Ly Do Muon */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-on-surface flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-primary" />
              Lý do mượn hồ sơ:
            </label>
            <textarea
              rows={3}
              value={lyDoMuon}
              onChange={(e) => setLyDoMuon(e.target.value)}
              placeholder="Nhập lý do sử dụng hồ sơ..."
              required
              className="w-full bg-surface-container-low px-3.5 py-2.5 rounded-xl text-xs border border-whisper-border focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 text-danger-red border border-red-200 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-2 pt-3 border-t border-whisper-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-secondary hover:bg-slate-100 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              Xác Nhận Đặt Giữ Mượn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
