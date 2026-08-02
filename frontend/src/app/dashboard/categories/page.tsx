"use client";

import React, { useState, useEffect } from "react";
import { 
  getDanhMucList, 
  createDanhMuc, 
  updateDanhMuc, 
  deleteDanhMuc, 
  DanhMucLoaiHoSo 
} from "@/lib/recordsApi";
import { Tags, Plus, Edit2, Trash2, Search, Loader2, ShieldAlert } from "lucide-react";
import { useAuth } from "@/components/auth-context";

export default function CategoriesPage() {
  const { user, hasPermission } = useAuth();
  const [categories, setCategories] = useState<DanhMucLoaiHoSo[]>([]);

  if (user && user.role !== "ADMIN" && user.role !== "RECORDS_OFFICER" && !hasPermission("RECORD_MANAGE")) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <ShieldAlert className="w-16 h-16 text-rose-500" />
        <h2 className="text-xl font-bold text-on-surface">Không Có Quyền Truy Cập</h2>
        <p className="text-sm text-secondary max-w-md">
          Chức năng Quản lý Danh mục Hồ sơ chỉ dành cho Cán bộ Văn thư & Quản trị viên.
        </p>
      </div>
    );
  }
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<DanhMucLoaiHoSo | null>(null);
  const [formData, setFormData] = useState({ tenLoai: "", thoiHanBaoQuanNam: 5, donViThoiHan: "NAM", moTa: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDanhMucList();
      setCategories(data);
    } catch (err: any) {
      setError(err?.message || "Không thể tải danh sách loại hồ sơ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category?: DanhMucLoaiHoSo) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        tenLoai: category.tenLoai,
        thoiHanBaoQuanNam: category.thoiHanBaoQuanNam,
        donViThoiHan: category.donViThoiHan || "NAM",
        moTa: category.moTa || ""
      });
    } else {
      setEditingCategory(null);
      setFormData({ tenLoai: "", thoiHanBaoQuanNam: 5, donViThoiHan: "NAM", moTa: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tenLoai.trim()) return;

    setSubmitting(true);
    try {
      if (editingCategory) {
        await updateDanhMuc(editingCategory.id, formData);
      } else {
        await createDanhMuc(formData);
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err: any) {
      alert(err?.message || "Lỗi lưu danh mục loại hồ sơ");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa loại hồ sơ "${name}"?`)) return;
    try {
      await deleteDanhMuc(id);
      fetchCategories();
    } catch (err: any) {
      alert(err?.message || "Không thể xóa loại hồ sơ");
    }
  };

  const filteredCategories = categories.filter((c) =>
    c.tenLoai.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.moTa && c.moTa.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatRetentionUnit = (value: number, unit?: string) => {
    switch (unit) {
      case "THANG": return `${value} tháng`;
      case "NGAY": return `${value} ngày`;
      default: return `${value} năm`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-pure-surface p-6 rounded-2xl border border-whisper-border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-on-surface flex items-center gap-3">
            <Tags className="w-7 h-7 text-primary" />
            Danh Mục Loại Hồ Sơ
          </h1>
          <p className="text-secondary text-sm mt-1">
            Quản lý các loại danh mục hồ sơ và thời hạn bảo quản lưu trữ
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-semibold text-sm hover:bg-primary-container transition-all shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          Thêm Loại Hồ Sơ
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex items-center gap-4 bg-pure-surface p-4 rounded-xl border border-whisper-border">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            placeholder="Tìm kiếm theo tên loại hồ sơ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-whisper-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-pure-surface rounded-2xl border border-whisper-border overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex justify-center items-center p-12 text-secondary">
            <Loader2 className="w-6 h-6 animate-spin mr-2 text-primary" />
            Đang tải dữ liệu...
          </div>
        ) : error ? (
          <div className="p-8 text-center text-danger-red font-medium">{error}</div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-12 text-center text-secondary">Chưa có danh mục loại hồ sơ nào.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container text-on-surface-variant font-semibold border-b border-whisper-border">
                <tr>
                  <th className="px-6 py-4">STT</th>
                  <th className="px-6 py-4">Tên Loại Hồ Sơ</th>
                  <th className="px-6 py-4">Thời Hạn Bảo Quản</th>
                  <th className="px-6 py-4">Mô Tả</th>
                  <th className="px-6 py-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whisper-border">
                {filteredCategories.map((item, index) => (
                  <tr key={item.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4 font-medium text-secondary">{index + 1}</td>
                    <td className="px-6 py-4 font-semibold text-on-surface">{item.tenLoai}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary font-medium rounded-full text-xs">
                        {formatRetentionUnit(item.thoiHanBaoQuanNam, item.donViThoiHan)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-secondary">{item.moTa || "—"}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-2 text-secondary hover:text-primary hover:bg-surface-container rounded-lg transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.tenLoai)}
                        className="p-2 text-secondary hover:text-danger-red hover:bg-danger-red/10 rounded-lg transition-colors"
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
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-pure-surface rounded-2xl border border-whisper-border max-w-md w-full p-6 shadow-2xl space-y-4">
            <h2 className="text-xl font-bold text-on-surface">
              {editingCategory ? "Cập Nhật Loại Hồ Sơ" : "Thêm Loại Hồ Sơ Mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Tên Loại Hồ Sơ <span className="text-danger-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.tenLoai}
                  onChange={(e) => setFormData({ ...formData, tenLoai: e.target.value })}
                  placeholder="Ví dụ: Hồ sơ Học sinh tốt nghiệp"
                  className="w-full px-3 py-2 border border-whisper-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Thời Hạn Bảo Quản <span className="text-danger-red">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={1000}
                    value={formData.thoiHanBaoQuanNam}
                    onChange={(e) => setFormData({ ...formData, thoiHanBaoQuanNam: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-whisper-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Đơn Vị Thời Gian <span className="text-danger-red">*</span>
                  </label>
                  <select
                    value={formData.donViThoiHan}
                    onChange={(e) => setFormData({ ...formData, donViThoiHan: e.target.value })}
                    className="w-full px-3 py-2 border border-whisper-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-pure-surface"
                  >
                    <option value="NAM">Năm</option>
                    <option value="THANG">Tháng</option>
                    <option value="NGAY">Ngày</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Mô Tả</label>
                <textarea
                  rows={3}
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                  placeholder="Mô tả chi tiết nhóm loại hồ sơ..."
                  className="w-full px-3 py-2 border border-whisper-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-whisper-border rounded-xl text-sm font-semibold text-secondary hover:bg-surface-container transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-container transition-all shadow-md shadow-primary/20 flex items-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingCategory ? "Cập Nhật" : "Tạo Mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
