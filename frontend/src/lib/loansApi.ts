import { api } from "./api";
import { HoSo } from "./recordsApi";

export type TrangThaiPhieuMuon = "CHO_DUYET" | "DA_DUYET" | "TU_CHOI" | "DANG_MUON" | "DA_TRA" | "QUA_HAN";

export interface UserSummary {
  id: number;
  username: string;
  hoTen: string;
  email: string;
}

export interface PhieuMuon {
  id: number;
  hoSo: HoSo;
  nguoiMuon: UserSummary;
  nguoiDuyet?: UserSummary;
  ngayYeuCau: string;
  ngayHenTra: string;
  ngayMuonThucTe?: string;
  ngayTraThucTe?: string;
  trangThai: TrangThaiPhieuMuon;
  lyDoMuon?: string;
  ghiChu?: string;
}

export interface PhieuMuonPageResponse {
  content: PhieuMuon[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export async function datGiuHoSo(hoSoId: number, ngayHenTra?: string, lyDoMuon?: string) {
  return api.post<PhieuMuon>("/phieu-muon/dat-giu", { hoSoId, ngayHenTra, lyDoMuon });
}

export async function getPhieuMuons(params?: { query?: string; status?: string; onlyMine?: boolean; page?: number; size?: number }) {
  return api.get<PhieuMuonPageResponse>("/phieu-muon", { params: params as any });
}

export async function pheDuyetPhieuMuon(id: number, approve: boolean, ghiChu?: string) {
  return api.post<PhieuMuon>(`/phieu-muon/${id}/duyet`, { approve, ghiChu });
}

export async function xacNhanTraHoSo(id: number) {
  return api.post<PhieuMuon>(`/phieu-muon/${id}/tra`);
}

export async function checkOverdueLoans() {
  return api.post<{ message: string; updatedCount: number }>("/phieu-muon/check-overdue");
}

export async function decodeQrImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return api.upload<{ raw: string; maHoSo: string }>("/qr/decode", formData);
}
