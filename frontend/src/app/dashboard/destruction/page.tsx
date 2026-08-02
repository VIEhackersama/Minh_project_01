"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-context";
import { 
  Flame, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  FileText, 
  Send, 
  CheckSquare, 
  X,
  RefreshCw,
  Archive,
  ShieldAlert
} from "lucide-react";
import { apiClient } from "@/lib/api";

export default function DestructionPage() {
  const { user } = useAuth();

  if (user && user.role !== "ADMIN" && user.role !== "RECORDS_OFFICER") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <ShieldAlert className="w-16 h-16 text-rose-500" />
        <h2 className="text-xl font-bold text-on-surface">Không Có Quyền Truy Cập</h2>
        <p className="text-sm text-secondary max-w-md">
          Chức năng Quản lý Tiêu hủy Hồ sơ chỉ dành riêng cho Cán bộ Văn thư & Quản trị viên.
        </p>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<"eligible" | "proposals">("eligible");
  
  // Eligible records
  const [eligibleRecords, setEligibleRecords] = useState<any[]>([]);
  const [selectedRecordIds, setSelectedRecordIds] = useState<number[]>([]);
  const [loadingEligible, setLoadingEligible] = useState(false);

  // Proposals
  const [proposals, setProposals] = useState<any[]>([]);
  const [loadingProposals, setLoadingProposals] = useState(false);

  // Modal create proposal
  const [showModal, setShowModal] = useState(false);
  const [lyDoTieuHuy, setLyDoTieuHuy] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchEligibleRecords = async () => {
    try {
      setLoadingEligible(true);
      const res = await apiClient.get<any[]>("/destruction/eligible");
      setEligibleRecords(res || []);
    } catch (err) {
      console.error("Lỗi khi tải hồ sơ đủ điều kiện tiêu hủy:", err);
    } finally {
      setLoadingEligible(false);
    }
  };

  const fetchProposals = async () => {
    try {
      setLoadingProposals(true);
      const res = await apiClient.get<any>("/destruction");
      setProposals(res.content || []);
    } catch (err) {
      console.error("Lỗi khi tải danh sách đề xuất tiêu hủy:", err);
    } finally {
      setLoadingProposals(false);
    }
  };

  useEffect(() => {
    fetchEligibleRecords();
    fetchProposals();
  }, []);

  const handleSelectRecord = (id: number) => {
    if (selectedRecordIds.includes(id)) {
      setSelectedRecordIds(selectedRecordIds.filter((item) => item !== id));
    } else {
      setSelectedRecordIds([...selectedRecordIds, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRecordIds.length === eligibleRecords.length) {
      setSelectedRecordIds([]);
    } else {
      setSelectedRecordIds(eligibleRecords.map((r) => r.id));
    }
  };

  const handleCreateProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRecordIds.length === 0) {
      setMessage({ type: "error", text: "Vui lòng chọn ít nhất 1 hồ sơ để lập đề xuất tiêu hủy." });
      return;
    }
    if (!lyDoTieuHuy.trim()) {
      setMessage({ type: "error", text: "Vui lòng nhập lý do tiêu hủy." });
      return;
    }

    try {
      setSubmitting(true);
      await apiClient.post("/destruction", {
        lyDoTieuHuy: lyDoTieuHuy.trim(),
        hoSoIds: selectedRecordIds
      });
      setMessage({ type: "success", text: "Tạo đề xuất tiêu hủy mới thành công!" });
      setShowModal(false);
      setLyDoTieuHuy("");
      setSelectedRecordIds([]);
      fetchEligibleRecords();
      fetchProposals();
      setActiveTab("proposals");
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Lỗi khi tạo đề xuất tiêu hủy." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitProposal = async (id: number) => {
    try {
      await apiClient.post(`/destruction/${id}/submit`, {});
      setMessage({ type: "success", text: "Đã trình duyệt đề xuất tiêu hủy thành công!" });
      fetchProposals();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Lỗi khi trình duyệt." });
    }
  };

  const handleApproveProposal = async (id: number) => {
    try {
      await apiClient.post(`/destruction/${id}/approve`, {});
      setMessage({ type: "success", text: "Phê duyệt đề xuất tiêu hủy thành công!" });
      fetchProposals();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Lỗi khi phê duyệt." });
    }
  };

  const handleExecuteProposal = async (id: number) => {
    try {
      await apiClient.post(`/destruction/${id}/execute`, {});
      setMessage({ type: "success", text: "Đã thực thi tiêu hủy các hồ sơ theo đề xuất!" });
      fetchProposals();
      fetchEligibleRecords();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Lỗi khi thực thi tiêu hủy." });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DU_THAO":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">Dự thảo</span>;
      case "CHO_DUYET":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">Chờ duyệt</span>;
      case "DA_DUYET":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">Đã duyệt</span>;
      case "DA_THUC_HIEN":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Đã thực hiện</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col w-full gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-on-surface flex items-center gap-3">
            <Flame className="w-7 h-7 text-orange-500" />
            Quản Lý Tiêu Hủy Hồ Sơ
          </h1>
          <p className="text-sm text-secondary mt-1">
            Quy trình lập đề xuất, trình duyệt và thực thi tiêu hủy hồ sơ quá thời hạn lưu kho bảo quản.
          </p>
        </div>

        {activeTab === "eligible" && selectedRecordIds.length > 0 && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-danger-red hover:bg-danger-red/90 text-white font-semibold text-xs rounded-xl shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            Lập Đề Xuất Tiêu Hủy ({selectedRecordIds.length})
          </button>
        )}
      </div>

      {message && (
        <div className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
          message.type === "success" ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-rose-50 text-rose-800 border-rose-200"
        }`}>
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="p-1 hover:opacity-75"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-whisper-border">
        <button
          onClick={() => setActiveTab("eligible")}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 ${
            activeTab === "eligible"
              ? "border-primary text-primary"
              : "border-transparent text-secondary hover:text-on-surface"
          }`}
        >
          Hồ sơ Hết hạn Bảo quản ({eligibleRecords.length})
        </button>
        <button
          onClick={() => setActiveTab("proposals")}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 ${
            activeTab === "proposals"
              ? "border-primary text-primary"
              : "border-transparent text-secondary hover:text-on-surface"
          }`}
        >
          Danh sách Đề xuất Tiêu hủy ({proposals.length})
        </button>
      </div>

      {/* Tab 1: Eligible Records */}
      {activeTab === "eligible" && (
        <div className="bg-pure-surface rounded-3xl border border-whisper-border p-6 shadow-sm">
          {loadingEligible ? (
            <div className="py-12 text-center text-xs text-secondary">Đang tải hồ sơ hết hạn lưu kho...</div>
          ) : eligibleRecords.length === 0 ? (
            <div className="py-12 text-center text-xs text-secondary flex flex-col items-center gap-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              <span>Không có hồ sơ nào quá thời hạn bảo quản lưu kho hiện tại.</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container-low text-on-surface-variant uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-4 rounded-l-xl">
                      <input
                        type="checkbox"
                        checked={selectedRecordIds.length === eligibleRecords.length && eligibleRecords.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-slate-300 text-primary focus:ring-primary"
                      />
                    </th>
                    <th className="p-4">Mã Hồ Sơ</th>
                    <th className="p-4">Tên Hồ Sơ</th>
                    <th className="p-4">Thời Hạn Bảo Quản Đến</th>
                    <th className="p-4">Danh Mục</th>
                    <th className="p-4 rounded-r-xl">Trạng Thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-whisper-border">
                  {eligibleRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={selectedRecordIds.includes(record.id)}
                          onChange={() => handleSelectRecord(record.id)}
                          className="rounded border-slate-300 text-primary focus:ring-primary"
                        />
                      </td>
                      <td className="p-4 font-mono font-bold text-primary">{record.maHoSo}</td>
                      <td className="p-4 font-semibold text-on-surface">{record.tenHoSo}</td>
                      <td className="p-4 text-danger-red font-medium">{record.thoiHanBaoQuanDen || "Đã hết hạn"}</td>
                      <td className="p-4 text-secondary">{record.danhMuc?.tenLoai || "-"}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {record.trangThai === "DANG_LUU_KHO" ? "Đang lưu kho" : record.trangThai}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Proposals List */}
      {activeTab === "proposals" && (
        <div className="bg-pure-surface rounded-3xl border border-whisper-border p-6 shadow-sm">
          {loadingProposals ? (
            <div className="py-12 text-center text-xs text-secondary">Đang tải danh sách đề xuất...</div>
          ) : proposals.length === 0 ? (
            <div className="py-12 text-center text-xs text-secondary">Chưa có đề xuất tiêu hủy nào được tạo.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-container-low text-on-surface-variant uppercase font-mono text-[10px]">
                  <tr>
                    <th className="p-4 rounded-l-xl">Mã Đề Xuất</th>
                    <th className="p-4">Người Tạo</th>
                    <th className="p-4">Lý Do Tiêu Hủy</th>
                    <th className="p-4">Số Lượng Hồ Sơ</th>
                    <th className="p-4">Trạng Thái</th>
                    <th className="p-4 rounded-r-xl text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-whisper-border">
                  {proposals.map((prop) => (
                    <tr key={prop.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="p-4 font-mono font-bold text-primary">{prop.maDeXuat}</td>
                      <td className="p-4 font-medium text-on-surface">{prop.nguoiTao?.hoTen || "N/A"}</td>
                      <td className="p-4 text-secondary max-w-xs truncate">{prop.lyDoTieuHuy || "-"}</td>
                      <td className="p-4 font-bold text-on-surface">{prop.danhSachHoSo?.length || 0} hồ sơ</td>
                      <td className="p-4">{getStatusBadge(prop.trangThai)}</td>
                      <td className="p-4 text-right space-x-2">
                        {prop.trangThai === "DU_THAO" && (
                          <button
                            onClick={() => handleSubmitProposal(prop.id)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-[11px] rounded-lg transition-colors"
                          >
                            Trình duyệt
                          </button>
                        )}
                        {prop.trangThai === "CHO_DUYET" && (user?.role === "ADMIN" || user?.role === "RECORDS_OFFICER") && (
                          <button
                            onClick={() => handleApproveProposal(prop.id)}
                            className="px-3 py-1.5 bg-primary hover:bg-primary-container text-on-primary font-semibold text-[11px] rounded-lg transition-colors"
                          >
                            Phê duyệt
                          </button>
                        )}
                        {prop.trangThai === "DA_DUYET" && (user?.role === "ADMIN" || user?.role === "RECORDS_OFFICER") && (
                          <button
                            onClick={() => handleExecuteProposal(prop.id)}
                            className="px-3 py-1.5 bg-danger-red hover:bg-danger-red/90 text-white font-semibold text-[11px] rounded-lg transition-colors"
                          >
                            Thực thi tiêu hủy
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal create proposal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-pure-surface rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-whisper-border animate-scale-in">
            <div className="flex items-center justify-between pb-4 border-b border-whisper-border mb-4">
              <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                <Flame className="w-5 h-5 text-danger-red" />
                Lập Đề Xuất Tiêu Hủy Hồ Sơ
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProposal} className="space-y-4">
              <div>
                <p className="text-xs text-secondary mb-2">
                  Bạn đang chọn <strong className="text-on-surface">{selectedRecordIds.length}</strong> hồ sơ quá thời hạn bảo quản để lập tờ trình tiêu hủy.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Lý do tiêu hủy hồ sơ <span className="text-danger-red">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={lyDoTieuHuy}
                  onChange={(e) => setLyDoTieuHuy(e.target.value)}
                  placeholder="Nhập chi tiết lý do lập đề xuất tiêu hủy theo quy định bảo quản lưu kho..."
                  className="w-full p-3 bg-surface-container-low border border-whisper-border rounded-xl text-xs focus:ring-2 focus:ring-primary/20 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-whisper-border">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-secondary hover:text-on-surface transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-danger-red hover:bg-danger-red/90 text-white font-semibold text-xs rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  {submitting ? "Đang tạo..." : "Xác nhận Lập Đề xuất"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
