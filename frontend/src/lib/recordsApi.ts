import { api } from "./api";

export interface DanhMucLoaiHoSo {
  id: number;
  tenLoai: string;
  thoiHanBaoQuanNam: number;
  moTa?: string;
}

export interface ViTriLuuTru {
  id: number;
  phongKho: string;
  keHang: string;
  nganChua: string;
  maDinhDanhViTri: string;
  moTa?: string;
}

export type TrangThaiHoSo =
  | "DANG_LUU_KHO"
  | "DA_DAT_GIU"
  | "DANG_CHO_DUYET_MUON"
  | "DANG_CHO_TRA"
  | "DA_MUON"
  | "DA_TIEU_HUY";

export type MucDoMat = "COMMON" | "CONFIDENTIAL";

export interface HoSo {
  id: number;
  maHoSo: string;
  tenHoSo: string;
  danhMuc?: DanhMucLoaiHoSo;
  viTri?: ViTriLuuTru;
  ngayLap: string;
  thoiHanBaoQuanDen?: string;
  trangThai: TrangThaiHoSo;
  mucDoMat: MucDoMat;
  qrActive?: boolean;
  daSoHoa?: boolean;
  soLuongTaiLieu?: number;
}

export interface TaiLieuSoHoa {
  id: number;
  tenTaiLieu: string;
  duongDanFile: string;
  checksum: string;
  kichThuoc: number;
  dinhDangFile: string;
  ngayTaiLen: string;
}

export interface PaginatedResult<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

// Danh Muc API
export const getDanhMucList = () => api.get<DanhMucLoaiHoSo[]>("/danh-muc");
export const createDanhMuc = (data: Partial<DanhMucLoaiHoSo>) => api.post<DanhMucLoaiHoSo>("/danh-muc", data);
export const updateDanhMuc = (id: number, data: Partial<DanhMucLoaiHoSo>) => api.put<DanhMucLoaiHoSo>(`/danh-muc/${id}`, data);
export const deleteDanhMuc = (id: number) => api.delete(`/danh-muc/${id}`);

// Vi Tri API
export const getViTriList = () => api.get<ViTriLuuTru[]>("/vi-tri");
export const getDistinctPhongKho = () => api.get<string[]>("/vi-tri/phong-kho");
export const getDistinctKeHang = (phongKho?: string) =>
  api.get<string[]>("/vi-tri/ke-hang", { params: phongKho ? { phongKho } : undefined });
export const getDistinctNganChua = (phongKho?: string, keHang?: string) => {
  const params: Record<string, string> = {};
  if (phongKho) params.phongKho = phongKho;
  if (keHang) params.keHang = keHang;
  return api.get<string[]>("/vi-tri/ngan-chua", { params: Object.keys(params).length ? params : undefined });
};

export const createViTri = (data: Partial<ViTriLuuTru>) => api.post<ViTriLuuTru>("/vi-tri", data);
export const updateViTri = (id: number, data: Partial<ViTriLuuTru>) => api.put<ViTriLuuTru>(`/vi-tri/${id}`, data);
export const deleteViTri = (id: number) => api.delete(`/vi-tri/${id}`);

// Ho So API
export const searchHoSo = (params?: { query?: string; danhMucId?: number; trangThai?: string; page?: number; size?: number }) =>
  api.get<PaginatedResult<HoSo>>("/ho-so", { params: params as Record<string, string | number | boolean> });

export const getHoSoById = (id: number) => api.get<HoSo>(`/ho-so/${id}`);

export const createHoSo = (data: {
  maHoSo?: string;
  tenHoSo: string;
  danhMucId?: number;
  viTriId?: number;
  phongKho?: string;
  keHang?: string;
  nganChua?: string;
  ngayLap?: string;
  trangThai?: TrangThaiHoSo;
  mucDoMat?: MucDoMat;
}) => api.post<HoSo>("/ho-so", data);

export const updateHoSo = (id: number, data: Partial<HoSo> & { danhMucId?: number; viTriId?: number; phongKho?: string; keHang?: string; nganChua?: string }) =>
  api.put<HoSo>(`/ho-so/${id}`, data);

export const deleteHoSo = (id: number) => api.delete(`/ho-so/${id}`);

// Tai Lieu So Hoa API
export const getTaiLieuByHoSo = (hoSoId: number) => api.get<TaiLieuSoHoa[]>(`/tai-lieu-so-hoa/ho-so/${hoSoId}`);

export const uploadTaiLieu = (hoSoId: number, file: File) => {
  const formData = new FormData();
  formData.append("hoSoId", String(hoSoId));
  formData.append("file", file);
  return api.upload<TaiLieuSoHoa>("/tai-lieu-so-hoa/upload", formData);
};

export const deleteTaiLieu = (id: number) => api.delete(`/tai-lieu-so-hoa/${id}`);
