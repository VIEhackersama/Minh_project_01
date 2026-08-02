"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  BarChart3, 
  FolderOpen, 
  Undo2, 
  AlertTriangle, 
  Flame, 
  RefreshCw,
  Layers,
  Building2,
  PieChart,
  CheckCircle2,
  FileText,
  FileCheck2,
  ExternalLink,
  ShieldAlert,
  ListOrdered
} from "lucide-react";
import { apiClient } from "@/lib/api";
import Link from "next/link";

function ReportsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Active Tab from URL query param `tab`: 'all' | 'inventory' | 'loans' | 'destruction'
  const rawTab = searchParams.get("tab") || "all";
  const activeTab = ["all", "inventory", "loans", "destruction"].includes(rawTab) ? rawTab : "all";

  const [summary, setSummary] = useState<any>(null);
  const [categoryInventory, setCategoryInventory] = useState<any[]>([]);
  const [locationInventory, setLocationInventory] = useState<any[]>([]);
  const [loanStats, setLoanStats] = useState<any>(null);
  const [overdueLoans, setOverdueLoans] = useState<any[]>([]);
  const [destructionProposals, setDestructionProposals] = useState<any[]>([]);
  const [eligibleRecords, setEligibleRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [sumRes, catRes, locRes, loanRes, overdueRes, destPropRes, destEligibleRes] = await Promise.all([
        apiClient.get<any>("/reports/summary"),
        apiClient.get<any[]>("/reports/inventory/category"),
        apiClient.get<any[]>("/reports/inventory/location"),
        apiClient.get<any>("/reports/loans"),
        apiClient.get<any>("/phieu-muon?status=QUA_HAN"),
        apiClient.get<any>("/destruction"),
        apiClient.get<any[]>("/destruction/eligible")
      ]);

      setSummary(sumRes);
      setCategoryInventory(catRes || []);
      setLocationInventory(locRes || []);
      setLoanStats(loanRes);
      setOverdueLoans(overdueRes?.content || []);
      setDestructionProposals(destPropRes?.content || []);
      setEligibleRecords(destEligibleRes || []);
    } catch (err) {
      console.error("Lỗi khi nạp dữ liệu báo cáo:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const setTab = (tab: string) => {
    if (tab === "all") {
      router.push("/dashboard/reports");
    } else {
      router.push(`/dashboard/reports?tab=${tab}`);
    }
  };

  const getProposalStatusBadge = (status: string) => {
    switch (status) {
      case "DU_THAO":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">Dự thảo</span>;
      case "CHO_DUYET":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">Chờ phê duyệt</span>;
      case "DA_DUYET":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200">Đã phê duyệt</span>;
      case "DA_THUC_HIEN":
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Đã tiêu hủy</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="flex flex-col w-full gap-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-on-surface flex items-center gap-3">
            <BarChart3 className="w-7 h-7 text-primary" />
            Báo Cáo & Thống Kê Hệ Thống
          </h1>
          <p className="text-sm text-secondary mt-1">
            Quản lý kiểm kê kho vật lý, theo dõi tình trạng mượn trả và danh sách phiếu trình tiêu hủy tài liệu hết hạn.
          </p>
        </div>

        <button
          onClick={fetchReports}
          className="flex items-center gap-2 px-4 py-2.5 bg-pure-surface border border-whisper-border hover:bg-surface-container text-xs font-semibold rounded-xl shadow-sm transition-all self-start md:self-auto"
        >
          <RefreshCw className={`w-4 h-4 text-primary ${loading ? "animate-spin" : ""}`} />
          Làm mới dữ liệu
        </button>
      </div>

      {/* Tabs Header Navigation */}
      <div className="flex items-center gap-2 border-b border-whisper-border overflow-x-auto pb-1">
        <button
          onClick={() => setTab("all")}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
            activeTab === "all"
              ? "border-primary text-primary"
              : "border-transparent text-secondary hover:text-on-surface"
          }`}
        >
          📊 Tất Cả Báo Cáo
        </button>
        <button
          onClick={() => setTab("inventory")}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
            activeTab === "inventory"
              ? "border-primary text-primary"
              : "border-transparent text-secondary hover:text-on-surface"
          }`}
        >
          📦 Kiểm Kê Kho Vật Lý
        </button>
        <button
          onClick={() => setTab("loans")}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
            activeTab === "loans"
              ? "border-primary text-primary"
              : "border-transparent text-secondary hover:text-on-surface"
          }`}
        >
          🔄 Tình Trạng Mượn Trả
        </button>
        <button
          onClick={() => setTab("destruction")}
          className={`px-5 py-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
            activeTab === "destruction"
              ? "border-primary text-primary"
              : "border-transparent text-secondary hover:text-on-surface"
          }`}
        >
          🔥 Tiêu Hủy Tài Liệu
        </button>
      </div>

      {/* KPI Summary Cards */}
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
            <span className="text-[10px] font-bold uppercase text-secondary font-mono">Phiếu Trình Tiêu Hủy</span>
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl"><FileCheck2 className="w-5 h-5" /></div>
          </div>
          <p className="text-2xl font-black text-on-surface">{loading ? "..." : destructionProposals.length || 0}</p>
          <p className="text-xs text-secondary mt-1">{summary?.eligibleDestruction || 0} hồ sơ hết hạn lưu trữ</p>
        </div>
      </div>

      {/* SECTION 1: KIỂM KÊ KHO VẬT LÝ */}
      {(activeTab === "all" || activeTab === "inventory") && (
        <div className="space-y-8">
          <div className="flex items-center gap-2 border-b border-whisper-border pb-2">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Báo Cáo Kiểm Kê Kho Vật Lý
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Category Inventory Breakdown */}
            <div className="bg-pure-surface border border-whisper-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-on-surface mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-primary" />
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

            {/* Storage Location Inventory Breakdown */}
            <div className="bg-pure-surface border border-whisper-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-on-surface mb-6 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-primary" />
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
                        <th className="p-3 rounded-l-xl">Kho / Phòng</th>
                        <th className="p-3">Kệ Hàng</th>
                        <th className="p-3">Ngăn Chứa</th>
                        <th className="p-3 rounded-r-xl text-right">Số Hồ Sơ Active</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-whisper-border">
                      {locationInventory.map((loc, i) => (
                        <tr key={i} className="hover:bg-surface-container-low/50 transition-colors">
                          <td className="p-3 font-bold text-on-surface">{loc.warehouse || "Kho chính"}</td>
                          <td className="p-3 font-mono text-secondary">{loc.shelf || "N/A"}</td>
                          <td className="p-3 font-mono text-secondary">{loc.compartment || "N/A"}</td>
                          <td className="p-3 font-black text-primary text-right">{loc.recordCount} hồ sơ</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: TÌNH TRẠNG MƯỢN TRẢ */}
      {(activeTab === "all" || activeTab === "loans") && (
        <div className="space-y-8">
          <div className="flex items-center gap-2 border-b border-whisper-border pb-2">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <Undo2 className="w-5 h-5 text-warning-orange" />
              Báo Cáo Tình Trạng Mượn Trả
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Loan Status Grid */}
            <div className="bg-pure-surface border border-whisper-border rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-on-surface mb-6 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-warning-orange" />
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

            {/* Overdue Loans Alert Table */}
            <div className="bg-pure-surface border border-rose-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-rose-800 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-600 animate-pulse" />
                    Danh Sách Phiếu Mượn Quá Hạn ({overdueLoans.length})
                  </h3>
                  <span className="text-[11px] text-rose-600 font-semibold">⚠️ Cần thu hồi</span>
                </div>

                {loading ? (
                  <div className="py-8 text-center text-xs text-secondary">Đang tải phiếu quá hạn...</div>
                ) : overdueLoans.length === 0 ? (
                  <div className="py-12 text-center text-xs text-emerald-700 font-medium flex flex-col items-center gap-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    <span>Không có phiếu mượn nào bị quá hạn. Khai thác an toàn!</span>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-rose-50 text-rose-900 uppercase font-mono text-[10px]">
                        <tr>
                          <th className="p-3 rounded-l-xl">Mã Hồ Sơ</th>
                          <th className="p-3">Người Mượn</th>
                          <th className="p-3">Hạn Trả</th>
                          <th className="p-3 rounded-r-xl text-right">Trạng Thái</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rose-100">
                        {overdueLoans.map((loan) => (
                          <tr key={loan.id} className="hover:bg-rose-50/50 transition-colors">
                            <td className="p-3 font-mono font-bold text-rose-700">{loan.hoSo?.maHoSo}</td>
                            <td className="p-3 text-on-surface font-medium">{loan.nguoiMuon?.hoTen}</td>
                            <td className="p-3 font-bold text-rose-600">{loan.ngayHenTra}</td>
                            <td className="p-3 text-right">
                              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold text-[10px] rounded-full border border-rose-300">
                                Quá hạn
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {overdueLoans.length > 0 && (
                <div className="mt-4 pt-4 border-t border-rose-100 flex justify-end">
                  <Link
                    href="/dashboard/loans?status=QUA_HAN"
                    className="text-xs text-rose-700 hover:text-rose-900 font-bold flex items-center gap-1"
                  >
                    Xem tất cả trong trang mượn trả <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: TIÊU HỦY TÀI LIỆU & PHIẾU TRÌNH HẾT HẠN */}
      {(activeTab === "all" || activeTab === "destruction") && (
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-whisper-border pb-2">
            <h2 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Báo Cáo Tiêu Hủy Tài Liệu & Phiếu Trình Hết Hạn
            </h2>

            <Link
              href="/dashboard/destruction"
              className="text-xs text-primary hover:underline font-bold flex items-center gap-1"
            >
              Đi tới Quy trình tiêu hủy <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* TABLE 1: TABLE THÔNG BÁO VỀ CÁC PHIẾU TRÌNH TÀI LIỆU HẾT HẠN */}
          <div className="bg-pure-surface border border-whisper-border rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4 text-amber-600" />
                  Danh Sách Phiếu Trình / Đề Xuất Tiêu Hủy Tài Liệu Hết Hạn ({destructionProposals.length})
                </h3>
                <p className="text-xs text-secondary mt-0.5">
                  Tổng hợp các tờ trình đề xuất tiêu hủy tài liệu đã quá thời hạn lưu trữ trong hệ thống.
                </p>
              </div>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-secondary">Đang tải danh sách phiếu trình...</div>
            ) : destructionProposals.length === 0 ? (
              <div className="py-12 text-center text-xs text-secondary flex flex-col items-center gap-2">
                <FileText className="w-8 h-8 text-slate-300" />
                <span>Chưa có phiếu trình đề xuất tiêu hủy nào được tạo trong hệ thống.</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-low text-on-surface-variant uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-xl">Mã Phiếu Trình</th>
                      <th className="p-3">Người Lập Trình</th>
                      <th className="p-3">Lý Do Tiêu Hủy Tài Liệu</th>
                      <th className="p-3">Số Lượng Hồ Sơ</th>
                      <th className="p-3">Trạng Thái Duyệt</th>
                      <th className="p-3 rounded-r-xl text-right">Chi Tiết</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-whisper-border">
                    {destructionProposals.map((prop) => (
                      <tr key={prop.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-primary">{prop.maDeXuat}</td>
                        <td className="p-3 font-medium text-on-surface">{prop.nguoiTao?.hoTen || "Văn thư"}</td>
                        <td className="p-3 text-secondary max-w-xs truncate">{prop.lyDoTieuHuy || "Tài liệu hết hạn bảo quản"}</td>
                        <td className="p-3 font-bold text-on-surface">{prop.danhSachHoSo?.length || 0} hồ sơ</td>
                        <td className="p-3">{getProposalStatusBadge(prop.trangThai)}</td>
                        <td className="p-3 text-right">
                          <Link
                            href="/dashboard/destruction"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-[11px] font-semibold transition-colors"
                          >
                            Xem phiếu <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* TABLE 2: TABLE CÁC HỒ SƠ / TÀI LIỆU HẾT HẠN BẢO QUẢN CẦN LẬP ĐỀ XUẤT TIÊU HỦY */}
          <div className="bg-pure-surface border border-whisper-border rounded-3xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-on-surface mb-6 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-orange-500" />
              Danh Sách Tài Liệu / Hồ Sơ Đã Quá Thời Hạn Bảo Quản ({eligibleRecords.length})
            </h3>

            {loading ? (
              <div className="py-8 text-center text-xs text-secondary">Đang nạp dữ liệu hồ sơ hết hạn...</div>
            ) : eligibleRecords.length === 0 ? (
              <div className="py-8 text-center text-xs text-emerald-700 font-medium flex flex-col items-center gap-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                <span>Tất cả hồ sơ trong kho hiện tại đều còn trong thời hạn bảo quản hợp lệ!</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-low text-on-surface-variant uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3 rounded-l-xl">Mã Hồ Sơ</th>
                      <th className="p-3">Tên Hồ Sơ</th>
                      <th className="p-3">Hạn Lưu Trữ Đến</th>
                      <th className="p-3">Danh Mục</th>
                      <th className="p-3 rounded-r-xl text-right">Trạng Thái Lưu Kho</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-whisper-border">
                    {eligibleRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-primary">{record.maHoSo}</td>
                        <td className="p-3 font-semibold text-on-surface">{record.tenHoSo}</td>
                        <td className="p-3 text-danger-red font-bold">{record.thoiHanBaoQuanDen || "Hết hạn"}</td>
                        <td className="p-3 text-secondary">{record.danhMuc?.tenLoai || "-"}</td>
                        <td className="p-3 text-right">
                          <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Đang lưu kho
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
      )}
    </div>
  );
}

export default function ReportsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-secondary">Đang tải dữ liệu báo cáo...</div>}>
      <ReportsContent />
    </Suspense>
  );
}
