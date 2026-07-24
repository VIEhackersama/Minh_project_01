"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { 
  searchHoSo, 
  createHoSo, 
  deleteHoSo, 
  getDanhMucList, 
  getViTriList, 
  getTaiLieuByHoSo, 
  uploadTaiLieu, 
  deleteTaiLieu,
  HoSo, 
  DanhMucLoaiHoSo, 
  ViTriLuuTru, 
  TaiLieuSoHoa,
  MucDoMat
} from "@/lib/recordsApi";
import { datGiuHoSo } from "@/lib/loansApi";
import { CreateLoanModal } from "@/components/CreateLoanModal";
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Loader2, 
  MapPin, 
  FileText, 
  Upload, 
  Trash2, 
  Download, 
  ShieldAlert,
  FileCheck,
  X,
  Layers,
  Box,
  Archive,
  Calendar,
  CheckCircle2,
  FileCode2,
  QrCode,
  BookOpenCheck,
  Printer
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

function RecordsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const shouldOpenCreateModal = searchParams.get("create") === "true";

  const [records, setRecords] = useState<HoSo[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDanhMuc, setSelectedDanhMuc] = useState<number | undefined>();

  // Filter dropdown data
  const [categories, setCategories] = useState<DanhMucLoaiHoSo[]>([]);
  const [locations, setLocations] = useState<ViTriLuuTru[]>([]);

  // Create Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(shouldOpenCreateModal);
  const [createForm, setCreateForm] = useState({
    tenHoSo: "",
    maHoSo: "",
    danhMucId: undefined as number | undefined,
    viTriId: undefined as number | undefined,
    phongKho: "",
    keHang: "",
    nganChua: "",
    ngayLap: new Date().toISOString().split("T")[0],
    mucDoMat: "COMMON" as MucDoMat,
  });
  const [submitting, setSubmitting] = useState(false);

  // Detail / Digitization Modal State
  const [selectedRecord, setSelectedRecord] = useState<HoSo | null>(null);
  const [documents, setDocuments] = useState<TaiLieuSoHoa[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // QR Display Modal State
  const [qrRecord, setQrRecord] = useState<HoSo | null>(null);

  // Loan Request Modal State
  const [loanTargetRecord, setLoanTargetRecord] = useState<HoSo | null>(null);

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    try {
      const res = await searchHoSo({
        query: searchTerm,
        danhMucId: selectedDanhMuc,
        page,
        size: 10,
      });
      setRecords(res.content);
      setTotalPages(res.totalPages);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedDanhMuc, page]);

  const loadDropdowns = async () => {
    try {
      const [cats, locs] = await Promise.all([getDanhMucList(), getViTriList()]);
      setCategories(cats);
      setLocations(locs);
    } catch (err) {
      console.error("Lỗi tải danh mục & vị trí:", err);
    }
  };

  useEffect(() => {
    loadDropdowns();
  }, []);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleCreateHoSo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.tenHoSo.trim()) return;

    setSubmitting(true);
    try {
      await createHoSo({
        tenHoSo: createForm.tenHoSo,
        maHoSo: createForm.maHoSo || undefined,
        danhMucId: createForm.danhMucId,
        viTriId: createForm.viTriId,
        phongKho: createForm.phongKho.trim() || undefined,
        keHang: createForm.keHang.trim() || undefined,
        nganChua: createForm.nganChua.trim() || undefined,
        ngayLap: createForm.ngayLap || undefined,
        mucDoMat: createForm.mucDoMat,
      });
      setIsCreateModalOpen(false);
      setCreateForm({
        tenHoSo: "",
        maHoSo: "",
        danhMucId: undefined,
        viTriId: undefined,
        phongKho: "",
        keHang: "",
        nganChua: "",
        ngayLap: new Date().toISOString().split("T")[0],
        mucDoMat: "COMMON",
      });
      fetchRecords();
      loadDropdowns();
    } catch (err: any) {
      alert(err?.message || "Không thể tạo mới hồ sơ");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteHoSo = async (id: number, ma: string) => {
    if (!confirm(`Bạn có chắc muốn xóa hồ sơ "${ma}"?`)) return;
    try {
      await deleteHoSo(id);
      fetchRecords();
    } catch (err: any) {
      alert(err?.message || "Không thể xóa hồ sơ");
    }
  };

  const handleDatGiu = async (record: HoSo) => {
    if (confirm(`Bạn có muốn đăng ký mượn / giữ chỗ cho hồ sơ "${record.tenHoSo}" (${record.maHoSo})?`)) {
      try {
        await datGiuHoSo(record.id);
        alert("Đã đăng ký giữ chỗ mượn hồ sơ thành công! Vui lòng theo dõi tại trang Mượn/Trả.");
        fetchRecords();
        router.push("/dashboard/loans");
      } catch (err: any) {
        alert(err?.message || "Không thể đăng ký mượn hồ sơ");
      }
    }
  };

  const handleOpenDetailModal = async (record: HoSo) => {
    setSelectedRecord(record);
    setLoadingDocs(true);
    try {
      const docs = await getTaiLieuByHoSo(record.id);
      setDocuments(docs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDocs(false);
    }
  };

  const handleUploadFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord || !selectedFile) return;

    setUploadingDoc(true);
    try {
      const newDoc = await uploadTaiLieu(selectedRecord.id, selectedFile);
      setDocuments((prev) => [newDoc, ...prev]);
      setSelectedFile(null);
      fetchRecords();
    } catch (err: any) {
      alert(err?.message || "Lỗi tải lên tài liệu");
    } finally {
      setUploadingDoc(false);
    }
  };

  const handleDeleteDocument = async (docId: number) => {
    if (!confirm("Xóa tài liệu số hóa này?")) return;
    try {
      await deleteTaiLieu(docId);
      setDocuments((prev) => prev.filter((d) => d.id !== docId));
      fetchRecords();
    } catch (err: any) {
      alert(err?.message || "Không thể xóa tài liệu");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getComputedLocationCode = () => {
    if (createForm.phongKho || createForm.keHang || createForm.nganChua) {
      const k = (createForm.phongKho || "").replace(/\s+/g, "");
      const ke = (createForm.keHang || "").replace(/\s+/g, "");
      const n = (createForm.nganChua || "").replace(/\s+/g, "");
      return `${k}-${ke}-${n}`;
    }
    return "";
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-pure-surface p-6 rounded-2xl border border-whisper-border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-on-surface flex items-center gap-3">
            <FolderOpen className="w-7 h-7 text-primary" />
            Quản Lý Hồ Sơ & Số Hóa
          </h1>
          <p className="text-secondary text-sm mt-1">
            Khai báo hồ sơ mới, gán vị trí kho vật lý, theo dõi trạng thái số hóa và tải file PDF MinIO
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-semibold text-sm hover:bg-primary-container transition-all shadow-md shadow-primary/20 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          Khai Báo Hồ Sơ Mới
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row items-center gap-4 bg-pure-surface p-4 rounded-xl border border-whisper-border">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã hồ sơ, tên hồ sơ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-whisper-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="w-full md:w-64">
          <select
            value={selectedDanhMuc || ""}
            onChange={(e) => setSelectedDanhMuc(e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-whisper-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-on-surface bg-pure-surface"
          >
            <option value="">-- Tất cả danh mục --</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.tenLoai} ({c.thoiHanBaoQuanNam} năm)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-pure-surface rounded-2xl border border-whisper-border overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex justify-center items-center p-12 text-secondary">
            <Loader2 className="w-6 h-6 animate-spin mr-2 text-primary" />
            Đang tải dữ liệu hồ sơ...
          </div>
        ) : records.length === 0 ? (
          <div className="p-12 text-center text-secondary">Chưa có hồ sơ nào khớp với tìm kiếm.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="bg-surface-container text-on-surface-variant font-semibold border-b border-whisper-border">
                <tr>
                  <th className="px-5 py-4 whitespace-nowrap">Mã Hồ Sơ</th>
                  <th className="px-5 py-4 min-w-[200px]">Tên Hồ Sơ</th>
                  <th className="px-5 py-4 whitespace-nowrap">Ngày Lập</th>
                  <th className="px-5 py-4 min-w-[200px]">Kho / Kệ / Ngăn</th>
                  <th className="px-5 py-4 min-w-[150px]">Danh Mục</th>
                  <th className="px-5 py-4 whitespace-nowrap">Số Hóa</th>
                  <th className="px-5 py-4 whitespace-nowrap">Bảo Mật</th>
                  <th className="px-5 py-4 whitespace-nowrap">Trạng Thái Kho</th>
                  <th className="px-5 py-4 whitespace-nowrap text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whisper-border">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="font-mono font-bold text-primary">{record.maHoSo}</span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-on-surface">{record.tenHoSo}</td>
                    <td className="px-5 py-4 whitespace-nowrap text-secondary text-xs">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {record.ngayLap || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {record.viTri ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="inline-flex items-center gap-1 font-mono font-bold text-xs text-primary whitespace-nowrap">
                            <MapPin className="w-3 h-3 text-primary shrink-0" />
                            {record.viTri.maDinhDanhViTri}
                          </span>
                          <span className="text-[11px] text-secondary whitespace-nowrap">
                            Kho: <b>{record.viTri.phongKho}</b> | Kệ: <b>{record.viTri.keHang}</b> | Ngăn: <b>{record.viTri.nganChua}</b>
                          </span>
                        </div>
                      ) : (
                        <span className="text-secondary italic text-xs whitespace-nowrap">Chưa gán</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-secondary">{record.danhMuc?.tenLoai || "—"}</td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      {record.daSoHoa ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-600 font-semibold text-xs rounded-full border border-emerald-500/20 whitespace-nowrap">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Đã số hóa ({record.soLuongTaiLieu || 1} file)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-500 font-medium text-xs rounded-full border border-slate-200 whitespace-nowrap">
                          <FileCode2 className="w-3.5 h-3.5 text-slate-400" />
                          Chưa số hóa
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      {record.mucDoMat === "CONFIDENTIAL" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-danger-red/10 text-danger-red font-semibold text-xs rounded-full whitespace-nowrap">
                          <ShieldAlert className="w-3 h-3" /> Mật
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-success-green/10 text-success-green font-medium text-xs rounded-full whitespace-nowrap">
                          Thường
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 font-medium rounded-full text-xs whitespace-nowrap inline-block ${
                        record.trangThai === "DANG_LUU_KHO" 
                          ? "bg-emerald-500/10 text-emerald-600" 
                          : record.trangThai === "DA_DAT_GIU" 
                            ? "bg-amber-500/10 text-amber-600 font-bold" 
                            : "bg-blue-500/10 text-blue-600"
                      }`}>
                        {record.trangThai === "DANG_LUU_KHO" 
                          ? "Đang lưu kho" 
                          : record.trangThai === "DA_DAT_GIU" 
                            ? "Đã đặt giữ" 
                            : record.trangThai}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap space-x-1.5">
                      {record.trangThai === "DANG_LUU_KHO" && (
                        <button
                          onClick={() => setLoanTargetRecord(record)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                          title="Đăng ký mượn / Đặt giữ"
                        >
                          <BookOpenCheck className="w-3.5 h-3.5" />
                          Đăng Ký Mượn
                        </button>
                      )}

                      <button
                        onClick={() => setQrRecord(record)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                        title="Xem / In Mã QR Thẻ Dán"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        Thẻ QR
                      </button>

                      <button
                        onClick={() => handleOpenDetailModal(record)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        Số Hóa
                      </button>

                      <button
                        onClick={() => handleDeleteHoSo(record.id, record.maHoSo)}
                        className="p-1.5 text-secondary hover:text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors inline-block"
                        title="Xóa"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 bg-surface-container border-t border-whisper-border flex justify-between items-center text-xs text-secondary">
            <span>Trang {page + 1} / {totalPages}</span>
            <div className="flex gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="px-3 py-1 bg-pure-surface border border-whisper-border rounded-lg disabled:opacity-50"
              >
                Trước
              </button>
              <button
                disabled={page + 1 >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 bg-pure-surface border border-whisper-border rounded-lg disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal Create Record */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-pure-surface rounded-2xl border border-whisper-border max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Khai Báo Hồ Sơ Mới
            </h2>
            <form onSubmit={handleCreateHoSo} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Tên Hồ Sơ <span className="text-danger-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={createForm.tenHoSo}
                  onChange={(e) => setCreateForm({ ...createForm, tenHoSo: e.target.value })}
                  placeholder="Ví dụ: Hồ sơ khen thưởng học sinh giỏi năm 2025"
                  className="w-full px-3 py-2 border border-whisper-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Mã Hồ Sơ (Tùy chọn, để trống sẽ tự động tạo)
                </label>
                <input
                  type="text"
                  value={createForm.maHoSo}
                  onChange={(e) => setCreateForm({ ...createForm, maHoSo: e.target.value })}
                  placeholder="Để trống để sinh mã tự động (VD: HS-20260724-A1B2)"
                  className="w-full px-3 py-2 border border-whisper-border rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Ngày Lập Hồ Sơ (Ngày có hiệu lực pháp lý)
                  </label>
                  <input
                    type="date"
                    required
                    value={createForm.ngayLap}
                    onChange={(e) => setCreateForm({ ...createForm, ngayLap: e.target.value })}
                    className="w-full px-3 py-2 border border-whisper-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-pure-surface"
                  />
                  <span className="text-[11px] text-secondary mt-0.5 block">
                    Mặc định là ngày tạo hôm nay. Bạn có thể chỉnh lại ngày ban hành thực tế.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Danh Mục Loại Hồ Sơ</label>
                  <select
                    value={createForm.danhMucId || ""}
                    onChange={(e) => setCreateForm({ ...createForm, danhMucId: e.target.value ? Number(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-whisper-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-pure-surface"
                  >
                    <option value="">-- Chọn loại --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.tenLoai} ({c.thoiHanBaoQuanNam} năm)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Physical Storage Fields Box */}
              <div className="p-4 bg-surface-container rounded-2xl border border-whisper-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    Vị Trí Lưu Kho Vật Lý (Tách Riêng Kho - Kệ - Ngăn)
                  </span>
                  {getComputedLocationCode() && (
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-md border border-primary/20">
                      VD: {getComputedLocationCode()}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-secondary mb-1 flex items-center gap-1">
                      <Archive className="w-3 h-3 text-primary" /> Phòng Kho
                    </label>
                    <input
                      type="text"
                      value={createForm.phongKho}
                      onChange={(e) => setCreateForm({ ...createForm, phongKho: e.target.value, viTriId: undefined })}
                      placeholder="Ví dụ: Kho A"
                      className="w-full px-3 py-2 border border-whisper-border rounded-xl text-xs bg-pure-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-secondary mb-1 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-primary" /> Kệ Hàng
                    </label>
                    <input
                      type="text"
                      value={createForm.keHang}
                      onChange={(e) => setCreateForm({ ...createForm, keHang: e.target.value, viTriId: undefined })}
                      placeholder="Ví dụ: Kệ 01"
                      className="w-full px-3 py-2 border border-whisper-border rounded-xl text-xs bg-pure-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-secondary mb-1 flex items-center gap-1">
                      <Box className="w-3 h-3 text-primary" /> Ngăn Chứa
                    </label>
                    <input
                      type="text"
                      value={createForm.nganChua}
                      onChange={(e) => setCreateForm({ ...createForm, nganChua: e.target.value, viTriId: undefined })}
                      placeholder="Ví dụ: Ngăn 03"
                      className="w-full px-3 py-2 border border-whisper-border rounded-xl text-xs bg-pure-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {locations.length > 0 && (
                  <div className="pt-1">
                    <label className="block text-[11px] text-outline mb-1">Hoặc chọn từ kho hiện có:</label>
                    <select
                      value={createForm.viTriId || ""}
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : undefined;
                        const matched = locations.find((l) => l.id === val);
                        if (matched) {
                          setCreateForm({
                            ...createForm,
                            viTriId: matched.id,
                            phongKho: matched.phongKho,
                            keHang: matched.keHang,
                            nganChua: matched.nganChua,
                          });
                        } else {
                          setCreateForm({ ...createForm, viTriId: undefined });
                        }
                      }}
                      className="w-full px-3 py-1.5 border border-whisper-border rounded-xl text-xs bg-pure-surface text-secondary"
                    >
                      <option value="">-- Chọn vị trí sẵn có --</option>
                      {locations.map((l) => (
                        <option key={l.id} value={l.id}>
                          {l.phongKho} - {l.keHang} - {l.nganChua} ({l.maDinhDanhViTri})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Mức Độ Bảo Mật</label>
                <select
                  value={createForm.mucDoMat}
                  onChange={(e) => setCreateForm({ ...createForm, mucDoMat: e.target.value as MucDoMat })}
                  className="w-full px-3 py-2 border border-whisper-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-pure-surface"
                >
                  <option value="COMMON">Thông thường (COMMON)</option>
                  <option value="CONFIDENTIAL">Mật / Bảo mật (CONFIDENTIAL)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-whisper-border rounded-xl text-sm font-semibold text-secondary hover:bg-surface-container transition-colors whitespace-nowrap"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-container transition-all shadow-md shadow-primary/20 flex items-center gap-2 whitespace-nowrap"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Tạo Hồ Sơ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Digitized Documents & Upload */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-pure-surface rounded-2xl border border-whisper-border max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-primary px-2.5 py-1 bg-primary/10 rounded-md">
                  {selectedRecord.maHoSo}
                </span>
                <h2 className="text-xl font-bold text-on-surface mt-2">{selectedRecord.tenHoSo}</h2>
                <p className="text-xs text-secondary mt-1">
                  Ngày lập: <b>{selectedRecord.ngayLap || "—"}</b> | Vị trí kho: {selectedRecord.viTri ? `${selectedRecord.viTri.phongKho} / ${selectedRecord.viTri.keHang} / ${selectedRecord.viTri.nganChua}` : "Chưa gán"} | Hạn bảo quản: {selectedRecord.thoiHanBaoQuanDen || "Không giới hạn"}
                </p>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 text-slate-400 hover:text-on-surface rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Form Box */}
            <div className="p-4 bg-surface-container rounded-2xl border border-whisper-border space-y-3">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Upload className="w-4 h-4 text-primary" />
                Tải Bổ Sung Tệp Scan Số Hóa (MinIO S3)
              </h3>
              <form onSubmit={handleUploadFile} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="file"
                  required
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="flex-1 text-xs text-secondary file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-primary file:text-on-primary hover:file:bg-primary-container"
                />
                <button
                  type="submit"
                  disabled={!selectedFile || uploadingDoc}
                  className="px-4 py-2 bg-primary text-on-primary text-xs font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {uploadingDoc && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Tải File Scan
                </button>
              </form>
            </div>

            {/* Document List */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-on-surface">
                Tài Liệu Đã Số Hóa ({documents.length})
              </h3>
              {loadingDocs ? (
                <div className="p-6 text-center text-secondary text-xs">
                  <Loader2 className="w-5 h-5 animate-spin inline mr-2 text-primary" />
                  Đang tải danh sách tài liệu...
                </div>
              ) : documents.length === 0 ? (
                <div className="p-6 text-center text-secondary text-xs bg-surface-container-low rounded-xl">
                  Chưa có tệp scan nào được tải lên cho hồ sơ này.
                </div>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 bg-pure-surface border border-whisper-border rounded-xl flex items-center justify-between gap-4 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-on-surface truncate">{doc.tenTaiLieu}</p>
                          <div className="flex items-center gap-3 text-[11px] text-secondary mt-0.5">
                            <span>{formatFileSize(doc.kichThuoc)}</span>
                            {doc.checksum && (
                              <span className="font-mono text-[10px] bg-surface-container px-1.5 py-0.5 rounded text-outline truncate max-w-[140px]" title={`SHA256: ${doc.checksum}`}>
                                SHA: {doc.checksum.substring(0, 10)}...
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`http://localhost:8080/api/tai-lieu-so-hoa/download/${doc.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Xem / Tải về"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-2 text-secondary hover:text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors"
                          title="Xóa tệp"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 border border-whisper-border rounded-xl text-xs font-semibold text-secondary hover:bg-surface-container whitespace-nowrap"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VIEW / PRINT QR CODE TAG */}
      {qrRecord && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-pure-surface rounded-[2rem] border border-whisper-border max-w-sm w-full p-6 shadow-2xl flex flex-col items-center gap-4 text-center animate-fade-in">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <QrCode className="w-4 h-4 text-primary" />
                Thẻ QR Dán Hồ Sơ
              </h3>
              <button onClick={() => setQrRecord(null)} className="p-1 text-slate-400 hover:text-on-surface rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-inner flex flex-col items-center gap-3 w-full">
              <img
                src={`http://localhost:8080/api/qr/ho-so/${qrRecord.id}?width=250&height=250`}
                alt={`QR ${qrRecord.maHoSo}`}
                className="w-48 h-48 object-contain"
              />
              <span className="font-mono font-black text-base text-primary tracking-wider">{qrRecord.maHoSo}</span>
              <p className="text-xs font-bold text-on-surface line-clamp-2">{qrRecord.tenHoSo}</p>
              {qrRecord.viTri && (
                <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {qrRecord.viTri.phongKho} / {qrRecord.viTri.keHang} / {qrRecord.viTri.nganChua}
                </span>
              )}
            </div>

            <div className="flex gap-2 w-full">
              <a
                href={`http://localhost:8080/api/qr/ho-so/${qrRecord.id}?width=500&height=500`}
                target="_blank"
                download={`QR_${qrRecord.maHoSo}.png`}
                className="flex-1 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-primary-container"
              >
                <Download className="w-3.5 h-3.5" /> Tải Ảnh QR
              </a>
              <button
                onClick={() => window.print()}
                className="py-2 px-4 border border-whisper-border rounded-xl text-xs font-semibold text-secondary hover:bg-slate-100 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE LOAN REQUEST POPUP */}
      <CreateLoanModal
        isOpen={!!loanTargetRecord}
        record={loanTargetRecord}
        onClose={() => setLoanTargetRecord(null)}
        onSuccess={fetchRecords}
      />
    </div>
  );
}

export default function RecordsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center p-12 text-secondary">
        <Loader2 className="w-6 h-6 animate-spin mr-2 text-primary" />
        Đang tải trang quản lý hồ sơ...
      </div>
    }>
      <RecordsContent />
    </Suspense>
  );
}
