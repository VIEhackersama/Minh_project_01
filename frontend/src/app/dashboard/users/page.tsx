"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/components/auth-context";
import { 
  UserPlus, 
  Search, 
  Edit2, 
  ShieldAlert, 
  Check, 
  X, 
  Trash2,
  AlertCircle,
  Loader2,
  Mail,
  User,
  Key,
  Lock
} from "lucide-react";

interface Role {
  id: string;
  tenVaiTro: string;
  moTa?: string;
}

interface UserAccount {
  id: number;
  username: string;
  hoTen: string;
  email: string;
  vaiTro: Role;
  trangThai: boolean;
  ngayTao?: string;
}

interface UserPageResponse {
  content: UserAccount[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export default function UserManagementPage() {
  const { hasPermission, user: currentUser } = useAuth();
  const queryClient = useQueryClient();

  if (currentUser && currentUser.role !== "ADMIN" && !hasPermission("SYS_ADMIN")) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <ShieldAlert className="w-16 h-16 text-rose-500" />
        <h2 className="text-xl font-bold text-on-surface">Không Có Quyền Truy Cập</h2>
        <p className="text-sm text-secondary max-w-md">
          Chức năng Quản lý Hệ thống & Tài khoản chỉ dành riêng cho Quản trị viên (ADMIN). Vui lòng liên hệ Admin để được cấp quyền.
        </p>
      </div>
    );
  }

