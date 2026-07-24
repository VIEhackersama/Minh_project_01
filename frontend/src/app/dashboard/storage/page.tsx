"use client";

import React, { useState, useEffect } from "react";
import { 
  getViTriList, 
  createViTri, 
  updateViTri, 
  deleteViTri, 
  ViTriLuuTru 
} from "@/lib/recordsApi";
import { Archive, Plus, Edit2, Trash2, Search, Loader2, MapPin } from "lucide-react";

export default function StoragePage() {
  const [locations, setLocations] = useState<ViTriLuuTru[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<ViTriLuuTru | null>(null);
  const [formData, setFormData] = useState({ phongKho: "", keHang: "", nganChua: "", moTa: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getViTriList();
      setLocations(data);
    } catch (err: any) {
      setError(err?.message || "Không thể tải danh sách vị trí lưu kho");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  const handleOpenModal = (loc?: ViTriLuuTru) => {
    if (loc) {
      setEditingLocation(loc);
      setFormData({
        phongKho: loc.phongKho,
        keHang: loc.keHang,
        nganChua: loc.nganChua,
        moTa: loc.moTa || ""
      });
    } else {
      setEditingLocation(null);
      setFormData({ phongKho: "Kho A", keHang: "Kệ 01", nganChua: "Ngăn 01", moTa: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phongKho.trim() || !formData.keHang.trim() || !formData.nganChua.trim()) return;

    setSubmitting(true);
    try {
      if (editingLocation) {
        await updateViTri(editingLocation.id, formData);
      } else {
        await createViTri(formData);
      }
      setIsModalOpen(false);
      fetchLocations();
    } catch (err: any) {
      alert(err?.message || "Lỗi lưu vị trí lưu kho");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, ma: string) => {
    if (!confirm(`Bạn có chắc chắn muốn xóa vị trí lưu kho "${ma}"?`)) return;
    try {
      await deleteViTri(id);
      fetchLocations();
    } catch (err: any) {
      alert(err?.message || "Không thể xóa vị trí lưu kho");
    }
  };

  const filteredLocations = locations.filter((l) =>
    l.maDinhDanhViTri.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.phongKho.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.keHang.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.nganChua.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-pure-surface p-6 rounded-2xl border border-whisper-border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-on-surface flex items-center gap-3">
            <Archive className="w-7 h-7 text-primary" />
            Vị Trí Lưu Kho Vật Lý
          </h1>
          <p className="text-secondary text-sm mt-1">
            Quản lý sơ đồ vị trí lưu trữ hồ sơ theo Phòng kho, Kệ hàng và Ngăn chứa
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl font-semibold text-sm hover:bg-primary-container transition-all shadow-md shadow-primary/20"
        >
          <Plus className="w-4 h-4" />
          Khai Báo Vị Trí Mới
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex items-center gap-4 bg-pure-surface p-4 rounded-xl border border-whisper-border">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-outline" />
          <input
            type="text"
            placeholder="Tìm kiếm theo mã vị trí, kho, kệ..."
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
        ) : filteredLocations.length === 0 ? (
          <div className="p-12 text-center text-secondary">Chưa có vị trí lưu kho nào được khai báo.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-container text-on-surface-variant font-semibold border-b border-whisper-border">
                <tr>
                  <th className="px-6 py-4">Mã Vị Trí</th>
                  <th className="px-6 py-4">Phòng Kho</th>
                  <th className="px-6 py-4">Kệ Hàng</th>
                  <th className="px-6 py-4">Ngăn Chứa</th>
                  <th className="px-6 py-4">Mô Tả</th>
                  <th className="px-6 py-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-whisper-border">
                {filteredLocations.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container text-on-surface font-mono font-semibold rounded-lg text-xs border border-whisper-border">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        {item.maDinhDanhViTri}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-on-surface">{item.phongKho}</td>
                    <td className="px-6 py-4 text-secondary">{item.keHang}</td>
                    <td className="px-6 py-4 text-secondary">{item.nganChua}</td>
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
                        onClick={() => handleDelete(item.id, item.maDinhDanhViTri)}
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
              {editingLocation ? "Cập Nhật Vị Trí" : "Khai Báo Vị Trí Mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Phòng Kho <span className="text-danger-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.phongKho}
                  onChange={(e) => setFormData({ ...formData, phongKho: e.target.value })}
                  placeholder="Ví dụ: Kho A, Kho B"
                  className="w-full px-3 py-2 border border-whisper-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Kệ Hàng <span className="text-danger-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.keHang}
                    onChange={(e) => setFormData({ ...formData, keHang: e.target.value })}
                    placeholder="Ví dụ: Kệ 01"
                    className="w-full px-3 py-2 border border-whisper-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">
                    Ngăn Chứa <span className="text-danger-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nganChua}
                    onChange={(e) => setFormData({ ...formData, nganChua: e.target.value })}
                    placeholder="Ví dụ: Ngăn 03"
                    className="w-full px-3 py-2 border border-whisper-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="p-3 bg-surface-container rounded-xl text-xs text-secondary border border-whisper-border">
                Mã định danh tự động sinh:{" "}
                <span className="font-mono font-bold text-primary">
                  {formData.phongKho.replaceAll(/\s+/g, "") || "Kho"}-
                  {formData.keHang.replaceAll(/\s+/g, "") || "Ke"}-
                  {formData.nganChua.replaceAll(/\s+/g, "") || "Ngan"}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Mô Tả Ghi Chú</label>
                <textarea
                  rows={2}
                  value={formData.moTa}
                  onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
                  placeholder="Ví dụ: Dùng lưu trữ hồ sơ cán bộ giáo viên"
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
                  {editingLocation ? "Cập Nhật" : "Lưu Vị Trí"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
