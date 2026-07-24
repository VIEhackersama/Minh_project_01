package com.school.records.modules.loans.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.school.records.modules.admin.entity.TaiKhoan;
import com.school.records.modules.loans.enums.TrangThaiPhieuMuon;
import com.school.records.modules.records.entity.HoSo;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcType;
import org.hibernate.dialect.PostgreSQLEnumJdbcType;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "phieu_muon")
public class PhieuMuon {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ho_so_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private HoSo hoSo;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nguoi_muon_id", nullable = false)
    @JsonIgnoreProperties({"password", "hibernateLazyInitializer", "handler"})
    private TaiKhoan nguoiMuon;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "nguoi_duyet_id")
    @JsonIgnoreProperties({"password", "hibernateLazyInitializer", "handler"})
    private TaiKhoan nguoiDuyet;

    @Column(name = "ngay_yeu_cau")
    private LocalDateTime ngayYeuCau;

    @Column(name = "ngay_hen_tra", nullable = false)
    private LocalDate ngayHenTra;

    @Column(name = "ngay_muon_thuc_te")
    private LocalDateTime ngayMuonThucTe;

    @Column(name = "ngay_tra_thuc_te")
    private LocalDateTime ngayTraThucTe;

    @Enumerated(EnumType.STRING)
    @JdbcType(PostgreSQLEnumJdbcType.class)
    @Column(name = "trang_thai", nullable = false)
    private TrangThaiPhieuMuon trangThai = TrangThaiPhieuMuon.CHO_DUYET;

    @Column(name = "ly_do_muon", columnDefinition = "TEXT")
    private String lyDoMuon;

    @Column(name = "ghi_chu", columnDefinition = "TEXT")
    private String ghiChu;

    public PhieuMuon() {}

    public PhieuMuon(Long id, HoSo hoSo, TaiKhoan nguoiMuon, TaiKhoan nguoiDuyet,
                      LocalDateTime ngayYeuCau, LocalDate ngayHenTra, LocalDateTime ngayMuonThucTe,
                      LocalDateTime ngayTraThucTe, TrangThaiPhieuMuon trangThai, String lyDoMuon, String ghiChu) {
        this.id = id;
        this.hoSo = hoSo;
        this.nguoiMuon = nguoiMuon;
        this.nguoiDuyet = nguoiDuyet;
        this.ngayYeuCau = ngayYeuCau;
        this.ngayHenTra = ngayHenTra;
        this.ngayMuonThucTe = ngayMuonThucTe;
        this.ngayTraThucTe = ngayTraThucTe;
        this.trangThai = trangThai;
        this.lyDoMuon = lyDoMuon;
        this.ghiChu = ghiChu;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private HoSo hoSo;
        private TaiKhoan nguoiMuon;
        private TaiKhoan nguoiDuyet;
        private LocalDateTime ngayYeuCau;
        private LocalDate ngayHenTra;
        private LocalDateTime ngayMuonThucTe;
        private LocalDateTime ngayTraThucTe;
        private TrangThaiPhieuMuon trangThai = TrangThaiPhieuMuon.CHO_DUYET;
        private String lyDoMuon;
        private String ghiChu;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder hoSo(HoSo hoSo) { this.hoSo = hoSo; return this; }
        public Builder nguoiMuon(TaiKhoan nguoiMuon) { this.nguoiMuon = nguoiMuon; return this; }
        public Builder nguoiDuyet(TaiKhoan nguoiDuyet) { this.nguoiDuyet = nguoiDuyet; return this; }
        public Builder ngayYeuCau(LocalDateTime ngayYeuCau) { this.ngayYeuCau = ngayYeuCau; return this; }
        public Builder ngayHenTra(LocalDate ngayHenTra) { this.ngayHenTra = ngayHenTra; return this; }
        public Builder ngayMuonThucTe(LocalDateTime ngayMuonThucTe) { this.ngayMuonThucTe = ngayMuonThucTe; return this; }
        public Builder ngayTraThucTe(LocalDateTime ngayTraThucTe) { this.ngayTraThucTe = ngayTraThucTe; return this; }
        public Builder trangThai(TrangThaiPhieuMuon trangThai) { this.trangThai = trangThai; return this; }
        public Builder lyDoMuon(String lyDoMuon) { this.lyDoMuon = lyDoMuon; return this; }
        public Builder ghiChu(String ghiChu) { this.ghiChu = ghiChu; return this; }

        public PhieuMuon build() {
            return new PhieuMuon(id, hoSo, nguoiMuon, nguoiDuyet, ngayYeuCau, ngayHenTra, ngayMuonThucTe, ngayTraThucTe, trangThai, lyDoMuon, ghiChu);
        }
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public HoSo getHoSo() { return hoSo; }
    public void setHoSo(HoSo hoSo) { this.hoSo = hoSo; }

    public TaiKhoan getNguoiMuon() { return nguoiMuon; }
    public void setNguoiMuon(TaiKhoan nguoiMuon) { this.nguoiMuon = nguoiMuon; }

    public TaiKhoan getNguoiDuyet() { return nguoiDuyet; }
    public void setNguoiDuyet(TaiKhoan nguoiDuyet) { this.nguoiDuyet = nguoiDuyet; }

    public LocalDateTime getNgayYeuCau() { return ngayYeuCau; }
    public void setNgayYeuCau(LocalDateTime ngayYeuCau) { this.ngayYeuCau = ngayYeuCau; }

    public LocalDate getNgayHenTra() { return ngayHenTra; }
    public void setNgayHenTra(LocalDate ngayHenTra) { this.ngayHenTra = ngayHenTra; }

    public LocalDateTime getNgayMuonThucTe() { return ngayMuonThucTe; }
    public void setNgayMuonThucTe(LocalDateTime ngayMuonThucTe) { this.ngayMuonThucTe = ngayMuonThucTe; }

    public LocalDateTime getNgayTraThucTe() { return ngayTraThucTe; }
    public void setNgayTraThucTe(LocalDateTime ngayTraThucTe) { this.ngayTraThucTe = ngayTraThucTe; }

    public TrangThaiPhieuMuon getTrangThai() { return trangThai; }
    public void setTrangThai(TrangThaiPhieuMuon trangThai) { this.trangThai = trangThai; }

    public String getLyDoMuon() { return lyDoMuon; }
    public void setLyDoMuon(String lyDoMuon) { this.lyDoMuon = lyDoMuon; }

    public String getGhiChu() { return ghiChu; }
    public void setGhiChu(String ghiChu) { this.ghiChu = ghiChu; }
}