  // Search & filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [page, setPage] = useState(0);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    hoTen: "",
    email: "",
    roleId: "TEACHER",
    trangThai: true
  });
  const [formError, setFormError] = useState<string | null>(null);

  // Authorization Guard
  if (!hasPermission("SYS_ADMIN")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShieldAlert className="w-16 h-16 text-danger-red animate-bounce" />
        <h2 className="text-xl font-bold text-on-surface">Không có quyền truy cập</h2>
        <p className="text-sm text-secondary text-center max-w-md">
          Tài khoản của bạn không được cấp quyền quản trị hệ thống (`SYS_ADMIN`) để quản lý danh sách tài khoản.
        </p>
      </div>
    );
  }

  // Fetch Users list
  const { data: usersData, isLoading: isUsersLoading } = useQuery<UserPageResponse>({
    queryKey: ["users", searchQuery, roleFilter, page],
    queryFn: () => api.get<UserPageResponse>("/admin/users", {
      params: { query: searchQuery, roleId: roleFilter, page, size: 10 }
    }),
  });

  // Fetch Roles list
  const { data: rolesData } = useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: () => api.get<Role[]>("/admin/roles"),
  });

  // Mutations
  const createUserMutation = useMutation({
    mutationFn: (newUser: typeof formData) => api.post<UserAccount>("/admin/users", newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsAddModalOpen(false);
      resetForm();
    },
    onError: (err: any) => {
      setFormError(err.message || "Tạo tài khoản thất bại");
    }
  });

  const updateUserMutation = useMutation({
    mutationFn: (updatedUser: any) => api.put<UserAccount>(`/admin/users/${selectedUser?.id}`, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsEditModalOpen(false);
      setSelectedUser(null);
      resetForm();
    },
    onError: (err: any) => {
      setFormError(err.message || "Cập nhật tài khoản thất bại");
    }
  });

  const toggleStatusMutation = useMutation({
    mutationFn: (userId: number) => api.post<UserAccount>(`/admin/users/${userId}/toggle-status`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      alert(err.message || "Thay đổi trạng thái thất bại");
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => api.delete(`/admin/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err: any) => {
      alert(err.message || "Xóa tài khoản thất bại");
    }
  });

  // Handlers
  const resetForm = () => {
    setFormData({
      username: "",
      password: "",
      hoTen: "",
      email: "",
      roleId: "TEACHER",
      trangThai: true
    });
    setFormError(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (user: UserAccount) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      password: "",
      hoTen: user.hoTen,
      email: user.email,
      roleId: user.vaiTro.id,
      trangThai: user.trangThai
    });
    setFormError(null);
    setIsEditModalOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.hoTen || !formData.email) {
      setFormError("Vui lòng nhập đầy đủ các trường thông tin bắt buộc");
      return;
    }
    createUserMutation.mutate(formData);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.hoTen) {
      setFormError("Vui lòng nhập họ và tên");
      return;
    }
    updateUserMutation.mutate({
      hoTen: formData.hoTen,
      email: formData.email,
      roleId: formData.roleId,
      trangThai: formData.trangThai
    });
  };

  const handleDeleteUser = (userId: number, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa tài khoản của "${name}"?`)) {
      deleteUserMutation.mutate(userId);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[parts.length - 2].substring(0, 1) + parts[parts.length - 1].substring(0, 1)).toUpperCase();
  };

  const getRoleBadgeStyle = (roleId: string) => {
    switch (roleId) {
      case "ADMIN":
        return "bg-primary-fixed text-on-primary-fixed-variant border-primary/20";
      case "RECORDS_OFFICER":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-success-green/10 text-success-green border-success-green/20";
    }
  };

  return (
    <div className="flex flex-col w-full gap-8 animate-fade-in relative">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-black tracking-tight text-on-surface">Danh sách Tài khoản</h1>
          <p className="text-sm text-secondary">Quản lý và phân quyền người dùng trong hệ thống EduArchive.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full text-xs font-semibold shadow-md hover:bg-primary-container hover:scale-[1.01] active:scale-[0.99] transition-all group relative overflow-hidden"
        >
          <UserPlus className="w-4 h-4 relative z-10" />
          <span className="relative z-10">Thêm tài khoản mới</span>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-pure-surface rounded-[2rem] p-6 md:p-8 flex flex-col gap-6 shadow-sm border border-whisper-border relative overflow-hidden">
        {/* Glow ambient circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed-dim/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        
        {/* Table Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between relative z-10">
          {/* Search Box */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Tìm kiếm theo tên, username..."
              className="w-full bg-surface-container-low text-on-surface pl-12 pr-4 py-3 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:bg-pure-surface focus:border-whisper-border shadow-sm transition-all"
            />
          </div>

          {/* Role Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <span className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider whitespace-nowrap">Lọc theo:</span>
            <div className="flex items-center gap-2 bg-surface-container-low border border-whisper-border rounded-xl p-1 shadow-sm">
              {[
                { name: "Tất cả", value: "ALL" },
                { name: "Admin", value: "ADMIN" },
                { name: "Văn thư", value: "RECORDS_OFFICER" },
                { name: "Giáo viên", value: "TEACHER" }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => {
                    setRoleFilter(filter.value);
                    setPage(0);
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    roleFilter === filter.value
                      ? "bg-primary text-on-primary shadow-sm"
                      : "text-secondary hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User list Table */}
        <div className="w-full overflow-x-auto pb-4 relative z-10 border border-whisper-border rounded-2xl bg-canvas-white/40">
          {isUsersLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <span className="text-xs text-secondary font-medium">Đang tải danh sách tài khoản...</span>
            </div>
          ) : !usersData || usersData.content.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
              <AlertCircle className="w-10 h-10" />
              <span className="text-xs font-medium">Không tìm thấy tài khoản nào khớp với điều kiện lọc</span>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="text-secondary font-mono text-[10px] uppercase tracking-widest border-b border-whisper-border bg-slate-50">
                  <th className="py-4 pl-6 font-semibold w-16">Avatar</th>
                  <th className="py-4 font-semibold w-1/4">Họ và Tên</th>
                  <th className="py-4 font-semibold w-1/4">Username</th>
                  <th className="py-4 font-semibold w-32">Vai trò</th>
                  <th className="py-4 font-semibold w-24 text-center">Trạng thái</th>
                  <th className="py-4 pr-6 font-semibold w-24 text-right">Hành động</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-whisper-border">
                {usersData.content.map((acc) => {
                  const isCurrent = currentUser?.username === acc.username;
                  return (
                    <tr 
                      key={acc.id} 
                      className={`group hover:bg-pure-surface/60 transition-colors ${
                        !acc.trangThai ? "bg-slate-50/50 opacity-70" : ""
                      }`}
                    >
                      <td className="py-4 pl-6">
                        <div className={`w-10 h-10 rounded-full font-bold flex items-center justify-center text-sm shadow-sm ring-2 ring-slate-100 ${
                          acc.vaiTro.id === "ADMIN" 
                            ? "bg-primary-fixed text-on-primary-fixed-variant" 
                            : acc.vaiTro.id === "RECORDS_OFFICER" 
                              ? "bg-purple-100 text-purple-700" 
                              : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {getInitials(acc.hoTen)}
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm text-on-surface group-hover:text-primary transition-colors">
                            {acc.hoTen}
                          </span>
                          <span className="text-[10px] text-slate-400">{acc.email}</span>
                        </div>
                      </td>
                      <td className="py-4 text-on-surface-variant font-mono">@{acc.username}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-bold tracking-wide ${getRoleBadgeStyle(acc.vaiTro.id)}`}>
                          {acc.vaiTro.tenVaiTro}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <button
                          disabled={isCurrent}
                          onClick={() => toggleStatusMutation.mutate(acc.id)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 ${
                            acc.trangThai ? "bg-primary" : "bg-slate-300"
                          }`}
                        >
                          <span 
                            className={`inline-block h-3.5 w-3.5 transform rounded-full bg-pure-surface transition-transform shadow-sm ${
                              acc.trangThai ? "translate-x-4.5" : "translate-x-1"
                            }`} 
                          />
                        </button>
                      </td>
                      <td className="py-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleOpenEditModal(acc)}
                            className="p-2 text-secondary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          
                          <button
                            disabled={isCurrent}
                            onClick={() => handleDeleteUser(acc.id, acc.hoTen)}
                            className="p-2 text-secondary hover:text-danger-red hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Xóa tài khoản"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination controls */}
        {usersData && usersData.totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-whisper-border relative z-10">
            <span className="text-xs text-secondary font-medium">
              Trang {page + 1} / {usersData.totalPages} ({usersData.totalElements} tài khoản)
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-whisper-border bg-pure-surface hover:bg-slate-50 text-secondary disabled:opacity-40 transition-colors"
              >
                Trước
              </button>
              <button
                disabled={page >= usersData.totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold border border-whisper-border bg-pure-surface hover:bg-slate-50 text-secondary disabled:opacity-40 transition-colors"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: ADD USER */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-pure-surface rounded-[2rem] border border-whisper-border shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 md:p-8 flex flex-col gap-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-whisper-border">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" />
                Tạo tài khoản mới
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-on-surface p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-error-container text-on-error-container border border-red-200 text-xs font-medium rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-danger-red" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider">Username *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-surface-container-low pl-10 pr-4 py-2.5 rounded-xl text-xs border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-pure-surface focus:border-whisper-border transition-all"
                    placeholder="Tên đăng nhập viết liền không dấu"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider">Mật khẩu *</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-surface-container-low pl-10 pr-4 py-2.5 rounded-xl text-xs border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-pure-surface focus:border-whisper-border transition-all"
                    placeholder="Mật khẩu đăng nhập"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider">Họ và Tên *</label>
                <input
                  type="text"
                  required
                  value={formData.hoTen}
                  onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl text-xs border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-pure-surface focus:border-whisper-border transition-all"
                  placeholder="Nhập đầy đủ họ và tên"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-outline w-4 h-4" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface-container-low pl-10 pr-4 py-2.5 rounded-xl text-xs border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-pure-surface focus:border-whisper-border transition-all"
                    placeholder="vi-du@school.edu.vn"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider">Vai trò hệ thống</label>
                <select
                  value={formData.roleId}
                  onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl text-xs border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-pure-surface focus:border-whisper-border transition-all"
                >
                  {rolesData?.map((r) => (
                    <option key={r.id} value={r.id}>{r.tenVaiTro}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="trangThai"
                  checked={formData.trangThai}
                  onChange={(e) => setFormData({ ...formData, trangThai: e.target.checked })}
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary accent-primary"
                />
                <label htmlFor="trangThai" className="text-xs text-on-surface-variant font-medium cursor-pointer">
                  Kích hoạt tài khoản khi khởi tạo
                </label>
              </div>

              <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-whisper-border">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-whisper-border hover:bg-slate-50 text-secondary transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={createUserMutation.isPending}
                  className="px-5 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold shadow-md hover:bg-primary-container transition-all flex items-center gap-1.5"
                >
                  {createUserMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-4 h-4" />}
                  Lưu lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT USER (Gray out Email and Password for Admin) */}
      {isEditModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-pure-surface rounded-[2rem] border border-whisper-border shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 md:p-8 flex flex-col gap-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-whisper-border">
              <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
                <Edit2 className="w-4.5 h-4.5 text-primary" />
                Chỉnh sửa tài khoản: @{selectedUser.username}
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-on-surface p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-error-container text-on-error-container border border-red-200 text-xs font-medium rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-danger-red" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider">
                  Họ và Tên <span className="text-danger-red">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.hoTen}
                  onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl text-xs border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-pure-surface focus:border-whisper-border transition-all"
                  placeholder="Nhập họ tên đầy đủ"
                />
              </div>

              {/* Grayed out Email Field */}
              <div className="flex flex-col gap-1.5 opacity-75">
                <label className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider flex items-center gap-1">
                  Email <span className="text-slate-400 font-normal lowercase">(Cố định - Không thể thay đổi)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="email"
                    disabled
                    readOnly
                    value={formData.email}
                    className="w-full bg-slate-100 text-slate-500 pl-10 pr-4 py-2.5 rounded-xl text-xs border border-slate-200 cursor-not-allowed select-none"
                  />
                </div>
              </div>

              {/* Grayed out Password Field */}
              <div className="flex flex-col gap-1.5 opacity-75">
                <label className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider flex items-center gap-1">
                  Mật khẩu <span className="text-slate-400 font-normal lowercase">(Cố định - Không thể thay đổi)</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    disabled
                    readOnly
                    value="••••••••••••"
                    className="w-full bg-slate-100 text-slate-500 pl-10 pr-4 py-2.5 rounded-xl text-xs border border-slate-200 cursor-not-allowed select-none font-mono"
                  />
                </div>
              </div>

              {/* Editable Role Field */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-secondary font-bold uppercase tracking-wider">Vai trò hệ thống</label>
                <select
                  value={formData.roleId}
                  onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                  disabled={currentUser?.username === selectedUser.username}
                  className="w-full bg-surface-container-low px-4 py-2.5 rounded-xl text-xs border border-transparent focus:outline-none focus:ring-2 focus:ring-primary/40 focus:bg-pure-surface focus:border-whisper-border transition-all disabled:opacity-50"
                >
                  {rolesData?.map((r) => (
                    <option key={r.id} value={r.id}>{r.tenVaiTro}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 justify-end mt-4 pt-4 border-t border-whisper-border">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-whisper-border hover:bg-slate-50 text-secondary transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  className="px-5 py-2 bg-primary text-on-primary rounded-xl text-xs font-semibold shadow-md hover:bg-primary-container transition-all flex items-center gap-1.5"
                >
                  {updateUserMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-4 h-4" />}
                  Lưu thay đổi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
